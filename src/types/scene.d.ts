import { SceneReference } from "./scene-reference";

export type Scene = {
  id: number;
  content: string;
  next: SceneReference[];
};
