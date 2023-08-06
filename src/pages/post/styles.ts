import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15vw 1fr;
  padding-top: 4.5rem;
`
export const Content = styled.div`
  display: grid;
  columns: 2;
  justify-items: center;
  padding: 3rem;
`

export const ArticleList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2.5rem;
  grid-row-gap: 2rem;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
`
