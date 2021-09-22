import logo from './logo.svg';
import './App.scss';
import NavBar from './components/js/NavBar';
import Dashboard from './components/js/Dashboard';
import { AccountProvider } from './components/js/account_management/AccountProvider';


import {BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter >
      <AccountProvider>
        <div className="App">
          <header className="App-header">
            <NavBar/>
          </header>
          <Dashboard/>
        </div>
      </AccountProvider>
    </BrowserRouter>
   
  );
}

export default App;
