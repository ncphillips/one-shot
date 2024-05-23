import { SceneReference } from "./scene-reference";

export type Scene = {
  id: string;
  title: string;
  content: string;
  next: SceneReference[];
};
