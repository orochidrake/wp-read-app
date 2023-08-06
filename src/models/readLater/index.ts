import ReadLaterInterface from './interface';
import UserInterface from '../user/interface'
import PostInterface from '../post/interface'
import PostCreator from '../post/factory';
import UserCreator from '../user/factory';

export default class ReadLater implements ReadLaterInterface {
  id: number;
  user: UserInterface;
  post: PostInterface;

  constructor() {
    this.id = 0
    this.user = UserCreator.factory({})
    this.post = PostCreator.factory({})
  }
}





