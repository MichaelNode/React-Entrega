

export default function reducerUser (state= { users: [] } , action) {
    if(action.type === "LOGIN_USER") {
        return {
            ...state,
            users:  state.users.concat(action.users) 
        }
    } else if (action.type === "REMOVE_LOGIN_USER") {
        return {
            ...state,
            users: state.users.filter(user => user.email !== action.users.users[0].email)       
        }
    } else {
        return state 
    }
}