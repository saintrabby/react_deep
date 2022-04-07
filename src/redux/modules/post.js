import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { firestore, storage } from "../../shared/firebase";
import { moment } from "moment";
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from "@firebase/storage";

import { actionCreators as imageActions } from "./image";

const SET_POST = 'SET_POST'
const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const DEL_POST = 'DEL_POST'
const LIKE_POST = 'LIKE_POST'

const setPost = createAction(SET_POST, (post_list) => ({ post_list }))
const addPost = createAction(ADD_POST, (post) => ({ post }))
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }))
const delPost = createAction(DEL_POST, (post) => ({ post }))
const likePost = createAction(LIKE_POST, (post) => ({ post }))

const initialState = {
    list: [],
}

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: 'name',
    //     user_profile: 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd'
    // },
    img_url: 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd',
    contents: 'hi',
    comment_cnt: 0,
    insert_dt: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
}

const addPostFB = (contents = '', form) => {
    return async function (dispatch, getState, { history }) {

        // const postDB = await getDocs(collection(firestore, 'post'))

        const _user = getState().user.user

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.id,
            user_profile: _user.user_profile,
        }

        const _post = {
            ...initialPost,
            contents,
            insert_dt: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
        }

        const _image = getState().image.preview

        const imgRef = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`)

        let snapshot = await uploadString(imgRef, _image, 'data_url')

        let downloadURL = await getDownloadURL(snapshot.ref)

        dispatch(imageActions.uploadImage(downloadURL))

        let new_post = { ...user_info, ..._post, img_url: downloadURL, Form: form }

        addDoc(collection(firestore, 'post'), new_post).then((doc) => {
            let post = { user_info, ..._post, id: doc.id, img_url: downloadURL, Form: form }

            dispatch(addPost(post))

            history.replace('/')

            dispatch(imageActions.setPreview(null))

        }).catch((err) => {
            console.log(err)
        })


    }
}

const getPostFB = () => {
    return async function (dispatch, getState, { history }) {

        const postDB = await getDocs(collection(firestore, 'post'))

        // console.log(postDB)

        let post_list = []

        postDB.forEach((doc) => {

            let db_post = doc.data()

            // console.log(db_post)

            let new_post = Object.keys(db_post).reduce((acc, cur) => {
                if (cur.indexOf('user_') !== -1) {
                    return { ...acc, user_info: { ...acc.user_info, [cur]: db_post[cur] } }
                }
                return { ...acc, [cur]: db_post[cur] }
            }, { id: doc.id, user_info: {} })

            // let db_post = {
            //     id: doc.id,
            //     ...doc.data()
            // }

            // let new_post = {
            //     id: doc.id,
            //     user_info: {
            //         user_name: db_post.user_name,
            //         user_profile: db_post.user_profile,
            //     },
            //     img_url: db_post.image_url,
            //     contents: db_post.contents,
            //     comment_cnt: db_post.comment_cnt,
            //     insert_dt: db_post.insert_dt,
            // }

            // console.log(new_post)

            post_list.push(new_post)
        });

        // console.log(post_list)

        dispatch(setPost(post_list))
    }
}

const editPostFB = (post_id = null, post = {}, form) => {
    return async function (dispatch, getState, { history }) {

        if (!post_id) { return }

        const _image = getState().image.preview

        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id)
        const _post = getState().post.list[_post_idx]

        // const postDB = await getDocs(collection(firestore, 'post'))

        // console.log(post_id)
        // console.log({ ...post })

        // console.log(_image, _post.img_url)

        if (_image === _post.img_url) {
            const docRef = doc(firestore, 'post', post_id)

            // console.log(docRef)

            await updateDoc(docRef, { ...post, Form: form })

            dispatch(editPost(post_id, { ...post, Form: form }))

            history.replace('/')
        }
        else {
            const user_id = getState().user.user.uid

            const imgRef = ref(storage, `images/${user_id}_${new Date().getTime()}`)

            let snapshot = await uploadString(imgRef, _image, 'data_url')

            let downloadURL = await getDownloadURL(snapshot.ref)

            dispatch(imageActions.uploadImage(downloadURL))



            const docRef = doc(firestore, 'post', post_id)

            await updateDoc(docRef, { ...post, img_url: downloadURL, Form: form })

            dispatch(editPost(post_id, { ...post, img_url: downloadURL, Form: form }))

            history.replace('/')
        }

    }
}

const delPostFB = (in_post) => {
    return async function (dispatch, getState, { history }) {

        const docRef = doc(firestore, 'post', in_post.id)

        deleteDoc(docRef)

        // console.log(in_post.id);

        dispatch(delPost(in_post))
    }
}

const likePostFB = (in_post) => {
    return async function (dispatch, getState, { history }) {

        // const docRef = await doc(firestore, 'post', in_post.id)

        // console.log(in_post);

        // console.log(getState().user.id);

        // await updateDoc(docRef, { i_like: getState().user.id })

        // if (!in_post.i_like) {
        //     updateDoc(docRef, { comment_cnt: in_post.comment_cnt + 1 })
        // }
        // else {
        //     updateDoc(docRef, { comment_cnt: in_post.comment_cnt - 1 })
        // }

        // dispatch(likePost(in_post))
    }
}

export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            action.payload.post_list.sort((a, b) => (new Date(b.insert_dt).getTime() - new Date(a.insert_dt).getTime()))
            draft.list = action.payload.post_list
        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            // console.log(action.payload)
            draft.list.unshift(action.payload.post)
        }),
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            // console.log(action.payload)

            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id)

            draft.list[idx] = { ...draft.list[idx], ...action.payload.post }
        }),
        [LIKE_POST]: (state, action) => produce(state, (draft) => {
            let idx = state.list.findIndex((p) => p.id === action.payload.post.id)

            if (!action.payload.post.i_like)
                draft.list[idx] = { ...draft.list[idx], comment_cnt: action.payload.post.comment_cnt + 1 }
            else
                draft.list[idx] = { ...draft.list[idx], comment_cnt: action.payload.post.comment_cnt - 1 }

            draft.list[idx] = { ...draft.list[idx], i_like: !action.payload.post.i_like }

            // console.log(state, action, idx)
        }),
        [DEL_POST]: (state, action) => produce(state, (draft) => {
            draft.list = state.list.filter((v) => (v.id !== action.payload.post.id))
            // console.log(draft.list)
        }),
    }, initialState
)

const actionCreators = {
    setPost,
    addPost,
    delPost,
    likePost,
    addPostFB,
    getPostFB,
    editPostFB,
    delPostFB,
    likePostFB,
}

export { actionCreators };