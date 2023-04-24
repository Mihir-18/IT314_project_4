import Board from './Board.js';
import CommentPage from './CommentPage.js';
import {Routes, Route, useLocation} from 'react-router-dom';
import CommentModal from './CommentModal.js';
import {useState, useEffect} from 'react';

function RoutingRoutes(){

    const [postOpen, setPostOpen] = useState(null);

    let location = useLocation();
    
    let commentId= null;

    if(location.state && location.state.commentId){
        location.pathname='/';
        if(postOpen){
            commentId = location.state.commentId;
        } else{
            location.state.commentId= null;
        }
    }

    useEffect(()=>{
        setPostOpen(true);
    }, [commentId])

    useEffect(() => {
        commentId=null;
    }, [postOpen])
    
    return(
        <Routes location={location}>
            {commentId && (
                    <Route path="/" element={<><CommentModal id={commentId} open={postOpen} onClickOut={()=> setPostOpen(false)}/><Board /></>} />
            )}
            <Route path="/" element={<Board />} />
            <Route path="/comments/:id" element={<CommentPage />} />
        </Routes>
    );
}

export default RoutingRoutes;