import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";
import Planning from "../components/planning/planning";
import {DetailJalon} from "../components/jalon/detailsJalon";
import {JalonChrono} from "../components/jalon/jalonChrono";
import InfoJalon from "../components/planning/infoJalon";
import TacheContainer from "../components/tache/tache_container";


export function InfoGlobalJalon(props) {
    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [idJalon, setIdJalon] = useState(0)

    useEffect( ()=>{
        if(localStorage.getItem("idJalon") != null){
            const id_jalon = JSON.parse(localStorage.getItem("idJalon"))
            setIdJalon(id_jalon)
        }
    }, [])


    return (<>

            <Navbar user={props.user} projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>

            <TacheContainer jalon={idJalon}/>

        </>
    );
}
