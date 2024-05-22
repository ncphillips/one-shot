export type Adventure = {
  name: string;
  author: Author;
  source: string;
  scenes: Record<number, Scene>;
};
