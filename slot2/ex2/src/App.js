import './App.css';
import About from './components/About';
import { listOfStudent } from './listOfStudent';

function App() {
  return (
    <div className="App">
      {listOfStudent.map(student => (
        <About
          key={student.id}
          student={student}
        />
      ))}
    </div>
  );
}

export default App;
