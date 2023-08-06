import ReadLater from ".";
import ReadLaterInterface  from './interface';

export default class ReadLaterCreator {
  static factory(data?: any): ReadLaterInterface {
    const rl = new ReadLater();

    if (!data) return rl;

    return rl;
  }
}