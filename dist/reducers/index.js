import { combineReducers } from 'redux';
import DataSelected from './DataSelected';
import NameOfPage from './NameOfPage'
// GoogleHospital
import GoogleHospital from './GoogleHospital';
// GoogleRestautant
import GoogleRestautant from './GoogleRestautant';
// Hospital Data Result ById 
import DetailsDataHospital from './DetailsDataHospital'

const allReducers = combineReducers({
    Result          : DataSelected,
    PageName        : NameOfPage,
    Restautant      : GoogleRestautant,
    Hospital        : GoogleHospital,
    DetailsHospital : DetailsDataHospital
});

export default allReducers ;