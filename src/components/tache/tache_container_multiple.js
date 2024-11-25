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
        console.log("mes taches" ,props.taches)
        setCouleur(props.couleur);

    }, [props.jalon])


return (
        <>
                <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">  {maTache.libelle}</h5>
                        <FontAwesomeIcon icon="fa-solid fa-lock" className={maTache.statusPrece === 0 || maTache.statusPrece === 50 ? "": "d-none"}/>
                        <small className="text-body-secondary">3 days ago</small>
                    </div>
                    <small className="text-body-secondary">{maTache.description}</small>
                </a>

        </>

    )

}



export default TacheContainerMultiples;