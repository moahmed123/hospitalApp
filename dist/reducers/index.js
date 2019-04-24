import { combineReducers } from 'redux';
import DataSelected from './DataSelected';
import NameOfPage from './NameOfPage'
// GoogleHospital
import GoogleHospital from './GoogleHospital';
// GoogleRestautant
import GoogleRestautant from './GoogleRestautant';

const allReducers = combineReducers({
    Result     : DataSelected,
    PageName   : NameOfPage,
    Restautant : GoogleRestautant,
    Hospital   : GoogleHospital
});

export default allReducers ;