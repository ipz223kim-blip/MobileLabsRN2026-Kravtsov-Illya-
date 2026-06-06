export type TaskType =
  | 'singleTap'
  | 'doubleTap'
  | 'longPress'
  | 'pan'
  | 'flingRight'
  | 'flingLeft'
  | 'pinch'
  | 'score';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  target: number;
}

export const tasks = [
  { id: '1', title: '10 кліків', type: 'singleTap', target: 10 },
  { id: '2', title: '5 подвійних кліків', type: 'doubleTap', target: 5 },
  { id: '3', title: 'Утримати 3c', type: 'longPress', target: 1 },
  { id: '4', title: 'Перетягнути об’єкт', type: 'pan', target: 1 },
  { id: '5', title: 'Swipe вправо', type: 'flingRight', target: 1 },
  { id: '6', title: 'Swipe вліво', type: 'flingLeft', target: 1 },
  { id: '7', title: 'Змінити розмір', type: 'pinch', target: 1 },
  { id: '8', title: 'Отримати 100 очок', type: 'score', target: 100 },
];
