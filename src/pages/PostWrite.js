import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Image, Input, Text } from "../elements"
import Upload from "../shared/Upload";
import { actionCreators as postActions } from "../redux/modules/post";

const PostWrite = (props) => {

    const is_login = useSelector((state) => state.user.is_login)
    const preview = useSelector((state) => state.image.preview)

    const dispatch = useDispatch()

    const { history } = props

    const [contents, setContents] = React.useState('')

    const ChangeContents = (e) => {
        setContents(e.target.value)
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents))
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
            <Grid padding='16px'>
                <Text size='36px' bold>게시글 작성</Text>
                <Upload />
            </Grid>

            <Grid>
                <Grid padding='16px'>
                    <Text margin='0px' size='24px' bold>미리보기</Text>
                </Grid>

                <Image shape='rectangle' src={preview ? preview : 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd'} />
            </Grid>

            <Grid padding='16px'>
                <Input multiLine label='게시글 내용' placeholder='게시글 작성' _onChange={(e) => ChangeContents(e)} />
            </Grid>

            <Grid padding='16px'>
                <Button text='게시글 작성' _onClick={() => addPost()}></Button>
            </Grid>
        </React.Fragment>
    )
}

export default PostWrite;