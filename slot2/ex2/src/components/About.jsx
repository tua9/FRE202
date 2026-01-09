//Khai báo 1 đối tượng student gồm id, name, avartar và grade
//In ra thông tin của student bằng h1, p và img

import MyCard from './MyCard'

export default function About({ student }) {
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
