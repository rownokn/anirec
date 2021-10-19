import logo from './logo.svg';
import './App.scss';
import NavBar from './components/js/NavBar';
import Dashboard from './components/js/Dashboard';
import { AccountProvider } from './components/js/account_management/AccountProvider';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {BrowserRouter} from 'react-router-dom'


function App() {
  const queryClient = new QueryClient()

  return (
    <BrowserRouter >
      <QueryClientProvider client={queryClient}>
        <AccountProvider>
          <div className="App">
            <header className="App-header">
              <NavBar/>
            </header>
            <Dashboard/>
          </div>
        </AccountProvider>
      </QueryClientProvider>
    </BrowserRouter>
   
  );
}

export default App;
