import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    //Route,
    Redirect,
  } from "react-router-dom";

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../components/journal/JournalScreen'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    // para esperar a firebase
    const [ checking, setChecking ] = useState( true );

    // para saber si el usuario esta logueado o no
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {
        // un objeto que observa la autenticacion
        firebase.auth().onAuthStateChanged( (user) => {
            
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });

    }, [ dispatch, setChecking, setIsLoggedIn ]) // Solo se va a ejecutar una vez

    if( checking ) {
        return (
            <h1>Espere ...</h1>
        )
    } else {
        return (
            <Router>
                <div>
                    <Switch>

                        {/* <Route path="/auth" component={ AuthRouter } /> */}
                        <PublicRoute 
                            component={ AuthRouter }
                            isAuthenticated={ isLoggedIn }
                            path="/auth" 
                        />

                        {/* <Route exact path="/" component={ JournalScreen } /> */}
                        <PrivateRoute 
                            component={ JournalScreen } 
                            exact path="/" 
                            isAuthenticated={ isLoggedIn }
                        />

                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </Router>
        )
    }

}
