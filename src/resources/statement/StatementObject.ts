import {
  StatementRef,
  SubStatement,
  InteractionActivity,
  ObjectiveActivity,
  Actor,
} from ".";
import { Activity } from "../../XAPI";

export type StatementObject =
  | Activity
  | InteractionActivity
  | ObjectiveActivity
  | Actor
  | StatementRef
  | SubStatement;
