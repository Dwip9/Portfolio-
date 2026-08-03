const DB_NAME = 'dwip_portfolio_assets_db';
const STORE_NAME = 'large_assets';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveLargeAsset(key: string, value: string): Promise<void> {
  if (!value) {
    await deleteLargeAsset(key);
    return;
  }
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB write failed, falling back to localStorage', e);
    try {
      localStorage.setItem(`dh_asset_${key}`, value);
    } catch (err) {
      console.error('LocalStorage write failed:', err);
    }
  }
}

export async function getLargeAsset(key: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result);
        } else {
          resolve(localStorage.getItem(`dh_asset_${key}`));
        }
      };
      req.onerror = () => resolve(localStorage.getItem(`dh_asset_${key}`));
    });
  } catch (e) {
    return localStorage.getItem(`dh_asset_${key}`);
  }
}

export async function deleteLargeAsset(key: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(key);
  } catch (e) {
    // ignore
  }
  localStorage.removeItem(`dh_asset_${key}`);
}
