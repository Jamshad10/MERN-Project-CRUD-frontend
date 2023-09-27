import './App.css';
import AddForm from './pages/AddForm';
import EditForm from './pages/EditForm';
import Users from './pages/Users';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Users/>} />
        <Route path='/add' element={<AddForm/>} />
        <Route path='/edit/:id' element={<EditForm/>} />
      </Routes>
    </div>
  );
}

export default App;
