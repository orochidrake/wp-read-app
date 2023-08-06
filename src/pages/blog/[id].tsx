import React, { useState } from 'react';
import PostInterface from '@/models/post/interface';
import PostCreator from '@/models/post/factory';
import PostBlock from '@/components/PostBlock';
import { fetchAPI } from '@/lib/base';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface PostPageProps {
  _post: PostInterface;
}

export default function PostPage({ _post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const post = useState<PostInterface>(
    PostCreator.factory(_post)
  )
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="my-6 grid grid-flow-row grid-cols-1">
          <PostBlock post={_post} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (ctx) => {
  const id = ctx.query.id;
  const _post = await fetchAPI(`/posts/${id}`);

  return {
    props: {
      _post,
    },
  };
};