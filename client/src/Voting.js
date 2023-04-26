import axios from 'axios'; 
import {useContext} from 'react';
import RootCommentContext from './RootCommentContext';

function Voting(props){

    const rootCommentInfo = useContext(RootCommentContext);
    const {commentsTotals, userVotes}= rootCommentInfo;
    const {commentId}= props;

    const total = commentsTotals && commentId in commentsTotals ? commentsTotals[commentId] : 0;
    const userVote = userVotes && commentId in userVotes? userVotes[commentId] : 0;

    function arrowButton(directionName = 'up'){
        const directionNumber = directionName==='up'? 1: -1;
        let classNames = 'inline-block h-5 relative top-1 ';

        if(directionNumber === userVote){
            classNames+= 'text-reddit_red ';
        } else {
            classNames += 'text-reddit_text-darker hover:text-white ';
        }

        if(directionName==='up'){
            return(
                <button onClick={() => handleVoteUp()} className={classNames}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                    </svg>
                </button>
            );
        } else{
            return(
                <button onClick={() => handleVoteDown()} className={classNames}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                </button>
            );
        }
    }

    function sendVote(direction= 'up'){

        const directionNumber = direction === 'up' ? 1 : -1;
        if(directionNumber === userVote){
            direction = 'unvote';
        }

        axios.get('http://localhost:4000/vote/'+props.commentId+'/'+direction, {withCredentials:true})
        .then(response => {
            rootCommentInfo.refreshVotes();
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
            {arrowButton('up')}
            <div className={'inline-block'}>{total}</div>
            {arrowButton('down')}
        </div>
    );
}

export default Voting;