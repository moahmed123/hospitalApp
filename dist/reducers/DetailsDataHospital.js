const DetailsDataHospital = (state = null, action) => {
    switch(action.type){
        case 'SHOW_DATA_HOSPITAL':
        return action.HospitalData;
        break;
    }
    return state;
}
export default DetailsDataHospital;