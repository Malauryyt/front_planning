import React, { useState, useEffect } from 'react';
import {getJalonById, getJalons} from "../../model/jalon";
import Semaine from "../planning/semaineJalon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getTachesByJalon} from "../../model/tache";
import {Estimation} from "./estimation";
import JalonCrud from "../planning/jalonCRUD";
import {useNavigate} from "react-router-dom";


export function JalonChrono(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [jalons, setJalons] = useState([]);
    const [jalonModif, setJalonModif] = useState([]);
    const [mettreAJour, setMettreAJour] = useState(true);
    const [error, setError] = useState([]);

    // récupération de mes jalons selon le projets choisis
    useEffect( ()=>{
        getJalonProjet()

    }, [props.projetEnCours])
    useEffect( ()=>{
        getJalonProjet()
    }, [])
    useEffect( ()=>{
        getJalonProjet()

    }, [mettreAJour])
    useEffect( ()=>{
        const colors = getComputedStyle(document.documentElement)
            .getPropertyValue('--colors')
            .trim()
            .split(',');

        // Appliquer dynamiquement les couleurs à chaque carte
        document.querySelectorAll('.demo-card').forEach((card, index) => {
            const color = colors[index % colors.length].trim();
            card.style.setProperty('--current-color', color);
        });

        const mesCouleurs = [];
        jalons.forEach((jalon) => {
            mesCouleurs.push(jalon.couleur); // Collecte les couleurs des jalons
        });

        // Passe les couleurs comme chaîne de caractères, séparées par des virgules
        document.documentElement.style.setProperty('--colors', mesCouleurs.join(','));
    }, [jalons])


    //récupération des jalons
    const getJalonProjet = async () => {

        if(props.projetEnCours != 0 ){

            try {
                const data = await getJalons(props.projetEnCours);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setError("Impossible de récupérer les projets" )
                }
                else{
                    setJalons(data) ;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }else{
            setJalons([]) ;
        }

    }

    // **********************************************************************
    // ne absolument pas toucher ca marche je ne sais pas comment

        const colors = getComputedStyle(document.documentElement)
            .getPropertyValue('--colors')
            .trim()
            .split(',');

        // Appliquer dynamiquement les couleurs à chaque carte
        document.querySelectorAll('.demo-card').forEach((card, index) => {
            const color = colors[index % colors.length].trim();
            card.style.setProperty('--current-color', color);
        });

        const mesCouleurs = [];
        jalons.forEach((jalon) => {
            mesCouleurs.push(jalon.couleur); // Collecte les couleurs des jalons
        });

        // Passe les couleurs comme chaîne de caractères, séparées par des virgules
        document.documentElement.style.setProperty('--colors', mesCouleurs.join(','));


    // **********************************************************************

    // *********************************************************************************
    // détails de jalon
    // *********************************************************************************
    const navigate = useNavigate();
    const redirectToAboutPage = (id_jalon) => {
        localStorage.setItem('idJalon', id_jalon);
        navigate('/InfoGlobalJalon');
    };


    return (<>

            <div className="jalonRep">

                <section id="timeline">
                    <h1>Jalons</h1>
                    <p className="leader">Pour ajouter des jalons, rendez-vous sur la page Planning. Cela sera plus simple pour vous.</p>
                    <div className="demo-card-wrapper">

                        {jalons.length > 0 &&
                            jalons.map((jalon, cpt) => {

                                var dateFinJalon =   jalon.date_liv_theorique;
                                const today = new Date();

                                var projetDepasse = false
                                if( new Date(today).getTime()  > new Date(dateFinJalon).getTime() ){
                                    projetDepasse = true
                                }

                                if (cpt % 2 === 0) {
                                    return (
                                        <>

                                            <div className={`demo-card demo-card--step${cpt + 1} test `}
                                                 onMouseOver={(e) => {
                                                     e.currentTarget.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'; // Transition pour agrandir et ombre
                                                     e.currentTarget.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.5)'; // Ajoute l'ombre
                                                 }}
                                                 onMouseOut={(e) => {
                                                     e.currentTarget.style.boxShadow = 'none'; // Enlève l'ombre
                                                 }}
                                                 style={{backgroundColor : jalon.couleur}}
                                                    >
                                                <div className="head pointer"
                                                     onClick={ () => {setJalonModif(jalon.id_jalon)}}
                                                     data-bs-toggle="modal" data-bs-target="#modifModal"
                                                >
                                                    <div className="number-box">
                                                        <span>{cpt + 1}</span>
                                                    </div>
                                                    <h2
                                                    style={{width: "80%"}}>
                                                        <div className="d-flex justify-content-between m-2">
                                                            <span className="small">{jalon.date_com_theorique} </span>
                                                            <span className="small"> {jalon.date_liv_theorique}</span>
                                                        </div>
                                                        {jalon.libelle}
                                                    </h2>
                                                </div>
                                                <div className="body pointer"
                                                onClick={() =>{ redirectToAboutPage()}}>

                                                    <div className={jalon.etat === 0 ? "d-flex justify-content-between" : "d-none"}>
                                                        <p >Etat : En attente <FontAwesomeIcon icon="fa-solid fa-clock" style={{color: "#808080",}} /></p>
                                                        <p className={projetDepasse == true ? "" : "d-none"} > <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}}  /> </p>
                                                    </div>
                                                    <div className={jalon.etat === 1 ? "d-flex justify-content-between" : "d-none"}>
                                                        <p className={jalon.etat === 1 ? "" : "d-none"} >Etat : En cours <FontAwesomeIcon icon="fa-solid fa-calendar-check" style={{color: "#FFD43B",}} /></p>
                                                        <p className={projetDepasse == true ? "" : "d-none"} > <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}}  /> </p>
                                                    </div>
                                                    <div className={jalon.etat === 2 ? "d-flex justify-content-between" : "d-none"}>
                                                        <p className={jalon.etat === 2 ? "" : "d-none"} >Etat : Terminé <FontAwesomeIcon icon="fa-regular fa-circle-check" style={{color: "#00ff40",}} /></p>
                                                    </div>




                                                    <Estimation jalon={jalon} projetEnCours={props.projetEnCours}/>

                                                </div>
                                            </div>
                                        </>
                                    );
                                }
                                else {
                                    return (
                                        <>

                                            <div className={`demo-card demo-card--step${cpt + 1} test `}
                                                 onMouseOver={(e) => {
                                                     e.currentTarget.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'; // Transition pour agrandir et ombre
                                                     e.currentTarget.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.5)'; // Ajoute l'ombre
                                                 }}
                                                 onMouseOut={(e) => {
                                                     e.currentTarget.style.boxShadow = 'none'; // Enlève l'ombre
                                                 }}>
                                                <div className="head pointer"
                                                     onClick={ () => {setJalonModif(jalon.id_jalon)}}
                                                     data-bs-toggle="modal" data-bs-target="#modifModal">
                                                    <div className="number-box">
                                                        <span>{cpt + 1}</span>
                                                    </div>
                                                    <h2
                                                        style={{width: "80%"}}>
                                                        <div className="d-flex justify-content-between m-2">
                                                            <span className="small">{jalon.date_com_theorique} </span>
                                                            <span className="small"> {jalon.date_liv_theorique}</span>
                                                        </div>
                                                        {jalon.libelle}
                                                    </h2>
                                                </div>
                                                <div className="body pointer"
                                                     onClick={() =>{ redirectToAboutPage()}}>

                                                    <div className={jalon.etat === 0 ? "d-flex justify-content-between" : "d-none"}>
                                                        <p >Etat : En attente <FontAwesomeIcon icon="fa-solid fa-clock" style={{color: "#808080",}} /></p>
                                                        <p className={projetDepasse == true ? "" : "d-none"} > <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}}  /> </p>
                                                    </div>
                                                    <div className={jalon.etat === 1 ? "d-flex justify-content-between" : "d-none"}>
                                                        <p className={jalon.etat === 1 ? "" : "d-none"} >Etat : En cours <FontAwesomeIcon icon="fa-solid fa-calendar-check" style={{color: "#FFD43B",}} /></p>
                                                        <p className={projetDepasse == true ? "" : "d-none"} > <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}}  /> </p>
                                                    </div>
                                                    <div className={jalon.etat === 2 ? "d-flex justify-content-between" : "d-none"}>
                                                        <p className={jalon.etat === 2 ? "" : "d-none"} >Etat : Terminé <FontAwesomeIcon icon="fa-regular fa-circle-check" style={{color: "#00ff40",}} /></p>
                                                    </div>


                                                    <Estimation jalon={jalon} projetEnCours={props.projetEnCours}/>


                                                </div>
                                            </div>
                                        </>
                                    );
                                }

                            })

                        }


                    </div>
                </section>
            </div>

            <JalonCrud setDateAjout={""} dateAjout={""}  projetEnCours={props.projetEnCours}
                       jalons={jalons} setMettreAJour={setMettreAJour} mettreAJour={mettreAJour}
                       setJalonModif={setJalonModif} jalonModif={jalonModif}/>

        </>
    );
}
