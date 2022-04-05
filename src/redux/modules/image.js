import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

const UPLOADING = 'UPLOADING'
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
const SET_PREVIEW = 'SET_PREVIEW'

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }))
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }))
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }))

const initialState = {
    image_url: '',
    uploading: false,
    preview: null,
}

const uploadImageFB = (image) => {
    return async function (dispatch, getState, { history }) {

        dispatch(uploading(true))

        const imgref = ref(storage, `images/${image.name}`)

        console.log(imgref)

        await uploadBytesResumable(imgref, image)

        console.log(image)

        let downloadURL = await getDownloadURL(imgref)
        
        dispatch(uploadImage(downloadURL))

        console.log('File available at', downloadURL);
        
        // dispatch(uploading(false))
    }
}

export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
        draft.image_url = action.payload.image_url
        draft.uploading = false
    }),
    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading
    }),
    [SET_PREVIEW]: (state, action) => produce(state, (draft)=>{
        draft.preview = action.payload.preview
    })
}, initialState)

const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
}

export { actionCreators }