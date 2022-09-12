import ajax from '../Axios';


export const login = (username, password) => {
    const data = {
        username: username,
        password: password,
    };

    return ajax.post('/ims/auth/token', data, null,false);
};

export const saveResetPassword = (payload)=>{
    const data = payload;
    return ajax.post('/ims/unsecure/saveresetpassword',data, null,false);
}

export const forgotPassword = (payload)=>{
    const data = payload;
    return ajax.post('/ims/unsecure/forgotpassword',data, null,false);
}


