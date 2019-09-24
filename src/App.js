import React, {useEffect} from 'react';
import './App.css';
import './css/style.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import Main from './components/Main';
import Search from './components/Search';
import Error404 from './components/Error404';
import Catalog from './components/Catalog';
import Contacts from './components/Contacts';
import Order from './components/Order.js';
import Cart from './components/Cart.js';
import {Switch, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getLocalStorageItems} from './actions/actionCreators';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getLocalStorageItems());       
  }, [dispatch, localStorage])
  
  return (
    <Router>           
        <Redirect to="/" />
        <Header/>
        <Container>
          <Switch>        
              <Route path="/contacts.html" component={Contacts} exact/>
              <Route path="/catalog.html" exact><Catalog><Search searchClass='catalog-search-form'/></Catalog></Route>
              <Route path="/about.html" component={About} exact/>
              <Route path="/products/:id.html" component={Order} exact/>
              <Route path="/cart.html" component={Cart} exact/>
              <Route path="/" component={Main} exact/>
              <Route path="*" component={Error404}/>
          </Switch>
        </Container>
        <Footer/>
    </Router>      
  );
}

export default App
