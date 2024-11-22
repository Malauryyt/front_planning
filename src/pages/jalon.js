import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";

import Planning from "../components/planning/planning"
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