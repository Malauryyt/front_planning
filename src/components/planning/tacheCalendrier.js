import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";
import {getTachesByProjet} from "../../model/tache";
import {getJalons} from "../../model/jalon";

function TacheCalendrier(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const[dateDuCalendrier, setDateDuCalendrier ] = useState("");
    const[mesTaches, setMesTaches] = useState([]);

    useEffect( ()=>{
        setDateDuCalendrier(props.dateDuCalendrier);
        getTacheProjet(props.projetEnCours, user.id_user);

    }, [props.dateDuCalendrier,props.projetEnCours ])


    const getTacheProjet = async (projet, user) => {

        if(props.projetEnCours != 0 ){

            try {
                const data = await getTachesByProjet(projet, user);
                if(data == "400"){
                    console.log("data/error : ", data.status);

                }
                else{
                    console.log("mes taches :", data)
                    setMesTaches(data) ;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }
        else{
            setMesTaches([])
        }


    }


    return (<>


            {mesTaches.length > 0 && mesTaches.map((tache, cpt) => {


                if( new Date(tache.dateDebutTheorique).getTime() === new Date(props.dateDuCalendrier).getTime()){
                    let couleur
                    switch (tache.statut) {
                        case 0:
                            couleur = "black";
                            break;
                        case 50:
                            couleur = "orange";
                            break;
                        case 100:
                            couleur = "green";
                            break;
                    }
                    return (

                        <>
                            <FontAwesomeIcon icon="fa-solid fa-thumbtack" style={{color: couleur,}} className="ms-1"/>

                        </>
                    )
                }


            })}


        </>

    )

}

export default TacheCalendrier;