import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//import promise from 'redux-promise';
import reducers from './dist/reducers';
import Main from './dist/components/Main';

import {View} from 'react-native';

const store = createStore(reducers, {}, compose(applyMiddleware( thunk )));

//type Props = {};
//<Props>
export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <View>             
          <Main/>
        </View>
      </Provider>
    );
  }
}
