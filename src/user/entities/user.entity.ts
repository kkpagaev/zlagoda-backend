export enum Role {
  User = "user",
  Admin = "admin",
  Moderator = "moderator",
}

export class User {
  id: number

  email: string

  name: string

  password: string

  roles: Role[]
}
