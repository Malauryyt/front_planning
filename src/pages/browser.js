import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

import { TableauDeBord } from './tableauDeBord.js';
import Connexion from "../components/connexion";
import {ProjetRecap} from "./projetRecap";
import {Jalon} from "./jalon.js";

export default function Browser() {

    const [user, setUser] = useState();
    useEffect(() => {
        sessionStorage.getItem("user") == null ?
            sessionStorage.setItem("user", [user]) : setUser(sessionStorage.getItem("user"));
    }, [user]);

    const initUser = (user) => {

        sessionStorage.setItem('user', JSON.stringify(user));
        var obj = JSON.parse(sessionStorage.user);
        setUser(obj)

        console.log("dans le browser " + user.login)
    };

    // gestion du token
    const [token, setToken] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("token") !== null) {
            setToken(sessionStorage.getItem("token"));
        }
    }, []);


    // Fonction pour obtenir le token depuis le sessionStorage
    function getToken() {
        const token = sessionStorage.getItem('token');

        if (token && isTokenValid(token)) {
            return token;
        }else{
            sessionStorage.removeItem('token');
            return null;
        }

    }

    // Fonction pour vérifier si le token est valide
    function isTokenValid(token) {
        try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 15000) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    const useAuth = () => {
        useEffect(() => {
            const token = getToken();

            if (window.location.pathname === '/connexion') {
                return;
            }

            if (!token) {
                window.location.href = '/connexion';
            }
        }, []);
    };

    useAuth();

    // affichage du projet en cours
    const [projet, setProjet] = useState(0);



    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<TableauDeBord user={user} projet={projet} setProjet={setProjet}/>} />
                    <Route path='/connexion' element={<Connexion user={user} setUser={initUser}  />} />
                    <Route path='/projet' element={<ProjetRecap user={user} setUser={initUser}  projet={projet} setProjet={setProjet} />} />
                    <Route path='/planning' element={<Jalon user={user} setUser={initUser}  projet={projet} setProjet={setProjet} />} />

                </Routes>
            </BrowserRouter>
        </>
    )

}