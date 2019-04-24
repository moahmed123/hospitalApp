const GoogleHospital = (state = null, action) => {
    switch(action.type){
        case 'Google_Hopital':
        return action.Hospitaldata;
        break;
    }
    return state;
}
export default GoogleHospital;