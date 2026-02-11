const DB_NAME = 'LipFlipCache';
const STORE_NAME = 'processed_results';
const DB_VERSION = 1;

/**
 * Generates a unique key for a file based on its metadata.
 */
export const generateCacheKey = (file: File): string => {
  return `${file.name}_${file.size}_${file.lastModified}`;
};

/**
 * Opens (or creates) the IndexedDB database.
 */
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve((event.target as IDBOpenDBRequest).result);
    request.onerror = () => reject((event.target as IDBOpenDBRequest).error);
  });
};

/**
 * Retrieves a processed image (base64 string) from the cache.
 */
export const getCachedResult = async (key: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result as string || null);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn('Cache read failed:', e);
    return null;
  }
};

/**
 * Saves a processed image (base64 string) to the cache.
 */
export const saveToCache = async (key: string, base64Data: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(base64Data, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn('Cache write failed:', e);
  }
};