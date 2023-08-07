import { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  favIds: number[];
  laterIds: number[];
  updateFavorites: (id: number) => void;
  updateLaterIds: (id: number) => void;
  removeFavorites: (id: number) => void;
  removeLaterIds: (id: number) => void;
};

const AppContext = createContext<AppContextType>({
  favIds: [],
  laterIds: [],
  updateFavorites: () => {},
  updateLaterIds: () => {},
  removeFavorites: () => {},
  removeLaterIds: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [favIds, setFavIds] = useState<number[]>([]);
  const [laterIds, setLaterIds] = useState<number[]>([]);

  useEffect(() => {
    const favIdsFromLocalStorage: any = localStorage.getItem("favorites");
    const laterIdsFromLocalStorage: any = localStorage.getItem("readLater");

    const parsedFavIds = favIdsFromLocalStorage
      ? JSON.parse(favIdsFromLocalStorage)
      : [];
    const parsedLaterIds = laterIdsFromLocalStorage
      ? JSON.parse(laterIdsFromLocalStorage)
      : [];

    setFavIds(parsedFavIds);
    setLaterIds(parsedLaterIds);
  }, []);

  const updateFavorites = (id: number) => {
    const existingData = localStorage.getItem("favorites");
    if (existingData) {
      const ids = new Set<number>(JSON.parse(existingData));
      ids.add(id);
      localStorage.setItem("favorites", JSON.stringify(Array.from(ids)));
      setFavIds(Array.from(ids));
    } else {
      localStorage.setItem("favorites", JSON.stringify([id]));
      setFavIds([id]);
    }
  };

  const updateLaterIds = (id: number) => {
    const existingData = localStorage.getItem("readLater");
    if (existingData) {
      const ids = new Set<number>(JSON.parse(existingData));
      ids.add(id);
      localStorage.setItem("readLater", JSON.stringify(Array.from(ids)));
      setLaterIds(Array.from(ids));
    } else {
      localStorage.setItem("readLater", JSON.stringify([id]));
      setLaterIds([id]);
    }
  };

  const removeFavorites = (id: number) => {
    const existingData = localStorage.getItem("favorites");
    if (existingData) {
      const ids = new Set<number>(JSON.parse(existingData));
      ids.delete(id);
      localStorage.setItem("favorites", JSON.stringify(Array.from(ids)));
      setFavIds(Array.from(ids));
    }
  };

  const removeLaterIds = (id: number) => {
    const existingData = localStorage.getItem("readLater");
    if (existingData) {
      const ids = new Set<number>(JSON.parse(existingData));
      ids.delete(id);
      localStorage.setItem("readLater", JSON.stringify(Array.from(ids)));
      setLaterIds(Array.from(ids));
    }
  };

  return (
    <AppContext.Provider
      value={{ favIds, laterIds, updateFavorites, updateLaterIds, removeFavorites, removeLaterIds }}
    >
      {children}
    </AppContext.Provider>
  );
}
