import { Reducer } from "redux";
import TasksState from "./types/TaskState";
import TasksAction from "./types/TaskAction";

const initialState: TasksState = {
  tasks: [],
};

const tasksReducer: Reducer<TasksState, TasksAction> = (
  state = initialState,
  { payload, type }
) => {
  switch (type) {
    case "TASK_ADDED": {
      return { ...state, tasks: [payload, ...state.tasks] };
    }

    case "TASKS_SORTED_BY_TIME": {
      return {
        ...state,
        tasks: state.tasks.sort((a, b) => {
          if (payload === "DESC") {
            return b.timeToDo - a.timeToDo;
          } else {
            return a.timeToDo - b.timeToDo;
          }
        }),
      };
    }

    case "TASKS_LOADED": {
      return { ...state, tasks: payload };
    }

    case "TASK_DELETED": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };
    }

    case "TASK_UPDATED": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? payload : task
        ),
      };
    }

    default:
      return state;
  }
};

export default tasksReducer;
