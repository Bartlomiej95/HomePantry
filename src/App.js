import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import MainTemplate from './templates/MainTemplate';
import HomePantry from './views/HomePantry';
import ShoppingList from './views/ShoppingList';
import Settings from './views/Settings';
import CategoryPage from './views/CategoryPage';

function App() {
  return (
    <Provider store={store}>
      <MainTemplate>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/homepantry" />} />
            <Route exact path="/homepantry" component={HomePantry} />
            <Route exact path="/homepantry/drinks" component={CategoryPage} />
            <Route exact path="/homepantry/groceries" component={CategoryPage} />
            <Route exact path="/homepantry/breads" component={CategoryPage} />
            <Route exact path="/homepantry/cosmetics" component={CategoryPage} />
            <Route exact path="/homepantry/fruits" component={CategoryPage} />
            <Route exact path="/homepantry/animals" component={CategoryPage} />
            <Route exact path="/shoppinglist" component={ShoppingList} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </BrowserRouter>
      </MainTemplate>
    </Provider>
  );
}

export default App;
