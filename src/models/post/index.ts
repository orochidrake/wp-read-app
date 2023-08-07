import { fetchAPI } from "@/lib/base";
import PostInterface from './interface';
import FeaturedMediaCreator from "../featuredMedia/factory";
import FeaturedMediaInterface from "../featuredMedia/interface";

export default class Post implements PostInterface {
  id: number;
  date: string;
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
  featured_media: FeaturedMediaInterface;
  categories: number[];
  defaultImg: [string, number, number, boolean];
 


  constructor() {
    this.id = 0;
    this.date = '';

    this.guid = { rendered: '' };
    this.slug = '';
    this.type = '';
    this.link = '';
    this.title = { rendered: '' };
    this.content = { rendered: '', protected: false };
    this.excerpt = { rendered: '', protected: false };
    this.featured_media = FeaturedMediaCreator.factory({});
    this.categories = [];
    this.defaultImg = ['', 0, 0, false];
    
  }
  async getPosts(pathUrl: string): Promise<any> {
    const data: PostInterface = await fetchAPI(pathUrl)
    return data;
  }

  async getPostById(pathUrl: string): Promise<any> {
    const data: PostInterface = await fetchAPI(pathUrl)
    return data;
  }
}