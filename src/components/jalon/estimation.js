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
    const [dureeRestante, setDureeRestante] = useState(0);
    const [dateLivCalculee, setDateLivCalculee] = useState("");

    // récupération de mes jalons selon le projets choisis

    useEffect( () =>{
        setMonJalon(props.jalon)
    }, [])
    useEffect( () =>{
        setMonJalon(props.jalon)
        getMesTaches(props.jalon.id_jalon);
    }, [props.jalon, props.maj])

    useEffect( () =>{
        getMesTaches(monJalon.id_jalon);
    }, [monJalon, props.maj])

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

            let avanJalon = (contri / dureeTot) * 100
            avanJalon = parseFloat(avanJalon.toFixed(2));
            setTauxAvJalon(avanJalon)

        }else{
            setTauxAvJalon(0)
        }

    }

    // Calcule du temps minimum pour effectuer les taches
    useEffect(() => {
        if( mesTaches.length > 0 ) {
            const duree = calculeDureeMini(mesTaches);
            const dureeRestante = calculeDureeRestante(mesTaches);
            const dateFinJalon = calculerDateFinJalonAvecDependencies(mesTaches);
            setDureeMini(duree);
            setDureeRestante(dureeRestante);
            setDateLivCalculee(dateFinJalon);
        }
        else{
            setDureeMini(0);
        }

    }, [mesTaches]);

    return (<>

            <p> Avancement : </p>
            <div className="progress" role="progressbar" aria-label="Success example"
                 aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-secondary" style={{width: `${tauxAvJalon}%`}}>{tauxAvJalon}%</div>
            </div>
            <p className="mt-3">Durée global : {monJalon.charge} jours  </p>
            <div className={props.pageInfo === undefined ? "d-flex" : "d-none"}>
                <p>Durée minimale : {dureeMini} jours </p>  <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}}  className={monJalon.charge < dureeMini ? "ms-3" : "d-none"}/>
            </div>
            <div className={props.pageInfo != undefined ? "d-flex" : "d-none"}>
                <div className="col-6">
                    <p>Durée minimale : {dureeMini} jours <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" beat style={{color: "#ff0000",}}  className={monJalon.charge < dureeMini ? "ms-3" : "d-none"}/></p>
                    <p> Durée restante du projet : {dureeRestante} jours</p>
                </div>
                <div className="col-6">
                    <p>Date de livraison théorique : {monJalon.date_liv_theorique}</p>
                    <p><strong> Date de livraison calculée : {dateLivCalculee}</strong></p>
                </div>
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

const calculeDureeRestante = (mesTaches) => {
    const dureesRestantes = {};

    const calculerDureeRestante = (id) => {
        // Si la durée restante de cette tâche a déjà été calculée, on la retourne
        if (dureesRestantes[id] !== undefined) {
            return dureesRestantes[id];
        }

        // Trouver la tâche correspondante dans le tableau
        const tache = mesTaches.find((tache) => tache.id === id);

        if (!tache) {
            throw new Error(`Tâche avec l'ID ${id} non trouvée`);
        }

        // Si la tâche n'a pas de dépendance (id_tache null), calculer son temps restant
        let chargeRestante = tache.charge;

        if (tache.statut === 100) {
            chargeRestante = 0; // Tâche terminée
        } else if (tache.statut > 0 && tache.statut < 100) {
            chargeRestante = tache.charge * (1 - tache.statut / 100); // Fraction de charge restante
        }

        if (tache.id_tache === null) {
            dureesRestantes[id] = chargeRestante;
            return chargeRestante;
        }

        // Si la tâche a une dépendance, on calcule la durée restante de la tâche dépendante
        const dureeDependanceRestante = calculerDureeRestante(tache.id_tache);

        // La durée restante totale est la durée restante de la dépendance + la charge restante de cette tâche
        dureesRestantes[id] = dureeDependanceRestante + chargeRestante;
        return dureesRestantes[id];
    };

    // Calculer les durées restantes pour toutes les tâches
    mesTaches.forEach((tache) => calculerDureeRestante(tache.id));

    // La durée restante totale du projet est la durée maximale parmi toutes les tâches
    return Math.max(...Object.values(dureesRestantes));
};

const calculerDateFinJalonAvecDependencies = (mesTaches) => {
    // Fonction pour ajouter un certain nombre de jours à une date
    const ajouterJours = (date, jours) => {
        const nouvelleDate = new Date(date);
        nouvelleDate.setDate(nouvelleDate.getDate() + jours);
        return nouvelleDate;
    };

    // Stocker les dates de fin calculées pour chaque tâche
    const datesDeFin = {};

    // Fonction récursive pour calculer la date de fin d'une tâche
    const calculerDateFinTache = (tache) => {
        // Si la date de fin pour cette tâche est déjà calculée, on la retourne
        if (datesDeFin[tache.id]) {
            return datesDeFin[tache.id];
        }

        // Déterminer la charge restante de la tâche
        const chargeRestante =
            tache.statut === 100
                ? 0
                : tache.statut === 50
                    ? tache.charge / 2
                    : tache.charge;

        // Date de début de la tâche : dateDemarrage si définie, sinon dateDebutTheorique
        let dateDebut = tache.dateDemarrage || tache.dateDebutTheorique;

        // Si la tâche a une dépendance, on calcule la date de fin de la tâche précédente
        if (tache.id_tache) {
            const tachePrecedente = mesTaches.find(
                (t) => t.id === tache.id_tache
            );
            if (!tachePrecedente) {
                throw new Error(
                    `Dépendance introuvable : tâche précédente avec ID ${tache.id_tache} non trouvée.`
                );
            }

            // Calculer la date de fin de la tâche précédente
            const dateFinPrecedente = calculerDateFinTache(tachePrecedente);

            // La tâche actuelle ne peut commencer qu'après la fin de la tâche précédente
            if (new Date(dateDebut) < dateFinPrecedente) {
                dateDebut = dateFinPrecedente;
            }
        }

        // Calculer la date de fin en ajoutant la charge restante à la date de début
        const dateFin = ajouterJours(dateDebut, chargeRestante);

        // Stocker la date de fin calculée
        datesDeFin[tache.id] = dateFin;

        return dateFin;
    };

    // Calculer les dates de fin pour toutes les tâches
    mesTaches.forEach((tache) => calculerDateFinTache(tache));

    // La date de fin théorique du jalon correspond à la date maximale parmi toutes les tâches
    const dateFinJalon = new Date(
        Math.max(...Object.values(datesDeFin).map((date) => new Date(date)))
    );

    return dateFinJalon.toISOString().split("T")[0]; // Retourne une date formatée YYYY-MM-DD
};
