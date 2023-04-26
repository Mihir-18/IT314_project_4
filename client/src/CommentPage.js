import {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post.js';
import Comment from './Comment';

function CommentPage(props){

    const pathArray = window.location.pathname.split('/');
    const commentId = pathArray[pathArray.length - 1];
    
    return(
        <div className="bg-reddit_dark py-4 px-4">
            <Comment id={commentId} />
        </div>
    );
}

export default CommentPage;