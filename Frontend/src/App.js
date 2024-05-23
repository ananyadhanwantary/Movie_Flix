import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginComponent/>}></Route>
      <Route path="/signup" element={<RegisterComponent/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
