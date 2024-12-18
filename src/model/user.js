import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {route} from './route';

export async function connexionApi(user, mdp) {
    try{
        return fetch(route +"user/auth/"+ user +"/" + mdp, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            // la on transforme en json
            .then(
                res =>{
                    if ( res.status == "400"){
                        return res.status
                    }else{
                        return res.json()
                        console.log(res);
                    }
                }
            )
            .then(data => {

                if(data == "400"){
                    return data
                }else{
                    // on met le token en session
                    console.log("Mes datas : ", data);
                    sessionStorage.setItem("token", data.token);

                    const decodedToken = jwtDecode(data.token);
                    console.log("Token décodé :" , decodedToken)

                    // const user = decodedToken.id_user
                    // const tab = {"id_user": user.id_user, "login": user.login , "droit": user.droit }
                    //id_user, login, droit, trigramme
                    return decodedToken;
                }

            });
        // ce then la return la reponse
    }
    catch(error){
        return "Erreur lors de la connexion " +  error
    }

}

export async function getAllUser() {
    try {
        return fetch(route +"user/getAll", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            // la on transforme en json
            .then(
                res => {
                    if (res.status == "400") {
                        return res.status
                    } else {
                        return res.json()
                    }
                }
            )
            .then(data => {
                return data;
            });
        // ce then la return la reponse
    }
    catch (error) {
        return "j'ai une erreur" + error
    }

}