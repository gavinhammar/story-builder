import axios from 'axios';
const apiPath = "https://api.sendible.com";

class SendibleAPI {
    
    static getProfile(parameters, onSuccess, onError) {
       var apiCall = apiPath + "/api/v2/profile.json?username=" + parameters.username + "&api_key=" + parameters.password;

       axios.get(apiCall) 
        .then(res => {
            onSuccess(res);
        })
        .catch((error) => {
            onError(error);
        });

    }
}

export default SendibleAPI;