import { Assignment, AssignmentStatus } from '../types';

export const sampleAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Data Structures Final Project',
    courseName: 'Data Structures',
    courseCode: 'CS 201',
    dueDate: '2025-10-29',
    points: 100,
    status: AssignmentStatus.ToDo,
  },
  {
    id: '2',
    title: 'Machine Learning Assignment 3',
    courseName: 'Machine Learning',
    courseCode: 'CS 301',
    dueDate: '2025-11-01',
    points: 75,
    status: AssignmentStatus.Upcoming,
  },
  {
    id: '3',
    title: 'Database Design Quiz',
    courseName: 'Database Systems',
    courseCode: 'CS 250',
    dueDate: '2025-10-26',
    points: 50,
    status: AssignmentStatus.Overdue,
  },
   {
    id: '4',
    title: 'Calculus II Problem Set 5',
    courseName: 'Calculus II',
    courseCode: 'MATH 152',
    dueDate: '2025-11-05',
    points: 100,
    status: AssignmentStatus.Upcoming,
  },
   {
    id: '5',
    title: 'History of Rome Midterm Essay',
    courseName: 'Ancient History',
    courseCode: 'HIST 101',
    dueDate: '2025-11-10',
    points: 150,
    status: AssignmentStatus.Upcoming,
  },
];
