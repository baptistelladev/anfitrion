import { WhereFilterOp } from "firebase/firestore";

export interface IFirebaseFilter {
  field: string;
  operator: WhereFilterOp;
  value: any;
}
