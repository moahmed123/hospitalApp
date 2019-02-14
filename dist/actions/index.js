import axios from 'axios';

export function NumberOpenedPage(){
    return(dispatch) => {        
        const urlAllData = "https://apihospital00.herokuapp.com/api/hotel?name=all&city=all&cat=all&admin=admin&limit=20&active=true";
        return axios.get(urlAllData)
        .then((response) => {                        
            dispatch(ActionDataFilter(response.data));
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }    
}
export function ActionDataFilter(result){
    return{
        type: 'All_DATA_QURAN',
        dataType: result
    }
}