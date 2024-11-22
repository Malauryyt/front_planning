import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";
import Projets from "../components/projets"
import Connexion from "../components/connexion";


export function TableauDeBord(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    return (<>

            <Navbar user={props.user} projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>

            <div className="conteneur container-xl">
                <div>
                    <Projets projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>
                </div>

            </div>


        </>
    );
}