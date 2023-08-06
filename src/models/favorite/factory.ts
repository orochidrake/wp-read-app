import Favorite from ".";
import FavoriteInterface  from './interface';

export default class FavoriteCreator {
  static factory(data?: any): FavoriteInterface {
    const f = new Favorite();

    if (!data) return f;

    return f;
  }
}