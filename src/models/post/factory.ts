import Post from ".";
import PostInterface  from './interface';
import {toSnake} from "@/utils/helpers/normalizeAttrs"

export default class PostCreator {
  static factory(data?: any): PostInterface {
    const p = new Post();

    if (!data) return p;

    Object.keys(p).forEach((att) => {
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