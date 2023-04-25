import Button from "./Button";
import CommentForm from './CommentForm';
import {useState} from 'react';

function Comments(props){
    const [showForm, setShowForm] = useState(false);
    const comments = props.comments.filter(comment => props.parentId === comment.parentId );

    return(
        <div className={'my-2 text-reddit_text'} >
            {comments.map(comment => {
                const replies = props.comments.filter(c => c.parentId === comment._id);
                return(
                <div>
                    <div className="flex">
                        <div className="bg-reddit_text w-10 h-10 rounded-full mr-2"/>
                        <div className="leading-10 pr-2 text-lg font-sans">{comment.author}</div>
                        <div className="leading-10 text-md font-sans">{comment.postedAt}</div>
                    </div>
                    <div className="border-l-2 border-reddit_text-darker p-3 pb-0">
                        {comment.body}
                        <div>
                            <Button 
                                type={'button'}
                                onClick={() => {setShowForm(comment._id)} }
                                className="bg-reddit_dark text-reddit_text-darker border-none py-2 pl-0 pr-0" >Reply</Button>
                            
                            {comment._id === showForm && (
                                <CommentForm 
                                    parentId={comment._id}
                                    rootId={props.parentId}
                                    onSubmit={() => {setShowForm(false);} }
                                    showAuthor={false} 
                                    onCancel={e => setShowForm(false)} />
                            )}
                            {replies.length > 0 && (
                                <Comments comments={props.comments} parentId={comment._id} />
                            )}
                        </div>
                    </div>    
                </div>
            );
            })}
        </div>
    );
}

export default Comments;