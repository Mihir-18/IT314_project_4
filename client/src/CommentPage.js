import {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post.js';

function CommentPage(){

    const pathArray = window.location.pathname.split('/');
    const commentId = pathArray[pathArray.length - 1];

    const [comment, setComment]= useState({});

    useEffect(()=>{
        axios.get('http://localhost:4000/comments/'+commentId)
            .then(response => setComment(response.data));
    }, []);

    return(
        <div className="bg-reddit_dark py-4 px-4">
            {comment && (
                <Post {...comment} open={true}/>
            )}
        </div>
    );
}

export default CommentPage;