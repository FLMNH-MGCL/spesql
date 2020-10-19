import { types } from "mobx-state-tree";
import { User } from "./User";

export const SpesqlSession = types.model({
  user: types.maybeNull(User),
});
