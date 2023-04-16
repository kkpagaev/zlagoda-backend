import { Inject } from "@nestjs/common"
import { PG_CONNECTION } from "../constants"

export const InjectDB = () => Inject(PG_CONNECTION)
