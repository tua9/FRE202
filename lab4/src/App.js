import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarMenu from './components/NavbarMenu';
import QuantityEditor from './components/QuantityEditor';       // Ex1
import OrderConfirmation from './components/OrderConfirmation'; // Ex2
import ProductForm from './components/ProductForm';             // Ex3
import TodoList from './components/TodoList';                   // Ex4

function App() {
  return (
    <BrowserRouter>
      <NavbarMenu />
      <Container fluid className="py-5 bg-light min-vh-100">
        <Routes>
          <Route path="/" element={<QuantityEditor />} />
          <Route path="/ex1" element={<QuantityEditor />} />
          <Route path="/ex2" element={<OrderConfirmation />} />
          <Route path="/ex3" element={<ProductForm />} />
          <Route path="/ex4" element={<TodoList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;