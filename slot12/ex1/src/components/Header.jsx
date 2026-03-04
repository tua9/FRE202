import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="white" expand="lg" className="mb-4 shadow-sm py-3 sticky-top">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-3 text-gradient">
          <span className="me-2">🎬</span>Movie Hub Premium
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link href="/" className="nav-item-hover fw-medium text-dark">
              🏠 Trang chủ
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <>
                <div className="user-profile-badge me-3 border-0 bg-light shadow-sm">
                  <div className="avatar-circle">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <Navbar.Text className="text-dark ms-2 fw-medium">
                    Chào, <span className="text-primary">{user.fullName}</span>
                  </Navbar.Text>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-pill px-3 logout-btn fw-bold"
                  onClick={handleLogout}
                >
                  🚪 Đăng xuất
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="rounded-pill px-4 login-btn fw-bold shadow-sm"
                onClick={() => navigate("/login")}
              >
                🔑 Đăng nhập
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
