import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";
import {getTachesByJalon} from "../../model/tache";

function TachePlanning(props) {

    const [jalons, setJalons] = useState([])
    const[dateDuCalendrier, setDateDuCalendrier ] = useState("");
    const[mesTaches, setMesTaches ] = useState("");

    useEffect( ()=>{
        setJalons(props.jalons);

    }, [props.jalons])
    useEffect( ()=>{
        setDateDuCalendrier(props.dateDuCalendrier);
    }, [props.dateDuCalendrier])

    


    //récupération des taches du jalons
    const getMesTaches = async (id_jalon) => {

        //if(props.jalonModif != "" ){
        if(id_jalon != "" && id_jalon != null){

            try {
                const data = await getTachesByJalon(id_jalon);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setMesTaches([])
                }
                else{
                    setMesTaches(data) ;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
                setMesTaches([])
            }
        }
    }

    return (<>





        </>

    )

}



export default TachePlanning;