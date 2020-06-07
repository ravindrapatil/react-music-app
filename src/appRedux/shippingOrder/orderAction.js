import { PROMO_CODE } from './orderTypes';

export const handleChange = (e) => {
    return {
        type: PROMO_CODE,
        payload: e.target.value
    }
}