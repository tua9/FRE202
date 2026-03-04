import api from "../api/movieApi";

const fetchMovies = async () => {
  try {
    const response = await api.get("/movies");

    const data = response.data;
    setMovies(data);

    console.log("Tổng số bản ghi:", response.headers["x-total-count"]);
  } catch (error) {
    console.error("Lỗi khi tải danh sách phim:", error.message);
  }
};
