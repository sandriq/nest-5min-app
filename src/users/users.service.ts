import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  insertUser(firstname: string, lastname: string, bio: string, age: number) {
    // прямо так - прямо в массив
    // ведь главное - это понимание смысла использования Nest
    const userId = Math.random().toString();
    const newUser = new User(userId, firstname, lastname, bio, age);
    this.users.push(newUser);
    return userId;
  }

  getUsers() {
    return [...this.users];
  }

  getSingleUser(userId: string) {
    const user = this.findUser(userId)[0];
    return { ...user };
  }

  updateUser(userId: string, firstname: string, lastname: string, bio: string, age: number) {
    const [user, index] = this.findUser(userId);
    const updatedUser = { ...user };
    // упростить, и да, можно объединить с insert
    if (firstname) {
      updatedUser.firstname = firstname;
    }
    if (lastname) {
      updatedUser.lastname = lastname;
    }
    if (bio) {
      updatedUser.bio = bio;
    }
    if (age) {
      updatedUser.age = age;
    }
    this.users[index] = updatedUser;
    return updatedUser;
  }

  deleteUser(userId: string) {
      const index = this.findUser(userId)[1];
      this.users.splice(index, 1);
  }

  private findUser(id: string): [User, number] {
    const userIndex = this.users.findIndex(user => user.id === id);
    const user = this.users[userIndex];
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return [user, userIndex];
  }
}
