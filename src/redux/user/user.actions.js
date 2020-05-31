import UserActionTypes from './user.types';
import axios from '../../axios-client';

export const fetchPocsStart = () => ({
    type: UserActionTypes.FETCH_POCS_START
});

export const fetchPocsSuccess = (users) => {
    const trimmedUsers = users.map(user => {
        return {
            id: user._id,
            userID: user.ID,
            name: user.name,
            phone: user.phone,
            delivery: user.delivery,
            longitude: Number.parseFloat(user.longitude),
            latitude: Number.parseFloat(user.latitude),
            payment: {...user.payment},
            product: [...user.product]
        }
    });
    return {
        type: UserActionTypes.FETCH_POCS_SUCCESS,
        payload: trimmedUsers
    }
};

export const fetchPocsFailure = (error) => ({
    type: UserActionTypes.FETCH_POCS_FAILURE,
    payload: error
});

export const fetchPocs = () => {
    return async dispatch => {
        dispatch(fetchPocsStart());
        try {
            const response = await axios.get('/Poc');
            const data = response.data;
            dispatch(fetchPocsSuccess(data));
        } catch (error) {
            dispatch(fetchPocsFailure(error));
        }
    }
}
