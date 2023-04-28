import ClickOutHandler from "react-clickout-handler";
import Input from './Input.js';
import Button from './Button.js';
import TextArea from './TextArea.js';
import {useState, useContext} from 'react';
import PostFormModalContext from './PostFormModalContext.js';
import axios from 'axios';
import AuthModalContext from './AuthModalContext';
import {Navigate} from 'react-router-dom';


function PostFormModal(){
    const modalContext= useContext(PostFormModalContext);
    const authModalContext= useContext(AuthModalContext);

    const visibleClass = modalContext.show? 'block': 'hidden';

    const [title, setTitle]= useState('');
    const [body, setBody] = useState('');
    const [newPostId, setNewPostId]= useState(null);

    function createPost(){
        const data= {title, body};
        axios.post('https://news-aggregator-backend.onrender.com/comments', data, {withCredentials:true}).then(response =>{
            setNewPostId(response.data._id);
        }).catch(error=>{
            if(error.response.status===401){
                 authModalContext.setShow('login');
            }
        });
    }

    if(newPostId){
        return(
            <Navigate to={'/comments/'+newPostId} />
        );
    }

    return(
        <div className={"w-screen h-screen absolute top-0 left-0 z-20 flex " + visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.8)' }}>
            <ClickOutHandler onClickOut={()=>{}}>
                <div className="border border-reddit_dark-brightest w-3/4  md:w-1/2 bg-reddit_dark p-5 text-reddit_text mx-auto self-center rounded-md ">
                    <h1 className="text-2xl mb-5">Create a post</h1>
                    <Input className={'w-full mb-3'} placeholder={'Title'} value={title} onChange={e => {setTitle(e.target.value)}}/>
                    <TextArea className={'w-full mb-3'} placeholder={'Post text (you can use markdown)'} value={body} onChange={e=> {setBody(e.target.value)}}/>
                    <div className={'text-right'}>
                        <Button onClick={()=> modalContext.setShow(false)} outline className={'px-4 py-2 mr-2'}>Cancel</Button>
                        <Button onClick={()=> createPost()} className={'px-4 py-2'}>POST</Button>
                    </div>
                </div>
            </ClickOutHandler>
        </div>
    );
}

export default PostFormModal;