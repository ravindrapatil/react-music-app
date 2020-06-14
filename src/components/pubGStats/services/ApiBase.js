import React from 'react';
import axios from "axios";
import AppLoader from '../../AppLoader';
import ToastUtil from '../../../utilities/ToastUtil';
// const KEY = process.env.REACT_APP_PUBG_KEY;
const KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjMDlkYzQxMC04MmUzLTAxMzgtMmYyMS00ZDk1MjEyYTg1YmEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTkwNjUxMzM5LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InJhdmluZHJhLXNwYXRpIn0.yCY2YJDLWLt4t2Cr3OOE3TuLdTR_LmDC1RV1oBaDZvc'
const gorestKEY = 'x-2fQT4nack4hcpqUiDcP3DFWOIGrc6mdqjb'

function ApiBase() {
    const { showLoader, done } = ToastUtil()

    const onProgress = () => {
        showLoader(<AppLoader />, {});
    }

    const onCloseToast = () => {
        done('AppLoader')
    }

    const httpGet = (params) => {
        const { httpMethod, url, requestParams, data } = params;
        const headers = {
            'Authorization': 'Bearer ' + KEY,
            'Accept': 'application/vnd.api+json'
        };
        onProgress();
        return axios({
            method: httpMethod,
            url: `${url}${data}`,
            requestParams,
            headers,
            onDownloadProgress: progressEvent => {
                setTimeout(() => {
                    onCloseToast();
                }, 400);
            }
        }).catch(handleHttpRequestError)
    }

    const httpGetForFootball = (params) => {
        const { httpMethod, url } = params;
        const headers = {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "a3cIgOEFf9mshzRAkVlcEM6Jxd0lp1GaOIDjsnmWyrk9CDJ229"
        };
        onProgress();
        return axios({
            method: httpMethod,
            url: url,
            headers,
            onDownloadProgress: progressEvent => {
                setTimeout(() => {
                    onCloseToast();
                }, 400);
            }
        }).catch(handleHttpRequestError)
    }

    const http = (params) => {
        const { httpMethod, url } = params;
        const headers = {
            'Authorization': 'Bearer ' + gorestKEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        onProgress();
        return axios({
            method: httpMethod,
            url: url,
            headers: headers,
            onDownloadProgress: progressEvent => {
                setTimeout(() => {
                    onCloseToast();
                }, 400)
            }
        }).catch(handleHttpRequestError)
    }

    const httpPUT = (params) => {
        const { httpMethod, url, requestParams } = params;
        const headers = {
            'Authorization': 'Bearer ' + gorestKEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        onProgress();
        return axios({
            method: httpMethod,
            url: `${url}${requestParams.id}`,
            headers: headers,
            data: requestParams,
            onDownloadProgress: progressEvent => {
                setTimeout(() => {
                    onCloseToast();
                }, 400)
            }
        }).catch(handleHttpRequestError)
    }

    const httpPOST = (params) => {
        const { httpMethod, url, requestParams } = params;
        const headers = {
            'Authorization': 'Bearer ' + gorestKEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        onProgress();
        return axios({
            method: httpMethod,
            url: url,
            headers: headers,
            data: requestParams,
            onDownloadProgress: progressEvent => {
                setTimeout(() => {
                    onCloseToast();
                }, 400)
            }
        }).catch(handleHttpRequestError)
    }

    const httpDELETE = (params) => {
        const { httpMethod, url } = params;
        const headers = {
            'Authorization': 'Bearer ' + gorestKEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        onProgress();
        return axios({
            method: httpMethod,
            url: url,
            headers: headers,
            onDownloadProgress: progressEvent => {
                setTimeout(() => {
                    onCloseToast();
                }, 400)
            }
        }).catch(handleHttpRequestError)
    }

    const handleHttpRequestError = (error) => {
        console.log(error);
    }

    return {
        httpGet, httpGetForFootball, http, httpPUT, httpPOST, httpDELETE
    }
}

export default ApiBase
