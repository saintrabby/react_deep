import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = () => {
    return (
        <React.Fragment>
            <Grid padding='16px'>
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </Grid>
        </React.Fragment>
    )
}

export default CommentList;

const CommentItem = (props) => {

    const { user_profile, user_name, user_id, post_id, insert_dt, contents } = props

    return (
        <Grid is_flex>
            <Grid is_flex width='auto'>
                <Image shape='circle' />
                <Text bold>{user_name}</Text>
            </Grid>
            
            <Grid is_flex>
                <Text margin='0px 50px'>{contents}</Text>
                <Text>{insert_dt}</Text>
            </Grid>
        </Grid>
    )
}


CommentItem.defaultProps = {
    user_profile: '',
    user_name: 'ego',
    user_id: '',
    post_id: 1,
    contents: 'what',
    insert_dt: '2021-01-01 19:00:00',
}