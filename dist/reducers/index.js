import { combineReducers } from 'redux';
import DataSelected from './DataSelected';
import NameOfPage from './NameOfPage'
// GoogleHospital
import GoogleHospital from './GoogleHospital';
// GoogleRestautant
import GoogleRestautant from './GoogleRestautant';
// Hospital Data Result ById (such as)
import DetailsDataHospital from './DetailsDataHospital';
// GoogleAtm
import GoogleAtm from './GoogleAtm';

const allReducers = combineReducers({
    Result          : DataSelected,
    PageName        : NameOfPage,
    Restautant      : GoogleRestautant,
    Hospital        : GoogleHospital,
    Atm             : GoogleAtm,
    DetailsHospital : DetailsDataHospital
});

export default allReducers ;