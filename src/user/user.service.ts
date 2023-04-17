import { Injectable, NotFoundException } from "@nestjs/common"
import { Pool } from "pg"
import { InjectDB } from "../db/inject-db.decorator"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { hash } from "bcrypt"
import { Role, User } from "./entities/user.entity"

const BCRYPT_SALT_ROUNDS = 12

@Injectable()
export class UserService {
  constructor(@InjectDB() private readonly db: Pool) {}

  private async hashPassword(password: string) {
    const newPassword = await hash(password, BCRYPT_SALT_ROUNDS)

    return newPassword
  }

  async create({ password, email, name }: CreateUserDto) {
    const newPassword = await this.hashPassword(password)

    const user = await this.db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, newPassword],
    )

    return this.mapUser(user.rows[0])
  }

  async findAll() {
    return (await this.db.query("SELECT version()")).rows
  }

  async findOne(id: number) {
    const result = await this.db.query("SELECT * FROM users WHERE id = $1", [
      id,
    ])
    if (result.rows.length === 0) {
      throw new NotFoundException("User not found")
    }

    const user = this.mapUser(result.rows[0])

    return user
  }

  async findOneWithRole(id: number, role: Role) {
    const result = await this.db.query(
      `
SELECT id, name, email, role FROM users WHERE id = $1 AND role = $2
ORDER BY id ASC
`,
      [id, role],
    )

    if (result.rows.length === 0) {
      throw new NotFoundException("User not found")
    }

    const user = this.mapUser(result.rows[0])

    return user
  }

  update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    if (result.rows.length === 0) {
      throw new NotFoundException("User not found")
    }

    const user = this.mapUser(result.rows[0])

    return user
  }

  private mapUser(user: any): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    })
  }
}
