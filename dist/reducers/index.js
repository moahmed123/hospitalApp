import { combineReducers } from 'redux';
import DataSelected from './DataSelected';

const allReducers = combineReducers({
    Result : DataSelected
});

export default allReducers ;