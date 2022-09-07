import ajax from "../Axios";


export const getUsers=()=>{

    const apiHeaders={
        "Content-type" :"application/json",
        "Accept" : "application/json;version=2",
    }
    return ajax.get('/ims/AuthUser', null, apiHeaders,true);
}
