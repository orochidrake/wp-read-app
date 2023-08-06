import UserInterface from './interface'

export default class User implements UserInterface {
  id: number;
  email: string;

  constructor() {
    this.id = 0;
    this.email = 'string';
  }
}





