import React from "react";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Image, Text, Button } from '../elements/index'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { history } from '../redux/configStore'

const Post = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    // console.log(props)

    const delPost = () => {
        console.log('삭제를 해보자')
        // dispatch(postActions.delPostFB(props))
    }

    return (
        <React.Fragment>
            <Grid padding='16px'>
                <Grid is_flex>
                    <Image shape='circle' src={props.src}></Image>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>

                <Grid padding='16px'>
                    <Text>{props.contents}</Text>
                </Grid>

                <Grid><Image shape='rectangle' src={props.img_url}></Image></Grid>

                <Grid>
                    {props.is_me && <Button width='100px' _onClick={() => { history.push(`/write/${props.id}`) }}>수정</Button>}
                </Grid>

                <Grid is_flex padding='16px'>
                    <Text margin='0px' bold>{props.comment_cnt}</Text>
                    <Button width='100px' _onClick={delPost}>삭제</Button>
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
}

export default Post;