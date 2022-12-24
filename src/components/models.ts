export interface Meta {
  totalCount: number;
}

export type Todo = {
  id: string;
  type: string;
  title: string;
  completed: boolean;
  is_deleted: boolean;
  is_editing: boolean;
  created: string;
  updated: string;
};