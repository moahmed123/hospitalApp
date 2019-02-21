import axios from 'axios';

export function GetHospitalData(name,city,cat,limit,minlimit,longitude,latitude,dis,active){
    return(dispatch) => {        
        const urlAllData = "https://apihospital00.herokuapp.com/api/hotel";
        return axios.get(urlAllData,{
            params: {
                name     : name,
                city     : city,
                cat      : cat,
                limit    : limit,
                minlimit : minlimit,
                lng      : longitude,
                lat      : latitude,
                dis      : dis,
                active   : active
            }
        })
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
// export function TogglePopups(action){
//     console.log(action);
// }