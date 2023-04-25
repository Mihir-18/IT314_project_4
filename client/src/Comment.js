import Post from "./Post";
import CommentForm from "./CommentForm";
import RootCommentContext from "./RootCommentContext";
import Comments from "./Comments";
import {useEffect, useState} from "react";
import axios from "axios";

function Comment(props){
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);

    function refreshComments(){
        axios.get('http://localhost:4000/comments/root/' + props.id)
            .then(response => {
                setComments(response.data);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:4000/comments/' + props.id)
            .then(response => {
                    setComment(response.data);
                }
            );
        
            refreshComments();
        // axios.get('http://localhost:4000/comments/root/' + props.id)
        // .then(response => {
        //     setComments(response.data);
        // });
        
    }, [props.id]);


    return (<>
        {comment && (
                <Post {...comment} open={true}/>
            )}

            {!!comment && !!comment._id && (
                            <>
                                <hr className="border-reddit_border my-4"/>
                                <CommentForm onsubmit={() => refreshComments()} rootId={comment._id} parentId={comment._id} showAuthor={true}/>
                                <hr className="border-reddit_border my-4"/>
                                <RootCommentContext.Provider value={{refreshComments}}>
                                    <Comments parentId={comment._id} rootId={comment._id} comments={comments} />
                                </RootCommentContext.Provider>
                            </>
                        )}
    </>);
}

export default Comment;