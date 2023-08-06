import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/assets/images/default.jpg";
import PostInterface from "@/models/post/interface";

export default function PostBlock({ post }: any) {

  const isReadLater = false
  const isFavorite = false
  const imgPost = post.defaultImg ? post.defaultImg[0] : defaultImage
  const dateTemp = post.date.split('T')
  const dateFormated = dateTemp[0].split('-').reverse().join("/")

  const removeFromReadLater = (post: PostInterface) =>{
    console.log(post)
  }
  const addToReadLater = (post: PostInterface) =>{
    console.log(post)
  }
  const removeFromFavorites = (post: PostInterface) =>{
    console.log(post)
  }
  const addToFavorites = (post: PostInterface) =>{
    console.log(post)
  }

  return (
    <div className="post-block p-2 rounded-md">
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-80 transition-all duration-200 ease-linear hover:-translate-y-[3px]">
          <Image
            src={imgPost}
            fill
            alt={post.title.rendered}
            className="absolute rounded-md h-full w-full object-cover"
          />
        </div>
      </Link>
      <Link href={`/blog/${post.id}`} className="post-content my-4">
        <h3 className="text-2xl py-4">{post.title.rendered}</h3>

      </Link>
      <div className="container" >
        <small>{dateFormated}</small>
        <div className="italic" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}>{ }</div>
        <button onClick={() => (isReadLater ? removeFromReadLater(post) : addToReadLater(post))}>
          {isReadLater ? "Remover da Lista" : "Ler Depois"}
        </button>
        <button onClick={() => (isFavorite ? removeFromFavorites(post) : addToFavorites(post))}>
          {isFavorite ? "Remover dos Favoritos" : "Favorito"}
        </button>
      </div>
    </div>
  );
};
