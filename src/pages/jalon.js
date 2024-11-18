import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar.js";
import Projets from "../components/projets"
import Planning from "../components/planning"
import Connexion from "../components/connexion";


export function Jalon(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    return (<>

            <Navbar user={props.user} projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>

            <div className="conteneur container-xl">
                <div>
                    <Planning projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>
                </div>

            </div>


        </>
    );
}