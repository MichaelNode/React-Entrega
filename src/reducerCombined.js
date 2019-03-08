import { combineReducers } from 'redux';
import reducerUser from './reducers/reducerUser';
import reducerFollowing from './reducers/reducerFollow'
import reducerMessage from './reducers/reducerMessage'

export default combineReducers({
    users: reducerUser,
    following: reducerFollowing,
    message: reducerMessage
})