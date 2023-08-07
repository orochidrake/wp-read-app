import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/assets/images/default.jpg";
import PostInterface from "@/models/post/interface";
import ButtonsComponents from "../Buttons";

interface PostCards{
  post: PostInterface
}

export default function PostCards({ post }: PostCards) {
  const imgPost = post.defaultImg ? post.defaultImg[0] : defaultImage
  const dateTemp = post.date.split('T')
  const dateFormated = dateTemp[0].split('-').reverse().join("/")

  return (
    <div className="post-block p-2 rounded-md bg-amber-50">
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
        <h3 className="text-2xl py-4 text-slate-800">{post.title.rendered}</h3>

      </Link>
      <div className="container text-slate-800" >
        <small>{dateFormated}</small>
        <div className="italic" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}>{ }</div>
        <ButtonsComponents idItem={post.id}/>
      </div>
    </div>
  );
};
