import {BrowserRouter as Router, Navigate} from 'react-router-dom';
import Header from './Header.js';
import RoutingRoutes from './RoutingRoutes.js';
import AuthModal from './AuthModal.js';
import PostFormModal from './PostFormModal.js';
import {useContext, useEffect} from 'react';
import RedirectContext from './RedirectContext.js';

function Routing(){ 
    const {redirect, setRedirect} = useContext(RedirectContext);
    useEffect(()=>{
        if(redirect ){
            setRedirect(false);
        }
    }, [redirect]);
    return(
        <Router>
            {redirect && (
                <Navigate to = {redirect} />
            )}
            {!redirect && (
                <>
                    <Header />
                    <RoutingRoutes />
                    <AuthModal />
                    <PostFormModal />
                </>
            )}
        </Router>
    );
}

export default Routing;