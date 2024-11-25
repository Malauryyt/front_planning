import React, { useState, useEffect } from 'react';
import {getJalonById, getJalons} from "../../model/jalon";
import Semaine from "../planning/semaineJalon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getTachesByJalon} from "../../model/tache";


export function DetailJalon(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [jalons, setJalons] = useState([]);
    const [error, setError] = useState([]);
    const [idjalonEnCours, setIdJalonEnCours] = useState("");
    const [monJalon, setMonJalon] = useState([]);
    const [mesTaches, setMesTaches] = useState([]);
    const [tauxAvJalon, setTauxAvJalon] = useState(0);
    const [dureeMini, setDureeMini] = useState(0);

    // récupération de mes jalons selon le projets choisis
    useEffect( ()=>{
        getJalonProjet()
        setMonJalon([])
        setIdJalonEnCours("")

    }, [props.projetEnCours])
    useEffect( ()=>{
        getJalonProjet()

    }, [])


    // récuperation de l'id_jalon depuis la page planning
    useEffect(() => {
        const id_jalon =  localStorage.getItem('idJalon');
        if (id_jalon !== undefined) {
            setIdJalonEnCours(id_jalon)
        }
    }, []);

    useEffect( () =>{
         getUnJalon(idjalonEnCours);
         getMesTaches(idjalonEnCours);

    }, [idjalonEnCours])

    useEffect(() =>{
        getTauxAv()
    }, [mesTaches])


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

    // récupération du jalon en cours
    const getUnJalon = async (id_jalon) => {

        //if(props.jalonModif != "" ){
        if(id_jalon != "" && id_jalon != null){

            try {
                const data = await getJalonById(id_jalon);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                }
                else{
                    setMonJalon(data) ;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }
    }

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

    // calcul du taux d'avancement du jalon
    const getTauxAv = async () => {

        if( mesTaches.length > 0 ){
            // Contribution de la tache= duree × taux d’avancement
            var contri = 0;
            // Durée totale du projet
            var dureeTot =0;

            mesTaches.forEach((tache) => {
                contri += tache.charge * (tache.statut /100 )
                dureeTot += tache.charge
            });

            const avanJalon = (contri / dureeTot) * 100
            setTauxAvJalon(avanJalon)

        }else{
            setTauxAvJalon(0)
        }

    }

    // Calcule du temps minimum pour effectuer les taches
    useEffect(() => {


        const duree = calculeDureeMini(mesTaches);
        setDureeMini(duree);


    }, [mesTaches]);

    return (<>
                <div>
                    <ul className="nav nav-tabs">

                        {jalons.length > 0 && jalons.map((jalon, cpt) => {
                            return (
                                <li className="nav-item">
                                    <a className={parseInt(jalon.id_jalon, 10) === parseInt(idjalonEnCours, 10) ? "nav-link active" : "nav-link" }  aria-current="page"
                                       onClick={() =>{setIdJalonEnCours(jalon.id_jalon); localStorage.removeItem('idJalon');} }
                                      >{jalon.libelle} </a>
                                </li>
                            )
                        })}

                    </ul>
                </div>


                <div>

                    {monJalon.length > 0 && props.projetEnCours != 0 && (

                        <div className="container m-4">
                            <div className="d-flex ">

                                <div className="col-6 row">
                                    <label htmlFor="staticEmail" className="col-7 col-form-label">Date de commencement théorique :</label>
                                    <div className="col-4">
                                        <input type="date" className="form-control" readOnly id="exampleColorInput"
                                               value={monJalon[0].date_com_theorique}></input>
                                    </div>
                                </div>
                                <div className="col-6 row">
                                    <label htmlFor="staticEmail" className="col-7 col-form-label">Date de livraison théorique :</label>
                                    <div className="col-4">
                                        <input type="date" className="form-control" readOnly id="exampleColorInput"
                                               value={monJalon[0].date_liv_theorique}></input>
                                    </div>
                                </div>

                            </div>

                            <div className=" mt-5 d-flex">

                                <div className="col-6">

                                    <div className="col-12 row">
                                        <label htmlFor="staticEmail" className="col-4 col-form-label">Responsable : </label>
                                        <label htmlFor="staticEmail" className="col-4 col-form-label">{monJalon[0].nom} - {monJalon[0].trigramme} </label>
                                    </div>
                                    <div className="col-12 row">
                                        <label htmlFor="staticEmail" className="col-4 col-form-label">Durée :  </label>
                                        <label htmlFor="staticEmail" className="col-4 col-form-label">{monJalon[0].charge} jours</label>
                                    </div>
                                    <div className="col-12 row">
                                        <label htmlFor="staticEmail" className="col-4 col-form-label">Couleur : </label>
                                        <div className="col-4">
                                            <input type="color" className="form-control form-control-color" readOnly disabled
                                                   id="exampleColorInput"
                                                   value={monJalon[0].couleur}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-12 row">
                                        <label htmlFor="staticEmail" className="col-4 col-form-label">Etat : </label>
                                        <div className="col-4">

                                            <select className="form-select" aria-label="Default select example" disabled value={monJalon[0].etat}>
                                                <option value="0">A commencer</option>
                                                <option value="1">En cours</option>
                                                <option value="2">Terminé</option>
                                            </select>

                                        </div>
                                    </div>

                                </div>

                                <div className="col-6">

                                    <div className="col-12 row">
                                        <label htmlFor="staticEmail" className="col-form-label">Avancement :</label>
                                    </div>



                                    <div className="progress" role="progressbar" aria-label="Success example"
                                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-success" style={{width: `${tauxAvJalon}%`}}>{tauxAvJalon}%</div>
                                    </div>
                                    <div>
                                        Durée minimale du projet : {dureeMini}
                                    </div>

                                </div>

                            </div>

                        </div>
                    )}
                    {props.projetEnCours == 0 && (
                        <div>
                            Aucun projet sélectionné.
                        </div>
                    )}

                </div>


        </>
    );
}

const calculeDureeMini = (mesTaches) => {
    const durees = {};

    const calculerDuree = (id) => {
        // Si la durée de cette tâche a déjà été calculée, on la retourne
        if (durees[id] !== undefined) {
            return durees[id];
        }

        // Trouver la tâche correspondante dans le tableau
        const tache = mesTaches.find((tache) => tache.id === id);

        if (!tache) {
            throw new Error(`Tâche avec l'ID ${id} non trouvée`);
        }

        // Si la tâche n'a pas de dépendance (id_tache null), sa durée est sa charge
        if (tache.id_tache === null) {
            durees[id] = tache.charge;
            return tache.charge;
        }

        // Si la tâche a une dépendance, on calcule la durée de la tâche dépendante
        const dureeDependance = calculerDuree(tache.id_tache);

        // La durée totale est la durée de la dépendance + la charge de cette tâche
        durees[id] = dureeDependance + tache.charge;
        return durees[id];
    };

    // Calculer les durées minimales pour toutes les tâches
    mesTaches.forEach((tache) => calculerDuree(tache.id));

    // La durée minimale du projet est la durée maximale parmi toutes les tâches
    // c'est quoi les 3 petits points ???
    //Si tu n'utilises pas ..., ca cause une erreur, car Math.max n'accepte pas un tableau comme argument.
    //Le tableau [2, 4, 3] est "étalé" en valeurs distinctes : 2, 4, 3.
    // Cela permet à Math.max de recevoir ces valeurs comme arguments séparés, comme si on avait écrit Math.max(2, 4, 3).
    return Math.max(...Object.values(durees));
};