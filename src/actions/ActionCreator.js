
const addLoginUser = users => {
    return {
        type: "LOGIN_USER",
        users: users
    }
}

const removeLoginuser = users => {
    return {
        type: "REMOVE_LOGIN_USER",
        users: users
    }
}

const addFollowingUser = following => {
    return {
        type: "FOLLOWIN_ADD",
        following: following
    }
}

const removeFollowinguser = following => {
    return {
        type: "FOLLOWIN_REMOVE",
        following: following
    }
}

const requestAddFollowinguser = follow => {
    return {
        type: "FOLLOWIN_REQUEST_ADD",
        follow: follow
    }
}

const requestRemoveFollowinguser = follow => {
    return {
        type: "FOLLOWIN_REQUEST_REMOVE",
        following: follow
    }
}

const AddMessagegUser = message => {
    return {
        type: "MESSAGE_ADD",
        message: message
    }
}

const removeMessageUser = message => {
    return {
        type: "MESSAGE_REMOVE",
        message: message
    }
}

export { 
         addLoginUser, 
         removeLoginuser, 
         addFollowingUser, 
         removeFollowinguser,
         requestAddFollowinguser,
         requestRemoveFollowinguser,
         AddMessagegUser,
         removeMessageUser
        };