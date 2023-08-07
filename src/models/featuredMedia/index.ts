import { fetchAPI } from "@/lib/base";
import FeaturedMediaInterface from './interface';

export default class FeaturedMedia implements FeaturedMediaInterface {
  id: number;
  altText: string;
  description: string;
  guid: { rendered: ""; };
  mediaDetails: { width: number; height: number; file: ''; filesize: number; };
  link: string;
  title: { rendered: ""; };
  sourceUrl: string;

  constructor() {
    this.id = 0;
    this.altText = '';
    this.description = '';
    this.guid = { rendered: '' };
    this.mediaDetails = { width: 0, height: 0 ,file: '', filesize: 0 };
    this.link = '';
    this.title = { rendered: '' };
    this.sourceUrl = '';
    
  }
  async getFeaturedMedias(pathUrl: string): Promise<any> {
    const data: FeaturedMediaInterface = await fetchAPI(pathUrl)
    return data;
  }

}

