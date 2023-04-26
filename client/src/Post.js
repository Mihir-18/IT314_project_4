import {Link} from 'react-router-dom';
import PostContent from './PostContent.js';

function Post(props){
    const postClasses = "block border border-reddit_border bg-reddit_dark-brighter rounded-md " + (props.open ? "" : "hover:border-reddit_text cursor-pointer")
    return(
        <div className="px-6 text-reddit_text pb-4">
            {props.open && (
                <div className={postClasses}>
                    <PostContent {...props}/>
                </div>
            )}

            {!props.open && (
                <Link to={{pathname:'/comments/'+(props.rootId || props._id)}} state={{commentId: (props.rootId || props._id)}} className={postClasses} >
                    <PostContent {...props}/>
                </Link>
            )}
        </div>
    );
}

export default Post;