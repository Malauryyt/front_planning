import React, { useState, useEffect } from 'react';
import {route} from './route';

export async function getTachesByJalon(id_jalon) {
    try {
        return fetch(route +"tache/getTacheByJalon/" + id_jalon, {
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

export async function getTachesByProjet(id_projet, id_user) {
    try {
        return fetch(route +"tache/getTacheByProjet/" + id_projet +"/" + id_user, {
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

export async function getTachesMine( id_user) {
    try {
        return fetch(route +"tache/getTacheMine/" +  id_user, {
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

export async function suppTache(id) {
    try{
        return fetch(route +"tache/supp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id,
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

export async function modifTache(id, libelle, description, operation,dateDeb,dateDema, charge, statut, id_user, id_tache, id_jalon, id_projet) {
    try{
        return fetch(route +"tache/modif", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id,
                "libelle": libelle,
                "description": description,
                "operation":  operation,
                "dateDebutTheo": dateDeb,
                "dateDema": dateDema,
                "charge": charge,
                "statut": statut,
                "id_user": id_user,
                "id_tache": id_tache,
                "id_jalon": id_jalon,
                "id_projet": id_projet

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


export async function creaTache( libelle, description, operation,dateDeb, charge, id_user, id_tache, id_jalon, id_projet) {
    try{
        return fetch(route +"tache/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "libelle": libelle,
                "description": description,
                "operation":  operation,
                "dateDebutTheo": dateDeb,
                "dateDema": null,
                "charge": charge,
                "statut": 0,
                "id_user": id_user,
                "id_tache": id_tache,
                "id_jalon": id_jalon,
                "id_projet": id_projet

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


//récupération des taches du jalons
export async function getMesTachesRoutes( id_jalon) {

    //if(props.jalonModif != "" ){
    if(id_jalon != "" && id_jalon != null){

        try {
            const data = await getTachesByJalon(id_jalon);
            if(data == "400"){
                console.log("data/error : ", data.status);
                return []
            }
            else{
                return data
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
            return []
        }
    }
}