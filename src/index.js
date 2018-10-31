import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import { Provider } from 'react-redux'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/App';
import reducers from './reducers';
import ListCategories from './components/category/ListCategories';
import AddCategory from './components/category/AddCategory';
import EditCategory from './components/category/EditCategory';
import ListProductTypes from './components/productType/List';
import AddProductType from './components/productType/Add';
import EditProductType from './components/productType/Edit';


import AddShipList from './components/shipList/AddShipList';
import AddProduct from './components/product/AddProduct';
import ListaProducts from './components/product/ListaProducts';
import './index.css';

const store = createStore(reducers)

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App>
        {/* <Route path="/" component={App}> */}
          <Switch>
            <Route path="/category/new" component={AddCategory}/>
            <Route path="/category/:id" component={EditCategory}/>
            <Route path="/category" component={ListCategories}/>
            <Route path="/productType/new" component={AddProductType}/>
            <Route path="/productType/:id" component={EditProductType}/>
            <Route path="/productType" component={ListProductTypes}/>
            <Route path="/shipList/new" component={AddShipList}/>
            <Route path="/product/new" component={AddProduct}/>
            <Route path="/product" component={ListaProducts}/>
          </Switch>
        {/* </Route> */}
        </App>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
