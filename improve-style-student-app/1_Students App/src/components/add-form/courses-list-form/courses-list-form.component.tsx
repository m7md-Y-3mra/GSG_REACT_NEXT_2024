import { useEffect, useState, useRef } from "react";


interface IProps {
  value: string[];
  onSubmit: (list: string[]) => void;
}

const CoursesListForm = (props: IProps) => {
  const [courseList, setCoursesList] = useState(props.value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  

  useEffect(() => {
    setCoursesList(props.value);
  }, [props.value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    
    event.preventDefault();
    
    // console.log(event.target);
    
    // const formData = new FormData(event.target as HTMLFormElement); // Create a FormData object
    // formData.append("key", "value");
    // console.log([...formData.entries()]);
    // console.log(formData);    
    // const newCourse = formData.get("courseName") as string;
    // newCourse?.toString();
    // console.log(event.target);
    // console.log(event.currentTarget.courseName);
    
    const newCourse = event.currentTarget.courseName.value;
    const newList:string[] = [...courseList, newCourse];
    setCoursesList(newList);
    props.onSubmit(newList);
    // event.currentTarget["courseName"].value = "";
    if(inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="addCourseForm">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="cName">Enter Course: </label>
          <div className="course-form-input">
            <input ref={inputRef} id="cName" type="text" name="courseName"/>
            <button type="submit">Add Course</button>
          </div>
        </div>
      </form>
      <ul >
        {courseList.map((course, index) => <li key={course + index}>{course}</li>)}
      </ul>
    </div>
  )
};

export default CoursesListForm;