import type { User } from "./core/models/user";

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}
