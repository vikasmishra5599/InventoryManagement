import ajax from "../Axios";


export const getAllAuthUsersRest=()=>{
    const apiHeaders={
        "Content-type" :"application/json",
        "Accept" : "application/json;version=2",
    }
    return ajax.get('/ims/AuthUser', null, apiHeaders,true);
}

export const saveRegisterUserRest=(data)=>{
    const apiHeaders={
        "Content-type" :"application/json",
        "Accept" : "application/json;version=2",
    }
    return ajax.post('/ims/AuthUser',  data, null, apiHeaders,true);
}
