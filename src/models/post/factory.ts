import Post from ".";
import FeaturedMediaCreator from "../featuredMedia/factory";
import PostInterface  from './interface';
import {toSnake} from "@/utils/helpers/normalizeAttrs"

export default class PostCreator {
  static factory(data?: any): PostInterface {
    const p = new Post();

    if (!data) return p;

    Object.keys(p).forEach((att) => {
      if (att == 'featuredMedia') {
        const _f = FeaturedMediaCreator.factory(data['featured_media'])
        Object.defineProperty(p, 'featuredMedia', { value: _f })
        return
      }

      if (data[att]) {
        Object.defineProperty(p, att, { value: data[att] });
        return;
      }

      const snakeCaseKey = toSnake(att);
      if (data[snakeCaseKey]) {
        Object.defineProperty(p, att, { value: data[snakeCaseKey] });
      }
    });

    return p;
  }
}