import { useState } from "react";
import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, InferGetServerSidePropsType } from "next";
import PostCards from "@/components/PostCards";
import PostCreator  from "@/models/post/factory";
import PostInterface from "@/models/post/interface"
import React from "react";

interface HomePageProps {
  _posts: PostInterface[];
}

export default function FavoritePage({ _posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [posts, setPosts] = useState<PostInterface[]>(
    _posts.map((p: unknown) => {
        const _p = PostCreator.factory(p)
        return _p
    })
  )

  const [sortedPosts, setSortedPosts] = useState(posts);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSortByLength = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const lengthDiff = a.content.rendered.length - b.content.rendered.length;
      return sortDirection === "asc" ? lengthDiff : -lengthDiff;
    });
    setSortedPosts(sorted);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSortByDate = () => {
    const sorted = [...sortedPosts].sort((a, b) => {
      const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDirection === "asc" ? dateDiff : -dateDiff;
    });
    setSortedPosts(sorted);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };


  const handleResetSort = () => {
    setSortedPosts(posts);
  };

  return (
    <>
      <div className="container mx-auto py-8 ">
        <div>
          <button onClick={handleSortByLength}>Sort by Length</button>
          <button onClick={handleSortByDate}>Sort by Date</button>
          <button onClick={handleResetSort}>Reset Sort</button>
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

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (ctx) => {
  const items = ctx.query.items;
  let _p = PostCreator.factory()
  const _posts = await _p.getPosts(`/posts?include=${items}`);

  return {
    props: {
      _posts,
    },
  };
};

