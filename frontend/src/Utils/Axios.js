import axios from 'axios';
import qs from 'qs';
import { getToken } from './TokenUtils';
import {store} from "../component/AppProvider";
import * as actionTypes from "../redux/actionTypes";

class ajax {
    static get(url, params,headers, bearerToken) {
        params = params || {};
        return this.ajax('get', url, null, params,headers, bearerToken);
    }

    static post(url, data, params, headers, bearerToken) {
        return this.ajax('post', url, data, params, headers, bearerToken);
    }

    static ajax(method, url, data, params, reqHeaders, bearerToken) {
        params = params || {};
        let headers = reqHeaders ? reqHeaders : {};
        if (bearerToken) {
            headers.Authorization = 'Bearer '+getToken();
        }
        return axios({
            method: method,
            url: url,
            headers: {
                ...headers,
            },
            data: data,
            params: params,
            paramsSerializer: (params) => {
                return qs.stringify(params, {indices: false});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    // handle unauthorized status centrally, clear cookies and go to login page
                    console.log(`401 Authorization Error !`);
                    if (getToken().length > 0){
                        store.dispatch({
                            type: actionTypes.LOGOFF
                        });
                    }
                }

                // rethrow so callers can handle their errors
                throw error;
            } else if (error.message) {
                // handle errors that do not have a response
                // the scenario that uncovered the need for this was caused by an ad blocker when making an API call
                console.log(`Error: ${error.message}`);
            }
        });
    }
}

export default ajax;
