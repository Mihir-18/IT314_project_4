import BoardHeader from './BoardHeader';
import Header from './Header';
import PostForm from './PostForm';
import AuthModal from './AuthModal';
import AuthModalContext from './AuthModalContext';
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import Post from './Post';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState({});
  const [comments,setComments] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => setUser(response.data));

    axios.get('http://localhost:4000/comments', { withCredentials: true })
      .then(response => setComments(response.data));

  }, []);

  function logout(){
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
    .then(() => setUser({}));
  }
  return (
    <AuthModalContext.Provider value={{ show: showAuthModal, setShow: setShowAuthModal }}>
      <UserContext.Provider value={{...user, logout, setUser}}>
        <Header />
        <BoardHeader />
        <AuthModal />
        <PostForm />
        <div>
          {comments.map(comment => (
            <Post />
          ))}

        </div>
        <Post />
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
