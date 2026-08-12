import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { saveLargeAsset, getLargeAsset, deleteLargeAsset } from './storageHelper';
import { compressImageBase64 } from './imageCompressor';

const CHUNK_SIZE = 700000; // 700 KB per chunk (safely under Firestore 1MB document limit)

export async function saveCloudAsset(key: string, value: string): Promise<void> {
  if (!value) {
    await deleteCloudAsset(key);
    return;
  }

  // 1. Compress image base64 if it's an uncompressed photo data URL
  let processedValue = value;
  if (typeof value === 'string' && value.startsWith('data:image/')) {
    try {
      processedValue = await compressImageBase64(value, 1200, 0.82);
    } catch (e) {
      console.warn('Image compression fallback:', e);
    }
  }

  // 2. Save locally in IndexedDB for immediate local availability
  await saveLargeAsset(key, processedValue);

  // 3. Upload to Firestore media collection with safety timeout so UI never hangs
  const uploadToFirestore = async () => {
    const mainDocRef = doc(db, 'media', key);
    
    if (processedValue.length <= CHUNK_SIZE) {
      await setDoc(mainDocRef, {
        chunksCount: 1,
        data: processedValue,
        updatedAt: Date.now()
      });
    } else {
      const chunksCount = Math.ceil(processedValue.length / CHUNK_SIZE);
      await setDoc(mainDocRef, {
        chunksCount,
        data: 'CHUNKED',
        updatedAt: Date.now()
      });

      for (let i = 0; i < chunksCount; i++) {
        const chunkStr = processedValue.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        const chunkDocRef = doc(db, 'media', `${key}_chunk_${i}`);
        await setDoc(chunkDocRef, { chunk: chunkStr });
      }
    }
  };

  try {
    await Promise.race([
      uploadToFirestore(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore write timeout')), 3500))
    ]);
  } catch (err) {
    console.warn(`Asset '${key}' saved in local storage (Firestore sync timed out or skipped):`, err);
  }
}

export async function getCloudAsset(key: string): Promise<string | null> {
  // 1. Check local IndexedDB cache first
  const local = await getLargeAsset(key);
  if (local) {
    return local;
  }

  // 2. Fetch from Firestore if not in local cache
  try {
    const mainDocRef = doc(db, 'media', key);
    const snap = await getDoc(mainDocRef);
    if (!snap.exists()) {
      return null;
    }

    const data = snap.data();
    if (data.data && data.data !== 'CHUNKED') {
      const fullValue = data.data as string;
      await saveLargeAsset(key, fullValue); // cache locally for fast future loads
      return fullValue;
    }

    if (data.chunksCount && data.chunksCount > 0) {
      const chunksCount = data.chunksCount as number;
      let fullValue = '';
      for (let i = 0; i < chunksCount; i++) {
        const chunkDocRef = doc(db, 'media', `${key}_chunk_${i}`);
        const chunkSnap = await getDoc(chunkDocRef);
        if (chunkSnap.exists()) {
          fullValue += chunkSnap.data().chunk || '';
        }
      }
      if (fullValue) {
        await saveLargeAsset(key, fullValue); // cache locally
        return fullValue;
      }
    }
  } catch (err) {
    console.warn(`Failed to fetch cloud asset '${key}' from Firestore:`, err);
  }

  return null;
}

export async function deleteCloudAsset(key: string): Promise<void> {
  await deleteLargeAsset(key);
  try {
    const mainDocRef = doc(db, 'media', key);
    const snap = await getDoc(mainDocRef);
    if (snap.exists()) {
      const data = snap.data();
      const chunksCount = data.chunksCount || 1;
      await deleteDoc(mainDocRef);
      for (let i = 0; i < chunksCount; i++) {
        await deleteDoc(doc(db, 'media', `${key}_chunk_${i}`));
      }
    }
  } catch (e) {
    console.warn(`Failed to delete cloud asset '${key}' from Firestore:`, e);
  }
}
