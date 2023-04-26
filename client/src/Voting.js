import axios from 'axios'; 
import {useContext} from 'react';
import RootCommentContext from './RootCommentContext';

function Voting(props){

    const rootCommentInfo = useContext(RootCommentContext);
    const {commentsTotals, userVotes}= rootCommentInfo;
    const {commentId}= props;

    const total = commentsTotals && commentId in commentsTotals ? commentsTotals[commentId] : 0;

    function sendVote(direction= 'up'){
        axios.get('http://localhost:4000/vote/'+props.commentId+'/'+direction, {withCredentials:true})
        .then(response => {
            console.log(response.data); 
        })
    }

    function handleVoteUp(){
        sendVote('up');
    }

    function handleVoteDown(){
        sendVote('down');
    }

    return(
        <div className={'inline-block mr-2 relative top-1'}>
            <button onClick={()=> handleVoteUp()} className={'inline-block h-5 text-reddit_text-darker hover:text-white relative top-1'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                </svg>
            </button>
            <div className={'inline-block'}>{total}</div>
            <button onClick={()=> handleVoteDown()} className={'inline-block h-5 text-reddit_text-darker hover:text-white relative top-1'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}

export default Voting;