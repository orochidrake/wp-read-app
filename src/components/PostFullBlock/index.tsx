import React from 'react'
import PostInterface from "@/models/post/interface";
import ButtonsComponents from "@/components/Buttons"

interface PostPageProps {
  post: PostInterface;
}

export default function PostFullBlock({ post }: PostPageProps) {
  const dateTemp = post.date.split('T')
  const dateFormated = dateTemp[0].split('-').reverse().join("/")
  

  return (
    <div className="post-block p-2 rounded-md ">
      <div className='grid grid-cols-2'>
        
        <ButtonsComponents idItem={post.id}/>
      </div>
      <div className="post-content my-4">
        <h2 className="text-4xl py-4">{post.title.rendered}</h2>
        <div className="text-sm py-4" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
        <small>{dateFormated}</small>
        <div className="text-sm py-4 grid grid-cols-1" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
      </div>
    </div>
  );
};
