import FeaturedMediaInterface from "../featuredMedia/interface";

export default interface PostInterface {
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

  getPosts(pathUrl: string): Promise<any>;


}