import axios from 'axios';
import Post from './Post.js';
import {useState, useEffect} from 'react';

function SearchResultsPage(props){
    const URL = window.location.href.split('/');
    const text= URL[URL.length-1];
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/comments?search='+text, { withCredentials: true }).then(response => setComments(response.data));
    }, []);

    return (
        <div className="bg-reddit_dark">
            {comments.map(comment => (
                <Post {...comment} />
            ))}
        </div>
    );
}

export default SearchResultsPage;