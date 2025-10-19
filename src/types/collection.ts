import { Artwork } from "./art";

export interface Collection {
  id: number;
  title: string;
  title_th: string;
  description: string;
  description_th: string;
  artworks: Artwork[];
}
