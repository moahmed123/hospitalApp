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
export function GeoLocation(categories, distance,limit,minlimit,name,city){
    return(dispatch)=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {                      
              const latitude  = position.coords.latitude,
                    longitude = position.coords.longitude;                    
                // Function In Action Axios To Git Data Filter 
                dispatch(
                    GetHospitalData(
                        name,
                        city,
                        categories,
                        limit,
                        minlimit,
                        longitude,
                        latitude,
                        distance,
                        true
                    )
                );
            },
            (error) => {alert(error.message)}                    
        )
    }   
}