import { useEffect, useState } from 'react';
import './App.css';
import Account from './components/Account/Account'
import Home from './components/Home/Home';
import authService from './Services/auth.service';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user && user.access_token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <div className="container">
        {isAuthenticated ?
          <Home setIsAuthenticated={setIsAuthenticated} /> :
          <Account setIsAuthenticated={setIsAuthenticated} />
        }
      </div>
    </div>
  );
}

export default App;
