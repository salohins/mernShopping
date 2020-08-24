import React from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
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
