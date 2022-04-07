import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommnetWrite";
import { useParams } from "react-router-dom";

const PostDetail = () => {

    const param = useParams()
    
    // console.log(param)

    return (
        <React.Fragment>
            <Post param={param}/>
            <CommentWrite />
            <CommentList />
        </React.Fragment>
    )
}

export default PostDetail;