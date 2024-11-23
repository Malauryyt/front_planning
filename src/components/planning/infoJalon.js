import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";
import {getJalons, getJalonById} from "../../model/jalon";

function InfoJalon(props) {

    const [error, setError] = useState("");
    const [jalon, setJalon] = useState("");

    useEffect( ()=>{

        getJalonProjet()

    }, [props.jalonModif])


    //récupération des informations de mon jalon
    const getJalonProjet = async () => {

            try {
                const data = await getJalonById(props.jalonModif);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setError("Impossible de récupérer les projets" )
                }
                else{

                    console.log("meon jalon selectionee:", data)
                    setJalon(data) ;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }

    }

    return (<>


        </>

    )

}



export default InfoJalon;