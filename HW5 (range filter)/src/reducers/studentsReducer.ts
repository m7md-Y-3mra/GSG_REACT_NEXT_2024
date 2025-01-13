import { IStudent } from "../types";

export enum StudentActionKind {
  ADD_STUDENT = "ADD_STUDENT",
  DELETE_STUDENT = "DELETE_STUDENT",
  CHANGE_ABSENT = "CHANGE_ABSENT",
}

export type StudentState = {
  students: IStudent[];
  totalAbsents: number;
};

export type StudentAction =
  | {
      type: StudentActionKind.ADD_STUDENT;
      payload: { newStudent: IStudent };
    }
  | {
      type: StudentActionKind.DELETE_STUDENT;
    }
  | {
      type: StudentActionKind.CHANGE_ABSENT;
      payload: { id: string, change:  number};
    }


export function studentReducer(
  state: StudentState,
  action: StudentAction
): StudentState {
  switch (action.type) {
    case StudentActionKind.ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload.newStudent],
      };
    case StudentActionKind.DELETE_STUDENT: {
      const newList = [...state.students];
      newList.shift();
      return { ...state, students: newList };
    }
    case StudentActionKind.CHANGE_ABSENT:
      return {
        students: state.students.map((std) =>
          std.id === action.payload.id
            ? { ...std, absents: std.absents + action.payload.change }
            : std
        ),
        totalAbsents: state.totalAbsents + action.payload.change,
      }
    default:
      return state;
  }
}
