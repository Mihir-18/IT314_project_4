import axios from 'axios';
import {useContext} from "react";
import RootCommentContext from "./RootCommentContext";

function Voting(props){
    return (
        <div className={'inline-block mr-2'}>
        {arrowButton('up')}
        <div className={'inline-block'}>{total}</div>
        {arrowButton('down')}
        </div>
    );
}

export default Voting;