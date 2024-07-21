
export interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    status: 'TODO' | 'INPROGRESS' | 'DONE';
  }