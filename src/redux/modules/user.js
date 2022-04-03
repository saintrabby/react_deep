import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, updateProfile } from "@firebase/auth";
import produce from "immer";
import React from "react";
import { createAction, handleActions } from "redux-actions";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";

// const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'

// const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const getUser = createAction(GET_USER, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))

const initialState = {
    user: null,
    is_login: false,
}

const user_initial = {
    user_name: 'ego'
}

// const loginAction = (user) => {
//     return function (dispatch, getState, { history }) {
//         console.log(history)
//         dispatch(setUser(user))
//         history.push('/')
//     }
// }

const loginFB = (id, pw) => {
    return function (dispatch, getState, { history }) {

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.

                // return signInWithEmailAndPassword(auth, id, pw);


                signInWithEmailAndPassword(auth, id, pw)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        // ...
                        console.log(user)
                        dispatch(setUser({ user_name: user.displayName, id, user_profile: '', uid: user.uid }))

                        history.push('/');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        console.log(errorCode, '-----', errorMessage)
                    });

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, '-----', errorMessage)
            });



    }
}

const signupFB = (id, pw, name) => {
    return function (dispatch, getState, { history }) {
        // const auth = getAuth();

        createUserWithEmailAndPassword(auth, id, pw)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user)

                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    dispatch(setUser({ name, id, user_profile: '' }))
                    history.push('/')
                }).catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
            });
    }
}

const loginCheckFB = () => {
    return function (dispatch, getState, { history }) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUser({
                    user_name: user.displayName,
                    user_profile: '',
                    id: user.email,
                    uid: user.uid,
                }))
            }
            else {
                dispatch(logOut())
            }
        })
    }
}

const logoutFB = () => {
    return function (dispatch, getState, { history }) {
        auth.signOut().then(() => {
            dispatch(logOut());
            history.replace('/')
        })
    }
}


export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
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
    // logIn,
    logOut,
    getUser,
    // loginAction,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
}

export { actionCreators };