import Post from './Post';
import {useState, useEffect} from 'react';
import axios from 'axios';

function PostsListing(){

    const [comments, setComments] = useState([]);

    useEffect(()=>{
        axios.get('https://news-aggregator-backend.onrender.com/comments', { withCredentials: true }).then(response => setComments(response.data));
    }, []);

    return(
        <div className="bg-reddit_dark">
            {comments.map(comment => (
                <Post {...comment} />
            ))}
        </div>
    );
}

export default PostsListing;