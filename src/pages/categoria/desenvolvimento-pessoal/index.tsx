import React, { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import PostCreator from "@/models/post/factory";
import PostInterface from "@/models/post/interface";
import PostCards from "@/components/PostCards";
import FeaturedMediaCreator from "@/models/featuredMedia/factory";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface DevelopmentPageProps {
  _posts: PostInterface[];
}

export default function DevelopmentPage({ _posts }: DevelopmentPageProps) {
  const router = useRouter();
  const [postLength, setPostLength] = useState(_posts.length)
  const [posts, setPosts] = useState<PostInterface[]>(
    _posts.map((p: unknown) => {
      const _p = PostCreator.factory(p)
      return _p
    })
  )

  const [sortedPosts, setSortedPosts] = useState(posts);
  const [sortDirectionLegth, setSortDirectionByLegth] = useState<"asc" | "desc">("asc");
  const [sortDirectionAge, setSortDirectionByAge] = useState<"asc" | "desc">("asc");

  const handleSortByLength = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const lengthDiff = a.content.rendered.length - b.content.rendered.length;
      return sortDirectionLegth === "asc" ? lengthDiff : -lengthDiff;
    });
    setSortedPosts(sorted);
    setSortDirectionByLegth((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSortByDate = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDirectionAge === "asc" ? dateDiff : -dateDiff;
    });
    setSortedPosts(sorted);
    setSortDirectionByAge((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleResetSort = () => {
    setSortedPosts(posts);
  };

  const loadMoreItems = async () => {
    Swal.fire({
      title: "Carregando mais posts",
    })
    Swal.showLoading();
    let _p = PostCreator.factory();
    console.log(postLength)
    try {
      const newPosts = await _p.getPosts(`/posts?categories=1309&offset=${postLength}`);  
      const nP: PostInterface[] = await Promise.all(newPosts.map(async (p: PostInterface) => {
        const normalizedPost = PostCreator.factory(p);
  
        if (p.featured_media) {
          
          try {
            let _fM = FeaturedMediaCreator.factory();
            const featured_media = await _fM.getFeaturedMedias(`/media/${p.featured_media}`);  
            normalizedPost.featured_media = featured_media;
          } catch (error) {
            Swal.fire(
              'Ops!','Parece que todos tivemos um erro na Api, aguarde que voce será redirecionado', 'info'
            )
            router.push('/')
          }
        }
  
        return normalizedPost;
      }));
      const qtdUp = postLength + nP.length;
  
      if(qtdUp === postLength){
        Swal.fire(
          'Ops!','Parece que todos os Artigos dessa categoria ja foram carregados!', 'info'
        )
      };
      setPostLength(qtdUp)
      setSortedPosts([...sortedPosts, ...nP]);
      Swal.close();
    } catch (error) {
      console.log(error)
      Swal.fire(
        'Ops!','Parece que todos tivemos um erro na Api, aguarde que voce será redirecionado', 'info'
      )
      router.push('/')
    }
    
  };

  return (
    <>
      <div className="container mx-auto py-8 ">


        <div className="grid grid-cols-4">
          <p>Ordenar Artigos por:</p>
          <button onClick={handleSortByLength}>
            {sortDirectionLegth === "asc" ? "Artigos mais curtos" : "Artigos mais longos"}
          </button>
          <button onClick={handleSortByDate}>
            {sortDirectionAge === "asc" ? "Artigos mais antigos" : "Artigos mais recentes"}
          </button>
          <button onClick={handleResetSort}>Resetar Ordenação</button>
        </div>
        <div className="my-6 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2.5 gap-y-2.5">
          {sortedPosts.map((post) => {
            return (
              <PostCards key={post.slug} post={post} />
            );
          })}
        </div>
        <div className="flex justify-center">
          <button className="p-4 bg-teal-400" onClick={() => loadMoreItems()}>Carregar Mais</button>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<DevelopmentPageProps> = async () => {
  let _p = PostCreator.factory()
  const _posts = await _p.getPosts('/posts?categories=1309');

  const postsWithMedia = await Promise.all(_posts.map(async (post:any) => {
    if (post.featured_media) {
      let _fM = FeaturedMediaCreator.factory()
      const featured_media = await _fM.getFeaturedMedias(`/media/${post.featured_media}`);
      post.featured_media = featured_media;
    }
    return post;
  }));

  return {
    props: {
      _posts,
    },
    revalidate: 3600,
  };
};
