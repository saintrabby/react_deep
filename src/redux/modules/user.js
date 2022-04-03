import produce from "immer";
import React from "react";
import { createAction, handleActions } from "redux-actions";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const GET_USER = 'GET_USER'

const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const getUser = createAction(GET_USER, (user) => ({ user }))

const initialState = {
    user: null,
    is_login: false,
}


const loginAction = (user) => {
    return function (dispatch, getState, { history }) {
        console.log(history)
        dispatch(logIn(user))
        history.push('/')
    }
}


export default handleActions({
    [LOG_IN]: (state, action) => produce(state, (draft) => {
        setCookie('is_login', 'success')
        draft.user = action.payload.user
        draft.is_login = true
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        deleteCookie('is_login')
        draft.user = null
        draft.is_login = false
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => { }),

}, initialState)

const actionCreators = {
    logIn,
    logOut,
    getUser,
    loginAction,
}

export { actionCreators };