import ApiBase from './ApiBase';
import API_END_POINTS from './ApiConstants';
import ToastUtil from '../../../utilities/ToastUtil';

function EmployeeService() {
    const [httpGet] = ApiBase();
    const [done] = ToastUtil();

    const playerStatistics = async ({ request, callBackOptions = {} }) => {
        const { onStart, onComplete, onError } = callBackOptions;

        try {
            onStart && onStart();

            const {
                SYSTEM_USER_INFO: { httpMethod, endPointUrl }
            } = API_END_POINTS;

            const questionsList = httpGet({
                httpMethod: httpMethod,
                url: `${endPointUrl}`,
                data: request.query,
                requestParams: request
            }).catch(handleHttpRequestError);
            done();

            onComplete && onComplete(questionsList);
            return questionsList;
        } catch (error) {
            done();
            onError && onError();
        }
    }

    const playerGameModeStatistics = async ({ request, callBackOptions = {} }) => {
        const { onStart, onComplete, onError } = callBackOptions;

        try {
            onStart && onStart();

            const {
                PLAYER_GAMEMODE_STATESTICS: { httpMethod, endPointUrl }
            } = API_END_POINTS;

            const playerGameModeData = httpGet({
                httpMethod: httpMethod,
                url: `${endPointUrl}`,
                data: request.mode,
                requestParams: request
            }).catch(handleHttpRequestError);

            done();

            onComplete && onComplete(playerGameModeData);
            return playerGameModeData;
        } catch (error) {
            done();
            onError && onError();
        }
    }


    const handleHttpRequestError = (error) => {
        console.log(error);
    }

    return [playerStatistics, playerGameModeStatistics]
}

export default EmployeeService
