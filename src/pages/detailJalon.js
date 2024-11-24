import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";
import Planning from "../components/planning/planning";
import {DetailJalon} from "../components/jalon/detailsJalon";
import {JalonChrono} from "../components/jalon/jalonChrono";
import InfoJalon from "../components/planning/infoJalon";


export function InfoGlobalJalon(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    return (<>

            <Navbar user={props.user} projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>

            <div className="conteneur container-xl">


                <div className="taches">

                    <ul className="timeline" id="timeline">
                        <li className="li complete">
                            <div className="timestamp">
                                <span className="author">Abhi Sharma</span>
                                <span className="date">11/15/2014</span>
                            </div>
                            <div className="status">
                                <h4> Shift Created </h4>
                            </div>
                        </li>
                        <li className="li complete">
                            <div className="timestamp">
                                <span className="author">PAM Admin</span>
                                <span className="date">11/15/2014</span>
                            </div>
                            <div className="status">
                                <h4> Email Sent </h4>
                            </div>
                        </li>
                        <li className="li complete">
                            <div className="timestamp">
                                <span className="author">Aaron Rodgers</span>
                                <span className="date">11/15/2014</span>
                            </div>
                            <div className="status">
                                <h4> SIC Approval </h4>
                            </div>
                        </li>
                        <li className="li">
                            <div className="timestamp">
                                <span className="author">PAM Admin</span>
                                <span className="date">TBD</span>
                            </div>
                            <div className="status">
                                <h4> Shift Completed </h4>
                            </div>
                        </li>
                    </ul>


                </div>
            </div>



        </>
    );
}
