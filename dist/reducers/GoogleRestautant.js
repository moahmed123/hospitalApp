const GoogleRestautant = (state = null, action) => {
    switch(action.type){
        case 'Google _Restaurant': 
        return action.restaurantData;
        break;
    }
    return state;
}
export default GoogleRestautant;