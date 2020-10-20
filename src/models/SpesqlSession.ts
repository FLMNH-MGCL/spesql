import { types } from "mobx-state-tree";
import { User } from "./User";

export const QueryData = types.model({
  queryString: types.optional(types.string, ""),
});

export const SpesqlSession = types.model({
  user: types.maybeNull(User),
  currentQuery: QueryData,
});
