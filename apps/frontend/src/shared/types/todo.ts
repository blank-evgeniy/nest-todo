export interface ToDo {
  id: number;
  title: string;
  complete: boolean;
  content?: string | null;
  authorId: number;
}

export interface ToDoCreateInput {
  title: string;
  complete?: boolean;
  content?: string | null;
}

export interface ToDoUpdateInput {
  title?: string;
  complete?: boolean;
  content?: string | null;
}
