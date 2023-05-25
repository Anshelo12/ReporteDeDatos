"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let students = [];
let teachers = [];
let activities = [];
let gradebookSetups = [];
let assignments = [];
var Course;
(function (Course) {
    Course["GraphicDesign"] = "Graphic Design";
    Course["Database"] = "Database";
    Course["CommunityManager"] = "Community Manager";
})(Course || (Course = {}));
function addStudent() {
    let currentStudent = {
        dni: readFromHtml("student_dni"),
        fullName: readFromHtml("student_fullname"),
        level: parseInt(readFromHtml("student_level"))
    };
    students.push(currentStudent);
    console.table(students);
}
function addTeacher() {
    let currentTeacher = {
        dni: readFromHtml("teacher_dni"),
        fullName: readFromHtml("teacher_fullname"),
        knowledge_are: readFromHtml("teacher_area")
    };
    teachers.push(currentTeacher);
    console.table(teachers);
}
function addActivity() {
    let currentActivity = {
        name: readFromHtml("activity_name"),
    };
    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}
function addGradebookSetup() {
    let currentGradebookSetup = {
        value: readFromHtml("gradebook_value"),
        course: readFromHtml("gradebook_course"),
        activity: readFromHtml("gradebook_activity"),
        maximun_grade: parseInt(readFromHtml("gradebook_maximun_grade"))
    };
    gradebookSetups.push(currentGradebookSetup);
    console.table(gradebookSetups);
    initSelect();
}
function addAssignment() {
    let currentAssigment = {
        student: readFromHtml("assignment_student"),
        gradebooksetup: readFromHtml("assignment_gradebooksetup"),
        grade: parseInt(readFromHtml("assignment_grade")),
    };
    assignments.push(currentAssigment);
    console.table(assignments);
    initSelect();
}
function readFromHtml(id) {
    return document.getElementById(id).value;
}
function initSelect() {
    let gradebookCourse = document.getElementById("gradebook_course");
    document.querySelectorAll("#gradebook_course option").forEach(option => option.remove());
    let courses = Object.values(Course);
    courses.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        gradebookCourse.add(option);
    });
    let gradebookActivity = document.getElementById("gradebook_activity");
    document.querySelectorAll("#gradebook_activity option").forEach(option => option.remove());
    activities.forEach((activity) => {
        let option = document.createElement("option");
        option.value = activity.name;
        option.text = activity.name;
        gradebookActivity.add(option);
    });
    let assignmentStudent = document.getElementById("assignment_student");
    document.querySelectorAll("#assignment_student option").forEach(option => option.remove());
    students.forEach((value) => {
        let option = document.createElement("option");
        option.value = value.fullName;
        option.text = value.fullName;
        assignmentStudent.add(option);
    });
    let assignmentSetup = document.getElementById("assignment_gradebooksetup");
    document.querySelectorAll("#assignment_gradebooksetup option").forEach(option => option.remove());
    gradebookSetups.forEach((setup) => {
        let option = document.createElement("option");
        option.value = setup.value;
        option.text = setup.value;
        assignmentSetup.add(option);
    });
}
initSelect();
class Gradebook {
    constructor(students, activities, gradebookSetups, assignments, teachers) {
        this.students = students;
        this.activities = activities;
        this.gradebookSetups = gradebookSetups;
        this.assignments = assignments;
        this.teachers = teachers;
    }
    ;
    buildGradebookDTOFromAssignment() {
        let gradebookDTOs = [];
        this.assignments.forEach((assignment) => {
            let currentGradebooksetup = gradebookSetups.filter((item) => item.value === assignment.gradebooksetup)[0];
            let currentStudent = students.filter((student) => student.dni === assignment.student)[0];
            let rowGradebook = {
                //Course
                course: currentGradebooksetup.course,
                //Student
                studentName: currentStudent.fullName,
                lastName: "",
                level: currentStudent.level,
                dni: assignment.student,
                fullName: currentStudent.fullName,
                //GradebookSetup
                value: "",
                activity: "",
                maximun_grade: 0,
                //Activity
                name: "",
                //Assignment
                student: assignment.student,
                gradebooksetup: assignment.gradebooksetup,
                grade: assignment.grade
            };
            gradebookDTOs.push(rowGradebook);
        });
        return gradebookDTOs;
    }
}
function generateReport() {
    let reportGrade = new Gradebook(students, activities, gradebookSetups, assignments, teachers);
    let rowReport = reportGrade.buildGradebookDTOFromAssignment();
    let reportTable = document.getElementById("report");
    rowReport.forEach((itemDTO) => {
        let tr;
        let td;
        tr = reportTable.insertRow(0);
        td = tr.insertCell(0);
        td.innerHTML = itemDTO.course;
        td = tr.insertCell(1);
        td.innerHTML = itemDTO.student;
        td = tr.insertCell(2);
        td.innerHTML = itemDTO.level.toString();
        td = tr.insertCell(3);
        td.innerHTML = itemDTO.activity;
        td = tr.insertCell(4);
        td.innerHTML = itemDTO.value;
        td = tr.insertCell(5);
        td.innerHTML = itemDTO.grade.toString();
    });
}
