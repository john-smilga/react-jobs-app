import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Dashboard, Register, Edit, Error, PrivateRoute } from './pages';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <PrivateRoute path='/dashboard' exact>
          <Dashboard />
        </PrivateRoute>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/edit/:id'>
          <Edit />
        </Route>

        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
