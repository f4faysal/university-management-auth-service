import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.events';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import initAcademicSemesterEvent from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvent();
  initAcademicFacultyEvents();
  initAcademicDepartmentEvents();
};

export default subscribeToEvents;
