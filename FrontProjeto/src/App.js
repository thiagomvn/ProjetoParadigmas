import './App.css';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';

function App() {

  return (
    <div>
      <Menu />
      <Outlet />    
    </div>
  );
}

export default App;
