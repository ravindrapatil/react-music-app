import ApiBase from '../../pubGStats/services/ApiBase';
import API_END_POINTS from '../../pubGStats/services/ApiConstants';
import ToastUtil from '../../../utilities/ToastUtil';

function services() {
    const { httpGetForFootball, http, httpPUT, httpPOST, httpDELETE } = ApiBase();
    const { done } = ToastUtil();

    const footballPlayersStatics = async ({ callBackOptions = {} }) => {
        const { onStart, onComplete, onError } = callBackOptions;
        try {
            onStart && onStart();

            const {
                FOOTBALL_PLAYERS_STATISTICS: { httpMethod, endPointUrl }
            } = API_END_POINTS;

            const playersData = httpGetForFootball({
                httpMethod: httpMethod,
                url: endPointUrl
            }).catch(handleHttpRequestError);

            done();
            onComplete && onComplete(playersData);
            return playersData;
        } catch (error) {
            onError && onError();
            done();
        }
    }

    const employeeDataFromApi = async ({ callBackOptions = {} }) => {
        const { onStart, onComplete, onError } = callBackOptions;
        try {
            onStart && onStart();

            const {
                USERS_DATA_GET: { httpMethod, endPointUrl }
            } = API_END_POINTS;

            const employeeData = http({ 
                httpMethod: httpMethod, 
                url: endPointUrl 
            }).catch(handleHttpRequestError);

            onComplete && onComplete(employeeData);
            return employeeData;
        } catch (error) {
            onError && onError();
        }
    }

    const updateUser = async ({ requestParams, callBackOptions = {} }) => {
        const { onStart, onComplete, onError } = callBackOptions;
        try {
            onStart && onStart();

            const {
                USERS_DATA_UPDATE: { httpMethod, endPointUrl }
            } = API_END_POINTS;

            const response = httpPUT({ 
                httpMethod: httpMethod, 
                url: endPointUrl,
                requestParams: requestParams 
            }).catch(handleHttpRequestError);

            onComplete && onComplete(response);
            return response;
        } catch (error) {
            onError && onError();
        }
    }

    const addNewUser = async ({ requestParams, callBackOptions = {} }) => {
        const { onStart, onComplete, onError } = callBackOptions;
        try {
            onStart && onStart();

            const {
                NEW_USER_DATA_POST: { httpMethod, endPointUrl }
            } = API_END_POINTS;

            const result = httpPOST({ 
                httpMethod: httpMethod, 
                url: endPointUrl,
                requestParams: requestParams 
            }).catch(handleHttpRequestError);

            onComplete && onComplete(result);
            return result;
        } catch (error) {
            onError && onError();
        }
    }

    const deleteUser = async ({ requestParams, callBackOptions = {} }) => {
        const { onStart, onComplete, onError } = callBackOptions;
        try {
            onStart && onStart();

            const {
                DELETE_USER_DATA: { httpMethod, endPointUrl }
            } = API_END_POINTS;

            const result = httpDELETE({ 
                httpMethod: httpMethod, 
                url: `${endPointUrl}${requestParams.id}`
            }).catch(handleHttpRequestError);

            onComplete && onComplete(result);
            return result;
        } catch (error) {
            onError && onError();
        }
    }

    const handleHttpRequestError = (error) => {
        console.log(error);
    }

    return (
        { footballPlayersStatics, employeeDataFromApi, updateUser, addNewUser, deleteUser }
    )
}

export default services
