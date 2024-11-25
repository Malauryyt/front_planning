import React, { useState, useEffect } from 'react';
import {getJalonById, getJalons} from "../../model/jalon";
import Semaine from "../planning/semaineJalon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getTachesByJalon} from "../../model/tache";


export function Estimation(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }
    const [monJalon, setMonJalon] = useState([]);
    const [mesTaches, setMesTaches] = useState([]);
    const [tauxAvJalon, setTauxAvJalon] = useState(0);
    const [dureeMini, setDureeMini] = useState(0);

    // récupération de mes jalons selon le projets choisis

    useEffect( () =>{
        setMonJalon(props.jalon)
    }, [])
    useEffect( () =>{
        setMonJalon(props.jalon)
    }, [props.jalon])

    useEffect( () =>{
        getMesTaches(monJalon.id_jalon);
    }, [monJalon])

    useEffect(() =>{
        getTauxAv()
    }, [mesTaches])



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
        if( mesTaches.length > 0 ) {
            const duree = calculeDureeMini(mesTaches);
            setDureeMini(duree);
        }
        else{
            setDureeMini(0);
        }

    }, [mesTaches]);

    return (<>

            <p >Responsable : {monJalon.nom} - {monJalon.trigramme}</p>

            <p>sodijfgviodufhgv uzesf uhsifuhsd oqsiurdeu_s eyrd z_er ufàçzuràu zàe_rfys cxbxbchvj idufgh ç_eruft </p>

            <p> Avancement : </p>
            <div className="progress" role="progressbar" aria-label="Success example"
                 aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-secondary" style={{width: `${tauxAvJalon}%`}}>{tauxAvJalon}%</div>
            </div>
            <p className="mt-3">Durée global : {monJalon.charge} jours  </p>
            <div className="d-flex">
                <p>Durée minimale : {dureeMini} jours </p>  <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}}  className={monJalon.charge < dureeMini ? "ms-3" : "d-none"}/>
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