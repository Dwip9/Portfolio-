import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { saveLargeAsset, getLargeAsset, deleteLargeAsset } from './storageHelper';

const CHUNK_SIZE = 700000; // 700 KB per chunk (safely under Firestore 1MB document limit)

export async function saveCloudAsset(key: string, value: string): Promise<void> {
  if (!value) {
    await deleteCloudAsset(key);
    return;
  }

  // 1. Save locally in IndexedDB for immediate local availability
  await saveLargeAsset(key, value);

  // 2. Upload to Firestore media collection so ALL users across the world can fetch it
  try {
    const mainDocRef = doc(db, 'media', key);
    
    if (value.length <= CHUNK_SIZE) {
      await setDoc(mainDocRef, {
        chunksCount: 1,
        data: value,
        updatedAt: Date.now()
      });
    } else {
      const chunksCount = Math.ceil(value.length / CHUNK_SIZE);
      await setDoc(mainDocRef, {
        chunksCount,
        data: 'CHUNKED',
        updatedAt: Date.now()
      });

      for (let i = 0; i < chunksCount; i++) {
        const chunkStr = value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        const chunkDocRef = doc(db, 'media', `${key}_chunk_${i}`);
        await setDoc(chunkDocRef, { chunk: chunkStr });
      }
    }
  } catch (err) {
    console.warn(`Failed to sync cloud asset '${key}' to Firestore:`, err);
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
