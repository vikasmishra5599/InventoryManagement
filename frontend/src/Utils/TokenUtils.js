export const TOKEN = 'BearerToken';

function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function getToken() {
    return getCookie(TOKEN);
}

export function saveToken(token) {
    if (token) {
        let date = new Date();
        date.setTime(date.getTime() + 180000);
        document.cookie = `${TOKEN}=${token}; expires=${date.toUTCString()};path=/`;
    }
    return true;
}

export function deleteToken(){
    console.log(`delete token!! function`);
    document.cookie = `${TOKEN}="";Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

export function getAuthHeader(header){
    return{
        ...header,
        Authorization : 'Bearer '+getToken()
    }
}
