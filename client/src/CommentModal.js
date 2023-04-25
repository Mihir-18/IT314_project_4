import PostContent from './PostContent.js';
import {useState, useEffect} from 'react';
import axios from 'axios';
import ClickOutHandler from 'react-clickout-handler';
import CommentForm from './CommentForm.js';
import Comments from './Comments.js';

function CommentModal(props){
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);
    const visibleClass= props.open? 'block': 'hidden';

    useEffect(() => {
        axios.get('http://localhost:4000/comments/' + props.id)
            .then(response => {
                    setComment(response.data);
                }
            );
        axios.get('http://localhost:4000/comments/root/' + props.id)
            .then(response => {
                setComments(response.data);
            });

    }, [props.id]);

    function close(){
        setComment({});
        props.onClickOut();
    }

    return(
        <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex "+visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.6)' }}>
            <ClickOutHandler onClickOut={()=>close()}>
                <div className="border border-reddit_dark-brightest my-4 w-3/4 md:w-1/2 bg-reddit_dark text-reddit_text p-4 mx-auto self-center rounded-md ">
                    <div className="block overflow-scroll" style={{ maxHeight: "calc(100vh - 200px)" }}>
                        <PostContent open={true} {...comment} />
                        {!!comment && !!comment._id && (
                            <>
                                <hr className="border-reddit_border my-4"/>
                                <CommentForm rootId={comment._id} parentId={comment._id} showAuthor={true}/>
                                <hr className="border-reddit_border my-4"/>
                                <Comments parentId={comment._id} comments={comments} />
                            </>
                        )}
                    </div>
                </div>
            </ClickOutHandler>  
        </div>
    );
}

export default CommentModal;