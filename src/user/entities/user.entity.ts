export class Role {
  id: number

  name: string
}

export class User {
  id: number

  email: string

  name: string

  password: string

  roles: Role[]
}
