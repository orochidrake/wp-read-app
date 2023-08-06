import User from ".";
import UserInterface  from './interface';
import {toSnake} from "@/utils/helpers/normalizeAttrs"

export default class UserCreator {
  static factory(data?: any): UserInterface {
    const p = new User();

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