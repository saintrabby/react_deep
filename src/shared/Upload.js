import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements";
import { storage } from "./firebase";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = () => {

    const fileInput = React.useRef();
    const dispatch = useDispatch()
    const is_uploading = useSelector(state => state.image.uploaing)

    const selecFile = (e) => {
        // console.log(e);

        const reader = new FileReader()
        const file = fileInput.current.files[0]

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            // console.log(reader.result)
            dispatch(imageActions.setPreview(reader.result))
        }
    }

    // const uploadFB = () => {
    //     let image = fileInput.current.files[0]

    //     console.log(image)

    //     dispatch(imageActions.uploadImageFB(image))
    // }

    return (
        <React.Fragment>
            <input ref={fileInput} type='file' onChange={selecFile} disabled={is_uploading} />
            {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
        </React.Fragment>
    )
}

export default Upload;