import express from 'express';
import {getUserFromToken} from './UserFunctions.js';
import Vote from './models/Vote.js';

const router= express.Router();

router.get('/vote/:commentId/:direction', (req, res) =>{
    getUserFromToken(req.cookies.token)
    .then(userInfo => {
        const vote= new Vote({
            author: userInfo.username,
            direction: req.params.direction === 'up' ? 1 : -1,
            commentId: req.params.commentId,
        });
        vote.save().then(()=>{
            Vote.find({commentId: req.params.commentId,})
            .then(commentVotes =>{
                let total= 0;
                commentVotes.forEach(vote => {total+=vote.direction});
                res.json(total);
            });
        });
    });
});

router.post('/votes', (req, res)=>{
    const {commentsIds}= req.body;
    getUserFromToken(req.cookies.token).then(userInfo => {
        Vote.find({ commentId: { '$in': commentsIds } })
            .then(votes => {
                let commentsTotals = {};
                votes.forEach(vote => {
                    if (typeof commentsTotals[vote.commentId] === 'undefined') {
                        commentsTotals[vote.commentId] = 0;
                    }
                    commentsTotals[vote.commentId] += vote.direction;
                });
                let userVotes={};
                votes.forEach(vote => {
                    if(vote.author === userInfo.username){
                        userVotes[vote.commentId]= vote.direction;
                    }
                });
                res.json({ commentsTotals , userVotes});
            });
    });
});

export default router; 