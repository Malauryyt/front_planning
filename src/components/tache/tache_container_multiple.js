import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";
import {getTachesByJalon} from "../../model/tache";
import {Estimation} from "../jalon/estimation";

function TacheContainerMultiples(props) {

    const [maTache, setMesTaches] = useState([]);
    const [couleur, setCouleur] = useState([]);

    // récupération de mes jalons selon le projets choisis

    useEffect( () =>{

        setMesTaches(props.taches);
        setCouleur(props.couleur);

    }, [props.jalon, props.maj, props.taches])


return (
        <>
                <a href="#" className="list-group-item list-group-item-action"
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
                   }

                }>
                    <div className="d-flex">
                        <div className="petitRond "
                        style={{backgroundColor : couleur}}>

                        </div>
                        <div className="col-11">
                            <div className="d-flex w-100 justify-content-between">
                                <div className="d-flex">

                                    <h5 className="mb-1">  {maTache.libelle}</h5>
                                    <FontAwesomeIcon icon="fa-solid fa-lock" className={maTache.statusPrece === 0 || maTache.statusPrece === 50 ? "mt-1 ms-2": "d-none"}/>
                                    <FontAwesomeIcon icon="fa-solid fa-link" style={{color: "#000000",}} className={maTache.statusPrece === 100 ? "mt-1 ms-2": "d-none"}/>

                                </div>
                                <small className="text-body-secondary">{maTache.charge} jours </small>
                               
                            </div>
                            <small className="text-body-secondary">{maTache.description}</small>
                        </div>

                    </div>

                </a>

        </>

    )

}



export default TacheContainerMultiples;