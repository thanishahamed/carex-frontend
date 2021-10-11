import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Authenticate from './Authenticate';

export default function ProtectedRoute({component: Component, ...rest}) {
    return (
        <Route { ...rest } render={ props => {
            if(Authenticate.isAuthenticated()) {
                return <Component { ...props } /> 
            }else {
                return <Redirect to={{ 
                    // pathname: "/",
                    pathname: "/login",
                    state: {
                        from: props.location
                    }
                 }} 
                 />
            }
        }} />
    )
}
