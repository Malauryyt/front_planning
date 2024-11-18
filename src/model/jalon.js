
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