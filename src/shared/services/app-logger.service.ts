import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class AppLoggerService extends Logger {
  public setContext(context: string) {
    this.context = context
  }
}
