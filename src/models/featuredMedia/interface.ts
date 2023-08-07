export default interface FeaturedMediaInterface {
  id: number;
  altText : string;
  description: string;
  guid: { rendered: '' };
  mediaDetails: { width: number, height: number, file: '', filesize: number };
  link: string;
  title: { rendered: '' };
  sourceUrl: string;


  getFeaturedMedias(pathUrl: string): Promise<any>;


}