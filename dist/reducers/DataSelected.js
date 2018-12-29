const DataSelected = (state = null, action) => {
    switch(action.type){
        case 'All_DATA_QURAN':
        return action.dataType;
        break;
    }
    return state;
}
export default DataSelected;