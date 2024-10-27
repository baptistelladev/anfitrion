import { WhereFilterOp } from "firebase/firestore";

export interface IFIrebaseFilter {
  field: string;
  operator: WhereFilterOp;
  value: any;
}
