import FeaturedMedia from ".";
import FeaturedMediaInterface  from './interface';
import {toSnake} from "@/utils/helpers/normalizeAttrs"

export default class FeaturedMediaCreator {
  static factory(data?: any): FeaturedMediaInterface {
    const p = new FeaturedMedia();

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