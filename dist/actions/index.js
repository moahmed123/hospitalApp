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

// GeoLocation: It's Function To Search For Hopital 
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
/**
 *^ Api For Resturants : https://maps.googleapis.com/maps/api/place/nearbysearch/json?
    location=-33.8670522,151.1957362
    &radius=1500
    &type=restaurant
    &keyword=cruise
    &key=AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U 
    https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=4500&type=restaurant&key=AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U
 **/
export function GetResturantsGoogle( location, radius, type, key){
    return (dispatch) =>{
        const urlAllData = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        return axios.get(urlAllData,{
            params: {
                location : location,
                radius   : radius,
                type     : type,                
                key      : key
            }
        })
        .then((response) => {

            if(type == 'hospital'){
                // Send Fun Hospital Data 
                dispatch(ActionGoogleHospital(response.data));
            }else if (type == 'restaurant'){
                // Send Fun Restautrant Data 
                dispatch(ActionGoogleRestautant(response.data));
                console.log(response.data)
            }
            
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function ActionDataFilter(result){
    return{
        type: 'All_DATA',
        dataType: result
    }
}
// Google Hospital 
export function ActionGoogleHospital(Hopital){
    return{
        type: 'Google_Hopital',
        Hospitaldata: Hopital
    }
}
export function ActionGoogleRestautant(Restaurant){
    return{
        type: 'Google _Restaurant',
        restaurantData: Restaurant
    }
}
// check Page To Use To Change Result For Hospital Google Or Resturants Google
export function CheckPage(PageToUse){
  return (dispatch) => {
        dispatch(NameOfPage(PageToUse));
  }
}
export function NameOfPage(PageName){
    return{
        type: 'NAME_PAGE',
        name: PageName
    }
}