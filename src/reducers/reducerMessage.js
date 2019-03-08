export default function reducerMessage (state= { message: [] } , action) {
    if(action.type === "MESSAGE_ADD") {
        return {
            ...state,
            message:  state.message.concat(action.message) 
        }
    } else {
        return state
    }
}