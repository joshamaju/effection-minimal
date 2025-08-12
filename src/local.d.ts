declare module "stack54/locals" {
  interface Locals {
    messages: Partial<Record<"info" | "error", Array<string>>>;
  }
}

export {};
