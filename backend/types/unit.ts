import { Ingredient } from "./ingredient";

export interface Unit {
  id?: number;
  name: string;
  ingredient?: Ingredient;
  createdAt: Date;
}
