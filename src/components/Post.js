import React from "react";

// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

import { Grid, Image, Text } from '../elements/index'

const Post = (props) => {

    console.log(props)

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

                <Grid><Image shape='rectangle' src={props.src}></Image></Grid>

                <Grid padding='16px'>
                    <Text bold>{props.comment_cnt}</Text>
                </Grid>

            </Grid>
        </React.Fragment>
    )
}

Post.defaultProps = {
    user_info: {
        user_name: 'name',
        user_profile: 'imgurl'
    },
    img_url: 'imgurl2',
    contents: 'hi',
    comment_cnt: 10,
    insert_dt: '2022-04-01 10:00:00'
}

export default Post;