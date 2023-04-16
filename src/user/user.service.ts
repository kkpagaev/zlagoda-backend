import { Injectable } from "@nestjs/common"
import { Pool } from "pg"
import { InjectDB } from "../db/inject-db.decorator"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UserService {
  constructor(@InjectDB() private readonly db: Pool) {}

  create(_createUserDto: CreateUserDto) {
    return "This action adds a new user"
  }

  async findAll() {
    return (await this.db.query("SELECT version()")).rows
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
