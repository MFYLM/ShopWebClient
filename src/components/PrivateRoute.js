import React from "react";
import { Outlet, Navigate } from "react-router-dom";


/*
this component should protect the route

TODO: how to get loginStatus? localStorage (store a json file, where has loginStatus)
*/



const PrivateRoute = (isLogin) => {
    return isLogin ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateRoute;