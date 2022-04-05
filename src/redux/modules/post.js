import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer'
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { firestore, storage } from "../../shared/firebase";
import { moment } from "moment";
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from "@firebase/storage";

import { actionCreators as imageActions } from "./image";

const SET_POST = 'SET_POST'
const ADD_POST = 'ADD_POST'

const setPost = createAction(SET_POST, (post_list) => ({ post_list }))
const addPost = createAction(ADD_POST, (post) => ({ post }))

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

const addPostFB = (contents = '') => {
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

        console.log(getState())

        const imgRef = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`)

        let snapshot = await uploadString(imgRef, _image, 'data_url')

        let downloadURL = await getDownloadURL(snapshot.ref)

        dispatch(imageActions.uploadImage(downloadURL))

        let new_post = { ...user_info, ..._post, img_url: downloadURL }

        addDoc(collection(firestore, 'post'), new_post).then((doc) => {
            let post = { user_info, ..._post, id: doc.id, img_url: downloadURL }

            dispatch(addPost(post))

            history.replace('/')

            dispatch(imageActions.setPreview(null))

        }).catch((err) => {
            console.log(err)
        })






        // const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
        // uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        //     console.log('Uploaded a data_url string!');
        // });
    }
}

const getPostFB = () => {
    return async function (dispatch, getState, { history }) {

        const postDB = await getDocs(collection(firestore, 'post'))

        console.log(postDB)

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

export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list
        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post)
        }),
    }, initialState
)

const actionCreators = {
    setPost,
    addPost,
    addPostFB,
    getPostFB,
}

export { actionCreators };