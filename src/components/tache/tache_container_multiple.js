import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";
import {getTachesByJalon} from "../../model/tache";
import {Estimation} from "../jalon/estimation";

function TacheContainerMultiples(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [maTache, setMesTaches] = useState([]);
    const [couleur, setCouleur] = useState([]);

    // récupération de mes jalons selon le projets choisis

    useEffect( () =>{

        setMesTaches(props.taches);
        setCouleur(props.couleur);

    }, [props.jalon, props.maj, props.taches])


return (
        <>
                <a href="#" className="list-group-item list-group-item-action "
                   data-bs-toggle="modal" data-bs-target="#modifTache"
                   onClick={()=> {
                       props.setTacheModif(maTache.id);
                       console.log("on regard", maTache.statusPrece)
                       if (maTache.statusPrece === 100 || maTache.statusPrece=== "" ) {
                           props.setTacheBloquer(false)
                       }
                       else{
                           props.setTacheBloquer(true)
                       }
                       if(props.setJalonModif != undefined) {
                           props.setJalonModif(maTache.id_jalon)
                       }
                   }}
                   style={{
                       color: maTache.id_user === user.id_user ? "black" : "gray",
                    }}
                >
                    <div className="d-flex">
                        <div className="petitRond "
                        style={{backgroundColor : couleur}}>

                        </div>
                        <div className="col-11">
                            <div className="d-flex w-100 justify-content-between">
                                <div>
                                    <div className="d-flex">

                                        <h5 className={props.nomProjet != undefined ? "mb-1 m-1" : "d-none"}>{props.nomProjet} -  {maTache.libelle}</h5>
                                        <h5 className={props.nomProjet == undefined ? "mb-1" : "d-none"}>  {maTache.libelle} </h5>
                                        <FontAwesomeIcon icon="fa-solid fa-lock" className={maTache.statusPrece === 0 || maTache.statusPrece === 50 ? "mt-1 ms-2": "d-none"}/>
                                        <FontAwesomeIcon icon="fa-solid fa-link" style={{color: "#000000",}} className={maTache.statusPrece === 100 ? "mt-1 ms-2": "d-none"}/>

                                    </div>
                                    <p><small className="text-body-secondary">A faire le : {maTache.dateDebutTheorique}  </small></p>
                                </div>
                               <div >
                                   <small className="text-body-secondary">{maTache.charge} jours </small>

                               </div>


                            </div>

                            <p><small className="text-body-secondary">{maTache.description}</small></p>



                        </div>

                    </div>

                </a>

        </>

    )

}



export default TacheContainerMultiples;