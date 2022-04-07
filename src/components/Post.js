import React from "react";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Image, Text, Button } from '../elements/index'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { history } from '../redux/configStore'

const Post = (props) => {

    const post_list = useSelector((state) => state.post.list)

    const dispatch = useDispatch()
    const history = useHistory()

    // console.log(props)
    // console.log(post_list)

    const delPost = () => {
        dispatch(postActions.delPostFB(props))
    }

    const likeChange = () => {
        console.log('좋아요 ?')
        dispatch(postActions.likePostFB(props))
    }

    if (post_list.length === 0) {
        history.replace(`/post/${props.param.id}`)
    }



    return (
        <React.Fragment>
            <Grid padding='16px'>
                <Grid is_flex is_Wrap>
                    <Image shape='circle' src={props.src}></Image>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>

                <Grid form={props.Form} _onClick={props._onClick} is_Wrap>
                    <Text>{props.param ? (post_list.filter((v) => props.param.id === v.id)[0].contents) : props.contents}</Text>
                    <Grid><Image shape='rectangle' src={props.param ? (post_list.filter((v) => props.param.id === v.id)[0].img_url) : props.img_url}></Image></Grid>
                </Grid>

                <Grid is_flex>
                    {props.is_me && <Button width='100px' _onClick={() => { history.push(`/write/${props.id}`) }}>수정</Button>}
                    {props.is_me && <Button width='100px' _onClick={delPost}>삭제</Button>}
                </Grid>

                <Grid is_flex padding='16px' is_Wrap>
                    {props.param && <Button width='80px' _onClick={() => history.goBack()}>뒤로</Button>}
                    <Grid></Grid>
                    <Text margin='10px' bold>{props.comment_cnt}</Text>
                    {props.is_login && <Button width='60px' _onClick={likeChange}>♥</Button>}
                </Grid>

            </Grid>
        </React.Fragment>
    )
}

Post.defaultProps = {
    user_info: {
        user_name: 'name',
        user_profile: 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd'
    },
    img_url: 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd',
    contents: 'hi',
    comment_cnt: 10,
    insert_dt: '2022-04-01 10:00:00',
    is_me: false,
    is_login: false,
}

export default Post;