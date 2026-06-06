import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import {tasks, TaskType} from "@/data/tasks";

type Progress = Record<string, number>;

interface State {
  score: number;
  progress: Progress;
}

type Action =
  | { type: 'INCREMENT_SCORE'; payload: number }
  | { type: 'SET_PROGRESS'; payload: { taskId: string; value: number } };

interface ContextValue {
  state: State;
  incrementScore: (amount: number) => void;
  recordAction: (type: TaskType, increment: number) => void;
}

const initialProgress: Progress = tasks.reduce((acc, t) => {
  acc[t.id] = 0;
  return acc;
}, {} as Progress);

const initialState: State = {
  score: 0,
  progress: initialProgress,
};

const GameContext = createContext<ContextValue | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT_SCORE': {
      const newScore = state.score + action.payload;
      const scoreTask = tasks.find(t => t.type === 'score');
      const newProgress = { ...state.progress };
      if (scoreTask) {
        newProgress[scoreTask.id] = newScore;
      }
      return { score: newScore, progress: newProgress };
    }
    case 'SET_PROGRESS': {
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload.taskId]: action.payload.value,
        },
      };
    }
    default:
      return state;
  }
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const incrementScore = (amount: number) => {
    dispatch({ type: 'INCREMENT_SCORE', payload: amount });
  };

  const recordAction = (type: TaskType, increment: number) => {
    dispatch({ type: 'INCREMENT_SCORE', payload: increment });
    const task = tasks.find(t => t.type === type);
    if (task) {
      const prev = state.progress[task.id] ?? 0;
      dispatch({
        type: 'SET_PROGRESS',
        payload: { taskId: task.id, value: prev + 1 },
      });
    }
  };

  return (
    <GameContext.Provider value={{ state, incrementScore, recordAction }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGameContext(): ContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be inside GameProvider');
  return ctx;
}