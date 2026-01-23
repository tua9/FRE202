// src/data/ListOfUsers.js
export const users = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "admin",
    status: "Active",
    password: "admin123", // Lưu ý: Trong thực tế KHÔNG lưu password plain text
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "nguyen.thi",
    status: "Active",
    password: "user456",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    username: "tran.van.a",
    status: "Locked",
    password: "pass789",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    username: "le.thi.b",
    status: "Active",
    password: "secure101",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    username: "pham.hoang",
    status: "Locked",
    password: "test202",
  },
];