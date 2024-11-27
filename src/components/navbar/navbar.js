import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getMine, getOneprojet, getProjetsSuivit} from '../../model/projet.js'

function Navbar(props) {

    var user
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }
    else{
        user = ""
    }

    const [error , setError] = useState("");
    const [projets, setProjets] = useState([]);
    const [projetSuivi, setProjetSuivi] = useState([]);
    const[projetEncours, setProjetEncours] = useState("Tous les projets");

    // liste de projet dans la navbar
    useEffect(() => {
        getMineProject();
        getProjetsSuivitProject();

    }, [user.id_user]);

    // titre de mon projet en cours
    useEffect( ()=> {

        if( props.projetEnCours != 0){
            changeNavBarProjet(props.projetEnCours)
        }
        else{
            setProjetEncours("Tous les projets");
        }

    }, [props.projetEnCours]);

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

    const changeProjet = async(id) =>{
        props.setProjetEnCours(id);
    }

    const changeNavBarProjet = async(id) =>{
        try{
            const data = await getOneprojet(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de récupérer les projets" )
            }
            else{
                setProjetEncours(data.libelle);
            }

        }
        catch{
            console.error("Erreur lors de la récupération d'un projet :", error);
        }
    };


    return (<>

            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">AppPlanning</a>
                    <FontAwesomeIcon icon="fa-regular fa-calendar-days" onClick={getMineProject}/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 px-3">
                            <li className="nav-item">
                                <a className="nav-link" href="/planning">Plannings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/projet">Projets</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/detailPLanning">Jalons</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Exigences</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Tache">Taches</a>
                            </li>

                            <li className="projetEncours nav-item dropdown ">
                                <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {projetEncours}
                                </a>

                                <ul className="dropdown-menu">
                                    <li ><a className="dropdown-item pointer"  onClick={() => { changeProjet(0) }}>Tous les projets </a></li>
                                    {projets.length > 0 && projets.map((projet, cpt) => {
                                        return (
                                            <li ><a className="dropdown-item pointer"  onClick={() => { changeProjet(projet.id_projet) }}>{projet.libelle} - {projet.trigramme}</a></li>
                                        )
                                    })}
                                    {projetSuivi.length > 0 && projetSuivi.map((projet, cpt) => {
                                        return (
                                            <li ><a className="dropdown-item pointer"  onClick={() => { changeProjet(projet.id_projet) }}>{projet.libelle} - {projet.trigramme}</a></li>
                                        )
                                    })}

                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><a className="dropdown-item" >Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <FontAwesomeIcon icon="fa-solid fa-circle-user" size="2xl" />
                    </div>
                </div>
            </nav>

        </>
    )

}

export default Navbar;