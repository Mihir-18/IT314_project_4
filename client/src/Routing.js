import {BrowserRouter as Router} from 'react-router-dom';
import Header from './Header.js';
import RoutingRoutes from './RoutingRoutes.js';
import AuthModal from './AuthModal.js';
import PostFormModal from './PostFormModal.js';

function Routing(){
    return(
        <Router>
            <Header />
            <RoutingRoutes/>
            <AuthModal />
            <PostFormModal />
        </Router>
    );
}

export default Routing;