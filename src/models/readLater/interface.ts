import UserInterface from "../user/interface";
import PostInterface from "../post/interface";

export default interface ReadLaterInterface {
  id: number;
  user: UserInterface;
  post: PostInterface;


}