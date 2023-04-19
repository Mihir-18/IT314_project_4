import {Route, Routes, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import Board from "./Board";
import CommentPage from "./CommentPage";
import CommentModal from "./CommentModal";

function RoutingSwitch() {

  const [postOpen, setPostOpen] = useState(false);
  // const [commentId, setCommentId] = useState(null);

  let location = useLocation();
  let commentId = null;

  if (location.state && location.state.commentId) {
    location.pathname = '/';
    commentId = location.state.commentId;
  }

  useEffect(() => {
    setPostOpen(true);
  }, [commentId]);

  useEffect(() => {
    commentId = null;
  }, [postOpen]);

  return (
    <div>
      {commentId && (
        <div>
          <CommentModal
            id={commentId}
            open={postOpen}
            onClickOut={() => setPostOpen(false)} />
        </div>
      )}
      <Routes location={location}>
        <Route exact path="/" element={<Board/>} />
        <Route exact path="/comments/:id" element={<CommentPage/>} />
      </Routes>
    </div>
  );
}

export default RoutingSwitch;