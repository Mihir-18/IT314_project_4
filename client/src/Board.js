import BoardHeader from './BoardHeader.js';
import Postform from './Postform.js';
import PostsListing from './PostsListing.js';

function Board(){
    return (
        <div>
            <BoardHeader />
            <Postform />
            <PostsListing />
        </div>
    );
}

export default Board;