import {BrowserRouter, Route, Routes} from 'react-router-dom'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Navbar from './header/Navbar';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import { useState } from 'react';
import Login from './components/Login';
import LoginState from './context/loginState';

function App() {

  const [loginPopUp, setLoginPopUp] = useState(false)

  return (
    <BrowserRouter>
    <LoginState>
    <Navbar loginPopUp={loginPopUp} setLoginPopUp={setLoginPopUp} />
   {loginPopUp && <Login setLoginPopUp={setLoginPopUp}/>}
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/collections/:collection_name/:collection_id' element={<Collection/>}/>
      </Routes>
      </LoginState>
    </BrowserRouter>
  );
}

export default App;
