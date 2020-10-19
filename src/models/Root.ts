import { types } from "mobx-state-tree";
import { SpesqlSession } from "./SpesqlSession";

export const RootModel = types.model({
  session: SpesqlSession,
});
