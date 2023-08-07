import { faCoffee, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppContext } from "@/context/AppContext";

interface ButtonsComponentsProps {
  idItem: number;
}

export default function ButtonsComponents({ idItem }: ButtonsComponentsProps) {
  const { favIds, laterIds, updateFavorites, updateLaterIds, removeLaterIds, removeFavorites } = useAppContext();

  const handleAddToFavorites = () => {
    updateFavorites(idItem);
  };

  const handleRemoveFromFavorites = () => {
    removeFavorites(idItem);
  };

  const handleAddToReadLater = () => {
    updateLaterIds(idItem);
  };

  const handleRemoveFromReadLater = () => {
    removeLaterIds(idItem);
  };

  const isFavorite = favIds.includes(idItem);
  const isReadLater = laterIds.includes(idItem);

  return (
    <div className="grid grid-cols-2 my-4 gap-x-2">
      {isReadLater ? (
        <button className="py-4 bg-orange-900 text-white hover:bg-orange-950 transition-all duration-200 ease-linear" onClick={handleRemoveFromReadLater}>
          <FontAwesomeIcon icon={faCoffee} />
          <span className="text-white"> Remover Ler Mais Tarde</span>
        </button>
      ) : (
        <button className="py-4 border-solid border-2 border-orange-900 text-orange-900 hover:text-white hover:bg-orange-950 transition-all duration-200 ease-linear" onClick={handleAddToReadLater}>
          <FontAwesomeIcon icon={faCoffee} />
          <span> Ler Mais Tarde</span>
        </button>
      )}
      {isFavorite ? (
        <button className="py-4 bg-amber-400 hover:bg-amber-300 text-black transition-all duration-200 ease-linear" onClick={handleRemoveFromFavorites}>
          <FontAwesomeIcon icon={faStar} style={{ color: "#fff700" }} />
          <span> Remover dos Favoritos</span>
        </button>
      ) : (
        <button className="py-4 border-solid border-2 border-amber-400 text-amber-400 hover:bg-amber-300 hover:text-black transition-all duration-200 ease-linear" onClick={handleAddToFavorites}>
          <FontAwesomeIcon icon={farStar} />
          <span> Favorito</span>
        </button>
      )}
    </div>
  );
}