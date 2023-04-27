import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import TimeAgo from 'timeago-react'

function PostContent(props) {
    return (
        <div>
            <h5 className="text-reddit_text-darker text-sm mb-1 px-4">Posted by {props.author} <TimeAgo datetime={props.postedAt}/></h5>
            <h2 className='text-xl mb-3 px-4'>{props.title}</h2>
            <div className='text-sm leading-6 px-6'>
                <ReactMarkdown  plugins={[gfm]} children={props.body} />
            </div>
        </div>
    );
}
export default PostContent;