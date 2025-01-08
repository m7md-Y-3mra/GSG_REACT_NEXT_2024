import { useRef } from "react";
import AddForm from "../components/add-form/add-form.component";
import Student from "../components/student/student.component";
import { IStudent } from "../types";
import { studentReducer, StudentActionKind, StudentAction, StudentState } from "../reducers/studentsReducer";
import { usePersistentReducer } from "../hooks/usePersistentReducer";

const Main = () => {
  const lastStdRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = usePersistentReducer<StudentState, StudentAction>("students", studentReducer, {
    students: [],
    totalAbsents: 0
  })

  const removeFirst = () => {
    dispatch({type: StudentActionKind.DELETE_STUDENT})
  }

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({type: StudentActionKind.CHANGE_ABSENT, payload: {id, change}})
  }

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({type: StudentActionKind.ADD_STUDENT, payload: {newStudent}})
  }

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <AddForm className="addForm" onSubmit={handleAddStudent} />
      <div className='stats'>
        <button onClick={removeFirst}>POP Student</button>
        <button onClick={scrollToLast}>Scroll to Last</button>
        <b style={{ fontSize: '12px', fontWeight: 100, color: 'gray' }}>Total Absents {state.totalAbsents}</b>
      </div>
      {
        state.students.map(student => (
          <Student
            key={student.id}
            id={student.id}
            name={student.name}
            age={student.age}
            absents={student.absents}
            isGraduated={student.isGraduated}
            coursesList={student.coursesList}
            onAbsentChange={handleAbsentChange}
          />
        )
        )
      }
      <div ref={lastStdRef}></div>
    </>
  )
}

export default Main;