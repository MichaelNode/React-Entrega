
export default function reducerFollowing (state= { following: [] } , action) {
    if(action.type === "FOLLOWIN_ADD") {
        return {
            ...state,
            following:  state.following.concat(action.following) 
        }
    } else if (action.type === "FOLLOWIN_REMOVE") {
        return {
            ...state,
            following: state.following.filter(user => user.email !== action.follow.following[0].email)       
        }
    } else if (action.type === "FOLLOWIN_REQUEST_ADD") {
        return {
            ...state,
            following: state.following.map((item, index) => {
                if(item.user === action.follow.email && item.email === action.follow.user ) {
                    return {
                        ...item,  
                        friend: 'accepted'  
                    }
                }
                return item;
            })  
        }
    } else {
        return state
    }
}