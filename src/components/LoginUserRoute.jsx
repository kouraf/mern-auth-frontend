import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from '../context/UserContext';

const LoginUserRoute = (props) => {
    const { userData } = useContext(UserContext);

    return userData && userData.token ? (<Redirect to="/" />) :
        (<Route path={props.path} exact={props.exact} component={props.component} />);
};
export default LoginUserRoute;