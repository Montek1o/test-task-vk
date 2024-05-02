export interface IComment {
  id: number;
  text: string;
  by: string;
  time: string;
  kids: number[];
  comments: IComment[];
  dead?: boolean;
  deleted?: boolean;
}