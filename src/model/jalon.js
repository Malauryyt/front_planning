
import React, { useState, useEffect } from 'react';
import {route} from './route';

export async function getJalons(id_projet) {
    try {
        return fetch(route +"jalon/getJalons/" + id_projet, {
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

export async function getJalonById(id_projet) {
    try {
        return fetch(route +"jalon/getJalonById/" + id_projet, {
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

export async function creaPosteJalon(id_projet, libelle, dateLivPrev, dateCommencement, id_user, couleur) {
    try{
        return fetch(route +"jalon/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                "libelle" : libelle,
                "dateLivPrev": dateLivPrev,
                "dateCommencement": dateCommencement,
                "id_projet": id_projet,
                "id_user" : id_user,
                "couleur" : couleur

            })
        })
            // la on transforme en json
            .then(
                res =>{
                    return res.status
                }
            )
            .then(data => {
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}

export async function modifJalon(id_jalon , libelle, date_liv_prev,date_com, id_user,  id_projet, etat, couleur  ) {
    try{
        return fetch(route +"jalon/modif", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                "id_jalon": id_jalon,
                "libelle" : libelle,
                "date_liv_prev": date_liv_prev,
                "date_com": date_com,
                "id_user" : id_user,
                "id_projet": id_projet,
                "etat": etat,
                "couleur" : couleur

            })
        })
            // la on transforme en json
            .then(
                res =>{
                    return res.status
                }
            )
            .then(data => {
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}