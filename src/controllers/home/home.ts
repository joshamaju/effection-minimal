import { handler } from "../../utils/handler";

export const index = handler(function* (req, res) {
  throw new Error('boom')
});
