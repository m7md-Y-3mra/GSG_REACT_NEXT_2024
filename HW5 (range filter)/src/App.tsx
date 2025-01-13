import './App.css'
import Main from './screens/Main.screen';
import About from './screens/About.screen';
import NotFound from './screens/NotFound.screen';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import StudentDetails from './screens/StudentDetails.screen';
import { IStudent } from './types';
import AddStudent from './screens/AddStudent.screen';
import { usePersistentReducer } from './hooks/usePersistentReducer';
import { StudentAction, StudentActionKind, studentReducer, StudentState } from './reducers/studentsReducer';

function App() {
  const h1Style = { color: '#69247C', fontSize: '24px' };
  const [state, dispatch] = usePersistentReducer<StudentState, StudentAction>("students", studentReducer, {
    students: [],
    totalAbsents: 0
  })
  const location = useLocation();

  const removeFirst = () => {
    dispatch({type: StudentActionKind.DELETE_STUDENT})
  }

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({type: StudentActionKind.CHANGE_ABSENT, payload: {id, change}})
  }

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({type: StudentActionKind.ADD_STUDENT, payload: {newStudent}})
  }

  return (
    <div className="main wrapper">
      <h1 style={h1Style}>Welcome to GSG React/Next Course</h1>
      <nav>
        <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home Page</Link>
        <Link to='/add' className={location.pathname === '/add' ? 'active' : ''}>Add Student</Link>
        <Link to='/about' className={location.pathname === '/about' ? 'active' : ''}>About App</Link>
      </nav>
      <Routes>
        <Route path='/' element={
          <Main
            studentsList={state.students}
            totalAbsents={state.totalAbsents}
            onAbsent={handleAbsentChange}
            onRemove={removeFirst}
          />
        } />
        <Route path='/add' element={<AddStudent onAdd={handleAddStudent} />} />
        <Route path='/about' element={<About />} />
        <Route path='/student/:id' element={<StudentDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;