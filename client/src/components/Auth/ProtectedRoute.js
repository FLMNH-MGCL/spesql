import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({component: Component, checkAuth, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => (
                localStorage.getItem('authenticated') === "true"
                ? <Component {...props} />
                : <Redirect to='Login' />
            )
        }
        />
    )
}

export default ProtectedRoute