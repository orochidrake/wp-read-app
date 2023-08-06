import UserInterface from "../user/interface";
import PostInterface from "../post/interface";

export default interface FavoriteInterface {
  id: number;
  user: UserInterface;
  post: PostInterface;
}