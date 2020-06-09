import ApiBase from '../../pubGStats/services/ApiBase';
import API_END_POINTS from '../../pubGStats/services/ApiConstants';
import ToastUtil from '../../../utilities/ToastUtil';

function services() {
    const { httpGetForFootball } = ApiBase();
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

    const handleHttpRequestError = (error) => {
        console.log(error);
    }

    return (
        { footballPlayersStatics }
    )
}

export default services
