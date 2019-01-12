import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './dist/reducers';
import Navigator from './dist/components/Navigator';

const store = createStore(reducers, {}, compose(applyMiddleware( thunk )));
//type Props = {};
//<Props>
export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>                    
          <Navigator/>        
      </Provider>
    );
  }
}