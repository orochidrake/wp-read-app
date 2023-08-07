
export const isInLocalStorage = (key: string, id: number) => {
  const existingData = localStorage.getItem(key);
  if (existingData) {
    const ids = new Set<number>(JSON.parse(existingData));
    return ids.has(id);
  }
  return false;
};

export const removeFromLocalStorage = (key: string, id: number) => {
  const existingData = localStorage.getItem(key);
  if (existingData) {
    const ids = new Set<number>(JSON.parse(existingData));
    ids.delete(id);
    localStorage.setItem(key, JSON.stringify(Array.from(ids)));
  }
};

export const addToLocalStorage = (key: string, id: number) => {
  const existingData = localStorage.getItem(key);
  if (existingData) {
    const ids = new Set<number>(JSON.parse(existingData));
    ids.add(id);
    localStorage.setItem(key, JSON.stringify(Array.from(ids)));
  } else {
    localStorage.setItem(key, JSON.stringify([id]));
  }
};