import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm'

export const RegistrerScreen = () => {

    const dispatch = useDispatch();

    // Obtener el estado
    const { msgError, loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'User 1',
        email: 'user1@mail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        //console.log(name, email, password, password2 );

        if( isFormValid() ) {
            dispatch( startRegisterWithEmailPassword( email, password, name ) );
        }

    }

    const isFormValid = () => {

        if( name.trim().length === 0 ) {
            dispatch( setError('Name is required') );
            return false;
        } else if( !validator.isEmail(email) ) {
            dispatch( setError('Email is not valid') );
            return false;
        } else if( password !== password2 || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister } >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">{msgError}</div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={ loading }
                >
                    Register
                </button>


                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?   
                </Link>

            </form>
        </>
    )
}
