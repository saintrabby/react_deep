import React from "react"
import { useDispatch, useSelector } from "react-redux";

import Post from "../components/Post";
import { Button, Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";

const PostList = (props) => {

    const post_list = useSelector((state) => state.post.list)
    const user_info = useSelector((state) => state)

    const { history } = props
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (post_list.length === 0) {
            dispatch(postActions.getPostFB())
        }
    }, [])

    return (
        <React.Fragment>
            <Grid is_Wrap>
                {post_list.map((p, idx) => {
                    // console.log(p, user_info)
                    if (user_info.user.is_login) {
                        if (p.user_info.user_id === user_info?.user.user.id)
                            return (<Grid key={p.id}>
                                <Post {...p} _onClick={() => { history.push(`/post/${p.id}`) }} is_me is_login />
                            </Grid>)
                        else
                            return (<Grid key={p.id}>
                                <Post {...p} is_login _onClick={() => { history.push(`/post/${p.id}`) }} />
                            </Grid>)
                    }
                    else
                        return (<Grid key={p.id}>
                            <Post key={p.id} _onClick={() => { history.push(`/post/${p.id}`) }} {...p} />
                        </Grid>)
                })}
            </Grid>
            <Permit>
                <Button is_float text='+' _onClick={() => { history.push('/write') }}></Button>
            </Permit>
        </React.Fragment>
    )
}

export default PostList;