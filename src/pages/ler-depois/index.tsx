import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PostCards from "@/components/PostCards";
import PostCreator  from "@/models/post/factory";
import PostInterface from "@/models/post/interface"
import Nav from "@/components/Nav";

interface ReadLaterPage {
  _posts: PostInterface[];
}

export default function ReadLaterPage({ _posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <div>

          
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

export const getServerSideProps: GetServerSideProps<ReadLaterPage> = async (ctx) => {
  const items = ctx.query.items;
  let _p = PostCreator.factory()
  const _posts = await _p.getPosts(`/posts?include=${items}`);

  return {
    props: {
      _posts,
    },
  };
};

