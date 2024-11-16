import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getMine, getOneprojet, getProjetsSuivit} from '../model/projet.js'
import {useNavigate} from "react-router-dom";

function Projets(props) {

    var user
    console.log("mon id projet : " , props.projetEnCours)
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }
    else{
        user = ""
    }

    const [error , setError] = useState("");
    const [projets, setProjets] = useState([]);
    const [projetSuivi, setProjetSuivi] = useState([]);

    // liste de projet pour le composant
    useEffect(() => {

        getMineProject();
        getProjetsSuivitProject();

    }, [user.id_user]);


    const getMineProject = async () => {

        try {
            const data = await getMine(user.id_user);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de récupérer les projets" )
            }
            else{
                setProjets(data) ;
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
        }

    }
    const getProjetsSuivitProject = async () => {

        try {
            const data = await getProjetsSuivit(user.id_user);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de récupérer les projets" )
            }
            else{
                setProjetSuivi(data) ;
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des projets suivit :", error);
        }

    }

    const navigate = useNavigate();

    // redirection sur la bonne page
    const getDetails = async (id_projet) =>{
            props.setProjetEnCours(id_projet)
            navigate('/projet');
    }

    return (<>

            <div className="accordion" id="accordionExample">
                <h2 className={projets.length > 0 ? "titre" : "d-none"}> Mes projets </h2>
                {projets.length > 0 && projets.map((projet, cpt) => {
                    return (
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target={"#projet" + projet.id_projet} aria-expanded="false" aria-controls={"projet" + projet.id_projet}>
                                    {projet.trigramme} - {projet.libelle}
                                </button>
                            </h2>
                            <div id={"projet" + projet.id_projet} className="accordion-collapse collapse" data-bs-parent={"#projet" + projet.id_projet}>
                                <div className="accordion-body">
                                    <div className="d-flex">
                                        <div>
                                            {projet.nom}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        On met des trucs la blabla
                                    </div>
                                    <div className="d-flex flex-row-reverse">
                                        <button type="button" className="btn btn-light" onClick={() => { getDetails(projet.id_projet) }}>Détails</button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="accordion mt-4" id="accordionExample">
                <h2 className={projetSuivi.length > 0 ? "titre" : "d-none"}> Mes projets suivis</h2>
                {projetSuivi.length > 0 && projetSuivi.map((projet, cpt) => {
                    return (
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target={"#projet" + projet.id_projet} aria-expanded="false" aria-controls={"projet" + projet.id_projet}>
                                    {projet.trigramme} - {projet.libelle}
                                </button>
                            </h2>
                            <div id={"projet" + projet.id_projet} className="accordion-collapse collapse" data-bs-parent={"#projet" + projet.id_projet}>
                                <div className="accordion-body">
                                    <div className="d-flex">
                                    <div>
                                        {projet.nom}
                                    </div>
                                    </div>
                                    <div className="mt-3">
                                        On met des trucs la blabla
                                    </div>
                                    <div className="d-flex flex-row-reverse">
                                        <button type="button" className="btn btn-light" onClick={() => { getDetails(projet.id_projet) }}>Détails</button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>





        </>
    )

}

export default Projets;