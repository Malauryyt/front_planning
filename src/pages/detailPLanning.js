import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";
import Planning from "../components/planning/planning";
import {DetailJalon} from "../components/jalon/detailsJalon";
import {JalonChrono} from "../components/jalon/jalonChrono";



export function DetailPLanning(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }
//<DetailJalon projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>
    return (<>

            <Navbar user={props.user} projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>

            <div className="conteneur container-xl">
                <div className={"m-3"}>

                    <JalonChrono projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>
                </div>
            </div>


        </>
    );
}

// <div>
//     <div className="list-group">
//         <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
//             <div className="d-flex w-100 justify-content-between">
//                 <h5 className="mb-1">List group item heading</h5>
//                 <small>3 days ago</small>
//             </div>
//             <p className="mb-1">Some placeholder content in a paragraph.</p>
//             <small>And some small print.</small>
//         </a>
//         <a href="#" className="list-group-item list-group-item-action">
//             <div className="d-flex w-100 justify-content-between">
//                 <h5 className="mb-1">List group item heading</h5>
//                 <small className="text-body-secondary">3 days ago</small>
//             </div>
//             <p className="mb-1">Some placeholder content in a paragraph.</p>
//             <small className="text-body-secondary">And some muted small print.</small>
//         </a>
//         <a href="#" className="list-group-item list-group-item-action">
//             <div className="d-flex w-100 justify-content-between">
//                 <h5 className="mb-1">List group item heading</h5>
//                 <small className="text-body-secondary">3 days ago</small>
//             </div>
//             <p className="mb-1">Some placeholder content in a paragraph.</p>
//             <small className="text-body-secondary">And some muted small print.</small>
//         </a>
//     </div>
// </div>