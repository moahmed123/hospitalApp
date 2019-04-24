const NameOfPage = (state = null, action) => {
    switch(action.type){
        case 'NAME_PAGE':
        return action.name;
        break;
    }
    return state;
}
export default NameOfPage;