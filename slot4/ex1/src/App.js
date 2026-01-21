import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import BannerImage from "./data/BannerImage";
import PizzaList from './data/PizzaList';

import './App.css';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Menu from './components/Menu';
import BookTable from './components/BookTable';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Banner images={BannerImage} />
      <Menu items={PizzaList} />
      <BookTable />
    </div>
  );
}

export default App;
