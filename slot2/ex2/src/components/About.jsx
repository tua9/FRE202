//Khai báo 1 đối tượng student gồm id, name, avartar và grade
//In ra thông tin của student bằng h1, p và img

import MyCard from './MyCard'

export default function About() {
  const student = {
    id: 1,
    name: 'Alice',
    avatar:
      'https://images.unsplash.com/photo-1762291834384-09118dda091d?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njc5NTA3Njh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format',
    grade: 'A',
    age: 200,
  }

  return (
    <MyCard
      id={student.id}
      name={student.name}
      avatar={student.avatar}
      grade={student.grade}
      age={student.age}
    />
  )
}
