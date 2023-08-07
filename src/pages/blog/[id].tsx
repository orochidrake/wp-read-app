import React, { useState } from 'react';
import PostInterface from '@/models/post/interface';
import PostCreator from '@/models/post/factory';
import PostFullBlock from '@/components/PostFullBlock';
import { fetchAPI } from '@/lib/base';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface PostPageProps {
  _post: PostInterface;
}

export default function PostPage({ _post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const post = useState<PostInterface>(
    PostCreator.factory(_post)
  )
  return (
    <>
      <div className="container mx-auto py-8 mb-96">
        <Link href={"/"}>
          <FontAwesomeIcon icon={faArrowLeft} bounce /> Voltar
        </Link>
        <div className="my-6 grid grid-flow-row grid-cols-1">
          <PostFullBlock post={_post} />
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