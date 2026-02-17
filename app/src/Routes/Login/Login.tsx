import React from 'react'
import SharedInterface from '../../WebComponents/SharedInterface/SharedInterface';
import LoginForm from '../../WebComponents/Login/LoginForm';

export default function Login(props: any) {
    return(
        <>
        <SharedInterface flexflow="row">
            <LoginForm />
        </SharedInterface>
        </>
    );
}