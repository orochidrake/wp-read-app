import React, { useEffect, useState } from 'react'
import Sidenav from '../../components/Sidemenu'
import ArticleCreator from '../../model/article/factory'
import ArticleInterface from '../../model/article/interface'
import { Categories } from '../../util/helpers/categories'
import * as S from './styles'
import HTTP from 'services/http/http'

export default function Item({ _article }: any) {
  const [article, setArticle] = useState<ArticleInterface>()
  const [category, setCategory] = useState('')

  useEffect(() => {
    const _i = ArticleCreator.factory(_article)
    console.log(_i, 'i')
    const _c = Categories.filter((c) => c.id == _i.categories[0])[0]
    setCategory(_c.label)
    setArticle(_i)
  }, [_article])

  console.log(article)
  return (
    <S.Container>
      <Sidenav />
      <S.Content>
        <h2>{article?.title.rendered}</h2>
        <small>{category}</small>
        {article?.content.rendered}
      </S.Content>
    </S.Container>
  )
}

export async function getServerSideProps(ctx: any) {
  const itemId = ctx.query.id
  const http = new HTTP()
  http.createRequest('GET', `/posts/${itemId}`)
  if (!(await http.sendRequest())) {
    console.log(http.response)
    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: '/'
    //   }
    // }
  }

  console.log(http.response)

  const article = http.response.body

  return {
    props: {
      _article: article
    }
  }
}
