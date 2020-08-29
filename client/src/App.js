import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions'
import store from './store'


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  // eslint-disable-next-line
  }, []);


  return (
    <div className="App">
      <AppNavbar />
      
      <Container>
        <ItemModal />
      </Container>

      <ShoppingList />
    </div>
  );
}

export default App;
