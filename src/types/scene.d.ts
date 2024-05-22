import { SceneReference } from "./scene-reference";

export type Scene = {
  id: number;
  title: string;
  content: string;
  next: SceneReference[];
};
