import React from 'react';
import axios from "axios";
import AppLoader from '../../AppLoader';
import ToastUtil from '../../../utilities/ToastUtil';
const KEY = process.env.REACT_APP_PUBG_KEY;

function ApiBase() {
    const [showLoader, done] = ToastUtil()

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

    const handleHttpRequestError = (error) => {
        console.log(error);
    }

    return [
        httpGet
    ]
}

export default ApiBase
