import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";

function SpanCalendrier(props) {

    const [jalons, setJalons] = useState([])
    const[dateDuCalendrier, setDateDuCalendrier ] = useState("");

    useEffect( ()=>{
        setJalons(props.jalons);
    }, [props.jalons])
    useEffect( ()=>{
        setDateDuCalendrier(props.dateDuCalendrier);
    }, [props.dateDuCalendrier])

    //affichage de jalon pour la modif
    // Gestionnaire d'événements au survol
    const handleMouseOver = (id) => {
        // Sélectionner tous les éléments ayant la classe spécifique
        const elements = document.querySelectorAll(`.jal-${id}`);
        elements.forEach((el) => {
            el.style.transition = "transform 0.3s ease-in-out";
            el.style.transform = "scaleY(2)";
        });
    };

    // Gestionnaire d'événements lorsque la souris quitte
    const handleMouseOut = (id) => {
        // Réinitialiser le style des éléments
        const elements = document.querySelectorAll(`.jal-${id}`);
        elements.forEach((el) => {
            el.style.transform = "scaleY(1)";
        });
    };



    return (<>


            {jalons.length > 0 && jalons.map((jalon, cpt) => {


                var dateFinJalon =   jalon.date_liv_theorique;
                var dateDebJalon = jalon.date_com_theorique ;
                var dateAct = dateDuCalendrier;

                // Vérifier si la date du jalon est entre deux dates
                var isBetween = false ;
                if(new Date(dateAct).getTime() > new Date(dateDebJalon).getTime() &&
                    new Date(dateAct).getTime() < new Date(dateFinJalon).getTime() ){
                    isBetween = true ;
                }

                var estDebut = false;
                if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                    estDebut = true;
                }

                var estFin = false
                if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                    estFin = true;
                }

                var estPasse = false
                if( new Date(dateAct).getTime() < new Date(props.aujourdhui).getTime() ){
                    estPasse = true
                }

                var projetDepasse = false
                if(new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()  && new Date(dateAct).getTime() <new Date(props.aujourdhui).getTime() && jalon.etat != 2){
                    projetDepasse = true
                }

                var projetCourt = false
                if( jalon.charge == 1 &&  new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()){
                    projetCourt = true
                }

                var projetCourt = false
                if( jalon.charge == 1 &&  new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()){
                    projetCourt = true
                }

                var nomClasse = "jal" + jalon.id_jalon

                return (

                    <>
                            <span className={isBetween && projetCourt === false ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                        <span className={estDebut === true && projetCourt === false ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                              onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                              onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                              style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                              onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                              data-bs-toggle="modal" data-bs-target="#modifModal"

                        ></span>
                        <span className={estFin === true && projetCourt === false ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                              onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                              onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                              style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                              onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                              data-bs-toggle="modal" data-bs-target="#modifModal">


                            </span>
                        <span className="event" className={projetCourt ? `event jal-${jalon.id_jalon}` : "d-none"}
                              onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                              onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                              style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                              onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                              data-bs-toggle="modal" data-bs-target="#modifModal"
                        ></span>

                        <div className="d-flex justify-content-center">
                            <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}} className={projetDepasse && estFin? "" : "d-none"} /> </div>

                    </>
                )

            })}


        </>

    )

}



export default SpanCalendrier;