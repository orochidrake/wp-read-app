export default interface PostInterface {
  id: number;
  date: string;
  dateGmt: string;
  guid: {
    rendered: string;
  };
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featuredMedia: number;
  meta: any[];
  categories: number[];
  defaultImg: [string, number, number, boolean];
  videoDestaque: string;
  imageDestaque: string;
  categoriesData: {
    termId: number;
    name: string;
    slug: string;
    termGroup: number;
    termTaxonomyId: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
    catId: number;
    categoryCount: number;
    categoryDescription: string;
    catName: string;
    categoryNicename: string;
    categoryParent: number;
  }[];
  readLater: boolean;
  favorite: boolean;

  getPosts(pathUrl: string): Promise<any>;

  
}