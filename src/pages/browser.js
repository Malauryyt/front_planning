import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TableauDeBord } from './tableauDeBord.js';

export default function Browser() {

    // const [user, setUser] = useState();
    // useEffect(() => {
    //     sessionStorage.getItem("user") == null ?
    //         sessionStorage.setItem("user", [user]) : setUser(sessionStorage.getItem("user"));
    // })
    //
    // const initUser = (user) => {
    //
    //     sessionStorage.setItem('user', JSON.stringify(user));
    //     var obj = JSON.parse(sessionStorage.user);
    //     setUser(obj)
    //
    //     console.log("dans le browser " + user.login)
    // };
    //
    //
    // // gestion du token
    // const [token, setToken] = useState("");
    //
    // useEffect(() => {
    //     if (sessionStorage.getItem("token") !== null) {
    //         setToken(sessionStorage.getItem("token"));
    //     }
    // }, []);
    //
    //
    // // Fonction pour obtenir le token depuis le sessionStorage
    // function getToken() {
    //     const token = sessionStorage.getItem('token');
    //
    //     if (token && isTokenValid(token)) {
    //         console.log("mon token est valide")
    //         return token;
    //     }else{
    //         sessionStorage.removeItem('token');
    //         console.log("mon token est pas valide")
    //         return null;
    //     }
    //
    // }
    //
    // // Fonction pour vérifier si le token est valide
    // function isTokenValid(token) {
    //     try {
    //         const { exp } = jwtDecode(token);
    //         if (Date.now() >= exp * 15000) {
    //             return false;
    //         }
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // }
    //
    // const useAuth = () => {
    //     useEffect(() => {
    //         const token = getToken();
    //
    //         if (window.location.pathname === '/login') {
    //             return;
    //         }
    //
    //         if (!token) {
    //             window.location.href = '/login';
    //         }
    //         console.log("ma gestion de tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
    //     }, []);
    // };
    //
    // useAuth();


    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<TableauDeBord />} />
                </Routes>
            </BrowserRouter>
        </>
    )

}