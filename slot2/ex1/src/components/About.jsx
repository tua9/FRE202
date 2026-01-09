//Khai báo 1 đối tượng student gồm id, name, avartar và grade
//In ra thông tin của student bằng h1, p và img

export default function About() {
  const student = {
    id: 1,
    name: 'Alice',
    avatar:
      'https://images.unsplash.com/photo-1762291834384-09118dda091d?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njc5NTA3Njh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format',
    grade: 'A',
  }

  return (
    <div>
      <h1>About Student</h1>
      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <img src={student.avatar} alt={student.name} height={400} width={400} />
      <p>Grade: {student.grade}</p>
    </div>
  )
}
