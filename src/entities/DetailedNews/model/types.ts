export interface IDetailedNews {
  id: number;
  url: string;
  title: string;
  by: string;
  time: string;
  descendants: number;
  kids: number[];
}