import ajax from "../Axios";

export const getAuthUserDetail=()=>{

    return ajax.get('ims/AuthUser/getAuthUserDetails', null, null,true);
}
