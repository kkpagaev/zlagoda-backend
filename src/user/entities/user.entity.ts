import { Exclude } from "class-transformer"

export enum Role {
  User = "user",
  Admin = "admin",
  Moderator = "moderator",
}

export class User {
  id: number

  email: string

  name: string

  @Exclude()
  password: string

  role: Role

  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
