import { fetchAPI } from "@/lib/base";
import PostInterface from './interface';

export default class Post implements PostInterface {
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

  constructor() {
    this.id = 0;
    this.date = '';
    this.dateGmt = '';
    this.guid = { rendered: '' };
    this.slug = '';
    this.type = '';
    this.link = '';
    this.title = { rendered: '' };
    this.content = { rendered: '', protected: false };
    this.excerpt = { rendered: '', protected: false };
    this.author = 0;
    this.featuredMedia = 0;
    this.meta = [];
    this.categories = [];
    this.defaultImg = ['', 0, 0, false];
    this.videoDestaque = '';
    this.imageDestaque = '';
    this.categoriesData = [];
    this.favorite = false;
    this.readLater = false;
  }
  async getPosts(pathUrl: string): Promise<any> {
    const data:PostInterface = await fetchAPI(pathUrl)
    return data;
  }

  async getPostById(pathUrl: string): Promise<any> {
    const data:PostInterface = await fetchAPI(pathUrl)
    return data;
  }
}