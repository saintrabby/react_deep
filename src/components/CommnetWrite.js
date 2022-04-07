import React from "react";
import { Button, Grid, Input } from "../elements";

const CommentWrite = (props) => {



    return (
        <React.Fragment>
            <Grid padding='16px' is_flex is_Wrap>
                <Input placeholder='댓글 내용을 입력해주세요'></Input>
                <Button width='80px' margin='0px 10px'>작성</Button>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;