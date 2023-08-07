import { useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, InferGetServerSidePropsType } from "next";
import PostCards from "@/components/PostCards";
import PostCreator from "@/models/post/factory";
import PostInterface from "@/models/post/interface"
import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

interface FavoritePageProps {
  _posts: PostInterface[];
}

export default function FavoritePage({ _posts }: FavoritePageProps) {
  const { favIds } = useAppContext();
  const router = useRouter();
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


  return (
    <>
      <div className="container mx-auto py-8 ">
      <Link href={"/"}>
          <FontAwesomeIcon icon={faArrowLeft} bounce /> Voltar
        </Link>
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
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps<FavoritePageProps> = async (ctx) => {
  const itemsId = ctx.query.itemsId;

  let _p = PostCreator.factory();
  const _posts = await _p.getPosts(`/posts?include=${itemsId}`);

  return {
    props: {
      _posts
    }
  };
};




