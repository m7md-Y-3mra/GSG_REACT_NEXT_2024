import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { IStudent } from "../types";

const useStudentFilters = (studentsList: IStudent[]) => {
  const [params, setParams] = useSearchParams();
  const [filteredList, setFilteredList] = useState<IStudent[]>(studentsList);

  useEffect(() => {
    const query = params.get('q') || '';
    const graduated = params.get('graduated');
    const courses = params.getAll('courses');

    let filtered = studentsList;

    // Filter by query (search)
    if (query) {
      filtered = filtered.filter(std =>
        std.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by graduation status
    if (graduated === 'grad') {
      filtered = filtered.filter(std => std.isGraduated);
    } else if (graduated === 'non-grad') {
      filtered = filtered.filter(std => !std.isGraduated);
    }

    // Filter by courses (AND condition)
    if (courses.length) {
      filtered = filtered.filter(std =>
        courses.every(c => std.coursesList.includes(c))
      );
    }

    setFilteredList(filtered);
  }, [params, studentsList]);

  // Handlers for updating search params
  const handleSearch = (query: string) => {
    if (query.length) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setParams(params);
  };

  const handleGraduationFilter = (value: string) => {
    if (value === 'all') {
      params.delete('graduated');
    } else {
      params.set('graduated', value);
    }
    setParams(params);
  };

  const handleCourseFilter = (course: string, checked: boolean) => {
    if (checked) {
      params.append('courses', course);
    } else {
      const updatedCourses = params.getAll('courses').filter(c => c !== course);
      params.delete('courses'); // Remove all courses
      updatedCourses.forEach(c => params.append('courses', c)); // Add back remaining courses
    }
    setParams(params);
  };

  return {
    filteredList,
    handleSearch,
    handleGraduationFilter,
    handleCourseFilter,
    params,
  };
};

export default useStudentFilters;
