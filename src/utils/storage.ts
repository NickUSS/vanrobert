const STORAGE_KEY = 'vanrobert_data';

interface StorageData {
    likes: string[];
    theme: 'light' | 'dark';
    currency: string;
}

const defaultData: StorageData = {
    likes: [],
    theme: 'light',
    currency: 'USD'
};

export const getStorageData = (): StorageData => {
    if (typeof window === 'undefined') return defaultData;

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
};

export const setStorageData = (data: Partial<StorageData>) => {
    if (typeof window === 'undefined') return;

    const currentData = getStorageData();
    const newData = { ...currentData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const getLikedArtworks = (): Set<string> => {
    const data = getStorageData();
    return new Set(data.likes);
};

export const toggleLike = (id: string): Set<string> => {
    const likes = getLikedArtworks();
    if (likes.has(id)) {
        likes.delete(id);
    } else {
        likes.add(id);
    }
    setStorageData({ likes: Array.from(likes) });
    return likes;
};