import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(
    @Body('firstname') userFirstname: string,
    @Body('lastname') userLastname: string,
    @Body('bio') userBio: string,
    @Body('age') userAge: number,
  ) {
    const generatedId = this.usersService.insertUser(
      userFirstname,
      userLastname,
      userBio,
      userAge
    );
    return { id: generatedId };
  }

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  // а ещё insert и update запросы можно обрабатывать одним сервисом, но об этом позже :)
  updateUser(
    @Param('id') userId: string,
    @Body('firstname') userFirstname: string,
    @Body('lastname') userLastname: string,
    @Body('bio') userBio: string,
    @Body('age') userAge: number,
  ) {
    return this.usersService.updateUser(userId, userFirstname, userLastname, userBio, userAge);
  }

  @Delete(':id')
  removeUser(@Param('id') userId: string) {
      this.usersService.deleteUser(userId);
      return null;
  }
}
