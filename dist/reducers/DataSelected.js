const DataSelected = (state = null, action) => {
    switch(action.type){
        case 'All_DATA':
        return action.dataType;
        break;
    }
    return state;
}
export default DataSelected;