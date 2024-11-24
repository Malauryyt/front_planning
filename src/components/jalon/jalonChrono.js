import React, { useState, useEffect } from 'react';
import {getJalonById, getJalons} from "../../model/jalon";
import Semaine from "../planning/semaineJalon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getTachesByJalon} from "../../model/tache";


export function JalonChrono(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [jalons, setJalons] = useState([]);
    const [error, setError] = useState([]);

    // récupération de mes jalons selon le projets choisis
    useEffect( ()=>{
        getJalonProjet()

    }, [props.projetEnCours])
    useEffect( ()=>{
        getJalonProjet()

    }, [])

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

    const setCouleurJalon = () => {
        const colors = [];
        jalons.forEach((jalon) => {
            colors.push(jalon.couleur);
        });


        document.documentElement.style.setProperty('--color', colors.join(','));
    }


    return (<>

            <div className="jalonRep">

                <section id="timeline">
                    <h1>Jalons</h1>
                    <p className="leader">All cards must be the same height and width for space calculations on large
                        screens.</p>
                    <div className="demo-card-wrapper">

                        {jalons.length > 0 &&
                            jalons.map((jalon, cpt) => {
                                // Affiche uniquement si cpt est pair
                                const ispair = cpt % 2;
                                if (cpt % 2 === 0) {
                                    return (
                                        <>

                                            <div className={`demo-card demo-card--step${cpt + 1}`}>
                                                <div className="head">
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
                                                <div className="body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt
                                                        doloribus consequatur, laudantium odio dolorum laboriosam.</p>
                                                    <img src="http://placehold.it/1000x500" alt="Graphic"></img>
                                                </div>
                                            </div>
                                        </>
                                    );
                                }
                                else{
                                    return (
                                        <>

                                            <div className={`demo-card demo-card--step${cpt + 1}`}>
                                                <div className="head">

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
                                                <div className="body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt
                                                        doloribus consequatur, laudantium odio dolorum laboriosam.</p>
                                                    <img src="http://placehold.it/1000x500" alt="Graphic"></img>
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

        </>
    );
}
