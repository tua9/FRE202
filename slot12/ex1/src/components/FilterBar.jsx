import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  genreFilter,
  setGenreFilter,
  durationSort,
  setDurationSort,
  sortByTitle,
  setSortByTitle,
  genres,
}) => {
  return (
    <div className="bg-light p-3 rounded mb-4 border shadow-sm">
      <Row className="g-3 align-items-end">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold">Tìm kiếm phim</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Nhập tên phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">Thể loại</Form.Label>
            <Form.Select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">Sắp xếp Tên</Form.Label>
            <Form.Select
              value={sortByTitle}
              onChange={(e) => setSortByTitle(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">Thời lượng</Form.Label>
            <Form.Select
              value={durationSort}
              onChange={(e) => setDurationSort(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="short">Ngắn nhất</option>
              <option value="long">Dài nhất</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2} className="text-end">
          <small className="text-muted">Bộ lọc đang hoạt động</small>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;
