import { Unit } from "./unit";

export interface Ingredient {
  id?: number;
  name: string;
  quantity: number;
  unit: Unit;
  createdAt?: Date;
}
