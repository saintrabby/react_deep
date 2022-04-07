import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Image, Input, Text } from "../elements"
import Upload from "../shared/Upload";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {

    const is_login = useSelector((state) => state.user.is_login)
    const preview = useSelector((state) => state.image.preview)
    const post_list = useSelector((state) => state.post.list)

    const dispatch = useDispatch()

    const post_id = props.match.params.id
    const is_edit = post_id ? true : false
    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null
    const baseImg = 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd'
    const getPreview = preview ? preview : baseImg

    // console.log(preview)

    const { history } = props

    const [form, setForm] = useState('CENTER')

    const [contents, setContents] = React.useState(_post ? _post.contents : '')

    React.useEffect(() => {
        if (is_edit && !_post) {
            history.goBack()
        }

        if (is_edit) {
            // console.log(_post.img_url)
            dispatch(imageActions.setPreview(_post.img_url))
        }

        // return dispatch(imageActions.setPreview(baseImg))
    }, [])

    const ChangeContents = (e) => {
        setContents(e.target.value)
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, form))
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, { contents }, form))
    }

    const FormChange = (e) => {
        setForm(e.target.innerText)
    }

    if (!is_login) {
        return (
            <Grid margin='100px 0px' padding='16px' center>
                <Text size='32px' bold>앗 ! 잠깐 !</Text>
                <Text size='20px'>로그인 후에만 글을 쓸 수 있어요 !</Text>
                <Button _onClick={() => { history.replace('/login') }}>로그인 하러가기</Button>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid is_Wrap>
                <Grid padding='16px'>
                    <Text size='36px' bold>{is_edit ? '게시글 수정' : '게시글 작성'}</Text>
                    <Upload />
                </Grid>

                <Grid>
                    <Grid padding='16px'>
                        <Text margin='0px' size='24px' bold>미리보기</Text>
                    </Grid>
                    <Grid is_flex>
                        <Button margin='10px' _onClick={(e)=>{FormChange(e)}}>LEFT</Button>
                        <Button margin='10px' _onClick={(e)=>{FormChange(e)}}>CENTER</Button>
                        <Button margin='10px' _onClick={(e)=>{FormChange(e)}}>RIGHT</Button>
                    </Grid>

                </Grid>

                <Grid padding='10px' changeForm={form}>
                    <Image shape='rectangle' src={getPreview} />
                    <Input value={contents} multiLine label='게시글 내용' placeholder='게시글 작성' _onChange={(e) => ChangeContents(e)} />
                </Grid>

                <Grid padding='16px'>
                    {is_edit ? (
                        <Button text='게시글 수정' _onClick={() => editPost()}></Button>
                    ) : (
                        <Button text='게시글 작성' _onClick={() => addPost()}></Button>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PostWrite;