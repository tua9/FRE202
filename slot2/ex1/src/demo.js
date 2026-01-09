
//Hiển thị tên và tuổi
const demo = (name, age) => `Hello ${name} you are ${age} years old.`;  
console.log(demo('Alice', 30));

//Mặc định age 18 tuổi
const greet = (name, age = 18) => `Hello ${name} you are ${age} years old.`;  
console.log(greet('Bob'));

//Hàm tính bình phương 1 số x
const square = x => x * x;  
console.log(square(5));

//Hàm in một đối tượng student bồm các thuộc tính name, age và grade
const printStudent = student => {
    console.log(`id: ${student.id} name: ${student.name} age: ${student.age} grade: ${student.grade}`);
}
let student = {id: 1, name: 'Charlie', age: 20, grade: 'A'}; 
printStudent(student);

//Khai báo 1 list of students và in từng student trong list bằng hàm printStudent
console.log("------List of students------");

const students = [
    {id: 2, name: 'David', age: 21, grade: 'B'},
    {id: 3, name: 'Eva', age: 22, grade: 'A'},
    {id: 4, name: 'Frank', age: 20, grade: 'C'},
    {id: 5, name: 'Grace', age: 23, grade: 'B'},
    {id: 6, name: 'Hannah', age: 21, grade: 'A'},
    {id: 7, name: 'Ian', age: 22, grade: 'C'},
    {id: 8, name: 'Jack', age: 20, grade: 'B'},
    {id: 9, name: 'Kathy', age: 23, grade: 'A'},
    {id: 10, name: 'Leo', age: 21, grade: 'C'},
    {id: 11, name: 'Mia', age: 22, grade: 'B'}
];

students.forEach(student => {
    printStudent(student);
});

for(let i = 0; i < students.length; i++) {
    printStudent(students[i]);
}

for(const student of students) {
    printStudent(student);
}

//Dùng destructuring để lấy thuộc tính từ đối tượng student
console.log ('--- Destructuring ---');

const printStudentDestructured = ({id, name, age, grade}) => {
    console.log(`id: ${id} name: ${name} age: ${age} grade: ${grade}`);
}

students.forEach(student => {
    printStudentDestructured(student);
});


//Dùng rest operator để in tất cả các tên học sinh
console.log ('--- Rest Operator ---');
const [student1, student2, ...restStudents] = students;
console.log(`Student 1: ${student1.name}`);
console.log(`Student 2: ${student2.name}`);
console.log('Rest of the students:');
restStudents.forEach(student => console.log(student.name));

//Thêm 1 student mới vào restStudents sử dụng spread operator
console.log("------Adding a new student------");

const newStudent = {id: 12, name: 'Nina', age: 24, grade: 'AA'};
const updatedStudents = [ newStudent, ...restStudents, newStudent ];
console.log('Updated Students List:');
updatedStudents.forEach(student => printStudent(student));