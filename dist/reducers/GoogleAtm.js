const GoogleAtm = (state = null, action) => {
    switch(action.type){
        case 'Google_ATM':
        return action.ATMData;
        break;
    }
    return state;
}
export default GoogleAtm;