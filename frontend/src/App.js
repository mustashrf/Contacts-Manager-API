import { useEffect, useState } from 'react';
import './App.css';
import AccountForm from './components/Account/AccountForm'
import Home from './components/Home/Home';
import AuthService from './Services/auth.service';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user && user.access_token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <div className="container">
        {console.log(isAuthenticated)}
        {isAuthenticated ? <Home /> : <AccountForm setIsAuthenticated={setIsAuthenticated}/>}
      </div>
    </div>
  );
}

export default App;
