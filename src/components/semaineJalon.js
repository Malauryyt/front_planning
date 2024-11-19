import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";

function Semaine(props) {

    const [aujourdhui, setaujourdhui] = useState("");
    const[calendrier, setCalendrier ] = useState({
        "Monday": ["1", "2", "3", "4", "5"],
        "Tuesday": ["1", "2", "3", "4", "5"],
        "Wednesday": ["1", "2", "3", "4", "5"],
        "Thursday": ["1", "2", "3", "4", "5"],
        "Friday": ["1", "2", "3", "4", "5"],
        "Saturday": ["1", "2", "3", "4", "5"],
        "Sunday": ["1", "2", "3", "4", "5"]
    });
    const[dateDuCalendrier, setDateDuCalendrier ] = useState({
        "Monday": ["1", "2", "3", "4", "5"],
        "Tuesday": ["1", "2", "3", "4", "5"],
        "Wednesday": ["1", "2", "3", "4", "5"],
        "Thursday": ["1", "2", "3", "4", "5"],
        "Friday": ["1", "2", "3", "4", "5"],
        "Saturday": ["1", "2", "3", "4", "5"],
        "Sunday": ["1", "2", "3", "4", "5"]
    });

    const [jalons, setJalons] = useState(props.jalons)



    useEffect( ()=>{

        setDateDuCalendrier(getDaysinCalendars(props.annee, props.mois ))
        setCalendrier(props.calendrier)

        const today = new Date();
        setaujourdhui(today.toISOString().split('T')[0]);

    }, [props.calendrier])

    //mise à jour de mon jalon
    useEffect( ()=>{
        setJalons(props.jalons);

    }, [props.jalons])

    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

        <tr>
            <td className={ new Date(aujourdhui).getTime() == new Date(dateDuCalendrier.Monday[props.index]).getTime() ? "day today" : "day "}
                onClick={ () => {props.setDateAjout(dateDuCalendrier.Monday[props.index])}} data-bs-toggle="modal" data-bs-target="#ajoutModal">
                <span className="number"> {calendrier.Monday[props.index]} </span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    var dateFinJalon =   jalon.date_liv_theorique;
                    var dateDebJalon = jalon.date_com_theorique ;
                    var dateAct = dateDuCalendrier.Monday[props.index]

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
                    if( new Date(dateAct).getTime() < new Date(aujourdhui).getTime() ){
                        estPasse = true
                    }

                    var nomClasse = "jal" + jalon.id_jalon

                    return (
                        <>

                            <span className={isBetween ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estDebut === true ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estFin === true ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>
                            <span className="event" className={jalon.charge == 1 && isBetween ? `event jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>

                        </>
                    )

                })}


            </td>
            <td className={ new Date(aujourdhui).getTime() == new Date(dateDuCalendrier.Tuesday[props.index]).getTime() ? "day today" : "day "}
                onClick={ () => {props.setDateAjout(dateDuCalendrier.Tuesday[props.index])}} data-bs-toggle="modal" data-bs-target="#ajoutModal">
                <span className="number">{calendrier.Tuesday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Tuesday[props.index]

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
                    if( new Date(dateAct).getTime() < new Date(aujourdhui).getTime() ){
                        estPasse = true
                    }

                    var projetDepasse = false
                    if(new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()  && new Date(dateAct).getTime() <new Date(aujourdhui).getTime() && jalon.etat != 2){
                        projetDepasse = true
                    }

                    var nomClasse = "jal" + jalon.id_jalon

                    return (
                        <>

                            <span className={isBetween ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estDebut === true ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estFin === true ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal">
                                <div className="d-flex justify-content-center"> <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}} size="lg" className={projetDepasse ? "mt-3" : "d-none"} /> </div>

                            </span>
                            <span className="event" className={jalon.charge == 1 && isBetween ? `event jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>

                        </>
                    )

                })}

            </td>
            <td className={ new Date(aujourdhui).getTime() == new Date(dateDuCalendrier.Wednesday[props.index]).getTime() ? "day today" : "day "}
                onClick={ () => {props.setDateAjout(dateDuCalendrier.Wednesday[props.index])}} data-bs-toggle="modal" data-bs-target="#ajoutModal">
                <span className="number"> {calendrier.Wednesday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Wednesday[props.index]

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
                    if( new Date(dateAct).getTime() < new Date(aujourdhui).getTime() ){
                        estPasse = true
                    }

                    var projetDepasse = false
                    if(new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()  && new Date(dateAct).getTime() <new Date(aujourdhui).getTime() && jalon.etat != 2){
                        projetDepasse = true
                    }

                    var nomClasse = "jal" + jalon.id_jalon

                    return (
                        <>

                            <span className={isBetween ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estDebut === true ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estFin === true ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal">
                                <div className="d-flex justify-content-center"> <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}} size="lg" className={projetDepasse ? "mt-3" : "d-none"} /> </div>

                            </span>
                            <span className="event" className={jalon.charge == 1 && isBetween ? `event jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>

                        </>
                    )

                })}

            </td>
            <td className={ new Date(aujourdhui).getTime() == new Date(dateDuCalendrier.Thursday[props.index]).getTime() ? "day today" : "day "}
                onClick={ () => {props.setDateAjout(dateDuCalendrier.Thursday[props.index])}} data-bs-toggle="modal" data-bs-target="#ajoutModal">
                <span className="number"> {calendrier.Thursday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Thursday[props.index]

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
                    if( new Date(dateAct).getTime() < new Date(aujourdhui).getTime() ){
                        estPasse = true
                    }

                    var projetDepasse = false
                    if(new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()  && new Date(dateAct).getTime() <new Date(aujourdhui).getTime() && jalon.etat != 2){
                        projetDepasse = true
                    }

                    var nomClasse = "jal" + jalon.id_jalon

                    return (
                        <>

                            <span className={isBetween ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estDebut === true ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estFin === true ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal">
                                <div className="d-flex justify-content-center"> <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}} size="lg" className={projetDepasse ? "mt-3" : "d-none"} /> </div>

                            </span>
                            <span className="event" className={jalon.charge == 1 && isBetween ? `event jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>

                        </>
                    )

                })}

            </td>
            <td  className={ new Date(aujourdhui).getTime() == new Date(dateDuCalendrier.Friday[props.index]).getTime() ? "day today" : "day "}
                 onClick={ () => {props.setDateAjout(dateDuCalendrier.Friday[props.index])}} data-bs-toggle="modal" data-bs-target="#ajoutModal">
                <span className="number"> {calendrier.Friday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Friday[props.index]

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
                    if( new Date(dateAct).getTime() < new Date(aujourdhui).getTime() ){
                        estPasse = true
                    }

                    var projetDepasse = false
                    if(new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()  && new Date(dateAct).getTime() <new Date(aujourdhui).getTime() && jalon.etat != 2){
                        projetDepasse = true
                    }

                    var nomClasse = "jal" + jalon.id_jalon

                    return (
                        <>

                            <span className={isBetween ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estDebut === true ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estFin === true ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal">
                                <div className="d-flex justify-content-center"> <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}} size="lg" className={projetDepasse ? "mt-3" : "d-none"} /> </div>

                            </span>
                            <span className="event" className={jalon.charge == 1 && isBetween ? `event jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>

                        </>
                    )

                })}

            </td>
            <td className={ new Date(aujourdhui).getTime() == new Date(dateDuCalendrier.Saturday[props.index]).getTime() ? "day today" : "day "}
                onClick={ () => {props.setDateAjout(dateDuCalendrier.Saturday[props.index])}} data-bs-toggle="modal" data-bs-target="#ajoutModal">
                <span className="number"> {calendrier.Saturday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Saturday[props.index]

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
                    if( new Date(dateAct).getTime() < new Date(aujourdhui).getTime() ){
                        estPasse = true
                    }

                    var projetDepasse = false
                    if(new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()  && new Date(dateAct).getTime() < new Date(aujourdhui).getTime() && jalon.etat != 2){
                        projetDepasse = true
                    }

                    var nomClasse = "jal" + jalon.id_jalon

                    return (
                        <>

                            <span className={isBetween ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estDebut === true ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estFin === true ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal">
                                <div className="d-flex justify-content-center"> <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}} size="lg" className={projetDepasse === true ? "mt-3" : "d-none"} /> </div>

                            </span>
                            <span className="event" className={jalon.charge == 1 && isBetween ? `event jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>

                        </>
                    )

                })}

            </td>
            <td className={ new Date(aujourdhui).getTime() == new Date(dateDuCalendrier.Sunday[props.index]).getTime() ? "day today" : "day "}
                onClick={ () => {props.setDateAjout(dateDuCalendrier.Sunday[props.index])}} data-bs-toggle="modal" data-bs-target="#ajoutModal">
                    <span className="number"> {calendrier.Sunday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Sunday[props.index]

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
                    if( new Date(dateAct).getTime() < new Date(aujourdhui).getTime() ){
                        estPasse = true
                    }

                    var projetDepasse = false
                    if(new Date(dateAct).getTime() === new Date(dateFinJalon).getTime()  && new Date(dateAct).getTime() <new Date(aujourdhui).getTime() && jalon.etat != 2){
                        projetDepasse = true
                    }

                    var nomClasse = "jal" + jalon.id_jalon

                    return (
                        <>

                            <span className={isBetween ? `event event-multiday jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estDebut === true ? `event event-multiday-start eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"

                            ></span>
                            <span className={estFin === true ? `event event-multiday-finish eventclass jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease", backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal">
                                <div className="d-flex justify-content-center"> <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}} size="lg" className={projetDepasse ? "mt-3" : "d-none"} /> </div>

                            </span>
                            <span className="event" className={jalon.charge == 1 && isBetween ? `event jal-${jalon.id_jalon}` : "d-none"}
                                  onMouseOver={() => handleMouseOver(jalon.id_jalon)}
                                  onMouseOut={() => handleMouseOut(jalon.id_jalon)}
                                  style={{ transition: "box-shadow 0.3s ease",backgroundColor: estPasse ? `${jalon.couleur}80` :  jalon.couleur}}

                                  onClick={ () => {props.setJalonModif(jalon.id_jalon)}}
                                  data-bs-toggle="modal" data-bs-target="#modifModal"
                            ></span>

                        </>
                    )

                })}

            </td>
        </tr>

        </>
    )

}


function getDaysinCalendars(year, month) {

    // Initialisation des tableaux pour chaque jour de la semaine
    const daysOfWeek = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    };

    // Récupérer le nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Récupérer le jour de la semaine du premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
    let firstDayOfWeek = new Date(year, month, 1).getDay();

    // Ajuster pour que la semaine commence par lundi
    if (firstDayOfWeek === 0) {
        firstDayOfWeek = 7;
    }

    // Fonction pour mapper le jour (1 = Lundi) aux jours de la semaine
    const mapDayToWeek = (day) => {
        switch (day) {
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            case 7: return "Sunday";
            default: return null;
        }
    };

    // Fonction pour formater les dates au format "yyyy-mm-dd"
    const formatDate = (year, month, day) => {
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month + 1).padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    // Ajouter les jours du mois précédent s'il ne commence pas un Lundi
    if (firstDayOfWeek !== 1) {
        let previousMonthDays = new Date(year, month, 0).getDate(); // Dernier jour du mois précédent
        for (let i = firstDayOfWeek - 1; i >= 1; i--) {
            const dayOfWeek = mapDayToWeek(i);
            // Ajouter les jours du mois précédent avec le format "yyyy-mm-dd"
            daysOfWeek[dayOfWeek].unshift(formatDate(year, month - 1, previousMonthDays));
            previousMonthDays--; // Décrémenter après utilisation
        }
    }

    // Ajouter les jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = mapDayToWeek(new Date(year, month, day).getDay() || 7);
        daysOfWeek[dayOfWeek].push(formatDate(year, month, day));
    }

    // Compléter avec les jours du mois suivant si nécessaire pour remplir jusqu'à 6 lignes complètes
    const totalDays = Object.values(daysOfWeek).reduce((acc, days) => acc + days.length, 0);
    const remainingDays = 42 - totalDays;

    if (remainingDays > 0) {
        for (let i = 1; i <= remainingDays; i++) {
            const dayOfWeek = mapDayToWeek(new Date(year, month + 1, i).getDay() || 7);
            daysOfWeek[dayOfWeek].push(formatDate(year, month + 1, i));
        }
    }

    return daysOfWeek;
}




export default Semaine;