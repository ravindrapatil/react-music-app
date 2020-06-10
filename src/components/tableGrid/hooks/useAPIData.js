import { useEffect, useState } from 'react';
import services from './services';

function useAPIData() {
    const { footballPlayersStatics } = services();
    const [state, setstate] = useState({
        data: []
    });
    const { data } = state;

    useEffect(() => {
        getFootballPlayerInfo();
    }, [])

    const getFootballPlayerInfo = async () => {
        try {
            const apiData = await footballPlayersStatics({});
            if (apiData) {
                setstate({
                    ...state,
                    data: apiData.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {data}
}

export default useAPIData
