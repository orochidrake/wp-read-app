import { faCoffee, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { isInLocalStorage, removeFromLocalStorage, addToLocalStorage } from "../../utils/helpers/dataPersist";

interface ButtonsComponentsProps {
  idItem: number;
}
export default function ButtonsComponents({ idItem }: ButtonsComponentsProps) {
  const [isFavorite, setFavorite] = useState(false)
  const [isReadLater, setReadLater] = useState(false)

  useEffect(() => {
    const isPostFavorite = isInLocalStorage('favorites', idItem);
    const isPosReadLater = isInLocalStorage('readLater', idItem);
    setFavorite(isPostFavorite);
    setReadLater(isPosReadLater);
  }, []);

  const handleReadLaterClick = () => {
    if (isReadLater) {
      removeFromLocalStorage('readLater', idItem);
      setReadLater(false);
    } else {
      addToLocalStorage('readLater', idItem);
      setReadLater(true);
    }
  };
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromLocalStorage('favorites', idItem);
      setFavorite(false);
    } else {
      addToLocalStorage('favorites', idItem);
      setFavorite(true);
    }
  };
  return (
    <div className="grid grid-cols-2 my-4 gap-x-2">
      {isReadLater ? (
        <button className="py-4 bg-orange-900 text-white hover:bg-orange-950 transition-all duration-200 ease-linear" onClick={handleReadLaterClick}>
          <FontAwesomeIcon icon={faCoffee} />
          <span className="text-white"> Remover Ler Mais Tarde</span>
        </button>
      ) : (
        <button className="py-4 border-solid border-2 border-orange-900 text-orange-900 hover:text-white hover:bg-orange-950 transition-all duration-200 ease-linear" onClick={handleReadLaterClick}>
          <FontAwesomeIcon icon={faCoffee} />
          <span> Ler Mais Tarde</span>
        </button>
      )
      }
      {isFavorite ? (
        <button className="py-4 bg-amber-400 hover:bg-amber-300 text-black transition-all duration-200 ease-linear" onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={faStar} style={{ color: "#fff700" }} />
          <span> Remover dos Favoritos</span>
        </button>
      ) : (
        <button className="py-4 border-solid border-2 border-amber-400 text-amber-400 hover:bg-amber-300 hover:text-black transition-all duration-200 ease-linear" onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={farStar} />
          <span> Favorito</span>

        </button>
      )}
    </div>
  )
}