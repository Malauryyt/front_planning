import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getJalons} from '../model/jalon.js'
import Semaine from "./semaineJalon";
import JalonCrud from "./jalonCRUD"


function Planning(props) {
    const [dateAjout, setDateAjout] = useState("");
    const[mettreAJour, setMettreAJour] = useState(true)

    const today = new Date();
    const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(today);

    const [error, setError] = useState({});
    const [calendrier, setCalendrier] = useState({});

    const[dateDuCalendrier, setDateDuCalendrier ] = useState({});

    const [jalons, setJalon] = useState([]);
    const [mois, setMois] = useState(today.getMonth() );
    const [annee, setAnnee] = useState(today.getFullYear());
    const[nomMois, setNomMois] = useState(monthName);

    //modification jalon
    const [jalonModif, setJalonModif] = useState("")


    useEffect( ()=>{
        console.log("Je regarde mon calendrier pour le " ,  mois)
        setCalendrier(getCalendarDays(annee, mois )); // Génère les jours du mois

        const date = new Date(new Date().getFullYear(), mois);

        setNomMois(Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date) ) ;
        console.log("mise à jour de mon calendrier")
        console.log(mois)


    }, [annee, mois])

    // récupération de mes jalons selon le projets choisis
    useEffect( ()=>{

        console.log("mise à jour de mes jalons ")
        getJalonProjet()

    }, [props.projetEnCours, mettreAJour])


    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
                    console.log("mes Jalons :", data)
                    setJalon(data) ;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }


    }

    const moisAnte = () => {
        console.log("je supprime un mois")
        if (mois === 0) {
            // Si on est en Janvier, on passe à Décembre de l'année précédente
            setMois(11); // Décembre
            setAnnee(annee - 1);
        } else {
            // Sinon, on décrémente simplement le mois
            setMois(mois - 1);
        }
    };

    // Fonction pour aller au mois suivant (Bonus)
    const moisPrece = () => {
        console.log("j'ajoute un mois")
        if (mois === 11 ){
            // Si on est en Décembre, on passe à Janvier de l'année suivante
            setMois(0); // Janvier
            setAnnee(annee + 1);
        } else {
            // Sinon, on incrémente simplement le mois
            setMois(mois + 1);
        }
    };


    return (<>


            {Object.entries(dateDuCalendrier).length > 0 && Array.from({ length: 6 }).map((_, index) => {

                    return (

                        <>
                            <tr>
                                <td >
                                    <span className="number"> {Object.values(dateDuCalendrier.Monday)[index]} </span>
                                </td>
                                <td >
                                    <span className="number"> {Object.values(dateDuCalendrier.Tuesday)[index]}</span><span className="event"></span>
                                </td>
                                <td >
                                    <span className="number"> {Object.values(dateDuCalendrier.Thursday)[index]}</span>
                                </td>
                                <td >
                                    <span className="number"> {Object.values(dateDuCalendrier.Wednesday)[index]}</span>
                                </td>
                                <td  >
                                    <span className="number"> {Object.values(dateDuCalendrier.Friday)[index]}</span>
                                </td>
                                <td >
                                    <span className="number"> {Object.values(dateDuCalendrier.Saturday)[index]}</span>
                                </td>
                                <td >
                                    <span className="number"> {Object.values(dateDuCalendrier.Sunday)[index]}</span>
                                </td>
                            </tr>

                        </>


                    )
                }

            )}

            <div className="planning">

                <div className="d-flex justify-content-between">
                    <div >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={moisAnte} className="pointer"/>
                    </div>
                    <div >
                        <h3> {nomMois} - {annee}  </h3>
                    </div>
                    <div > <FontAwesomeIcon icon="fa-solid fa-arrow-right" onClick={moisPrece} className="pointer"/> </div>
                </div>

                <table className="">
                    <tr>
                        <th className="day-name">Lundi</th>
                        <th className="day-name">Mardi</th>
                        <th className="day-name">Mercredi</th>
                        <th className="day-name">Jeudi</th>
                        <th className="day-name">Vendredi</th>
                        <th className="day-name">Samedi</th>
                        <th className="day-name">Dimanche</th>
                    </tr>
                    {Object.entries(calendrier).length > 0 && Array.from({ length: 6 }).map((_, index) => {

                            return (
                                <>
                                    <Semaine calendrier={calendrier} index={index} jalons={jalons} mois={mois} annee={annee} setDateAjout={setDateAjout} setJalonModif={setJalonModif} jalonModif={jalonModif}/>
                                </>
                            )
                        }

                    )}
                </table>
                <div className="d-flex justify-content-around">
                {jalons.length > 0 && jalons.map((jalon, cpt) => {
                    return (<>
                            <div className="d-flex "><div className="legende" style={{ backgroundColor: jalon.couleur }}> </div> {jalon.libelle} </div>

                        </>
                            )


                } )}
                </div>
            </div>

            <JalonCrud setDateAjout={setDateAjout} dateAjout={dateAjout} projetEnCours={props.projetEnCours}
                       jalons={jalons} setMettreAJour={setMettreAJour} mettreAJour={mettreAJour}
                       setJalonModif={setJalonModif} jalonModif={jalonModif}/>

        </>
    )

}

function getCalendarDays(year, month) {
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

    // Ajouter les jours du mois précédent s'il ne commence pas un Lundi
    if (firstDayOfWeek !== 1) {
        let previousMonthDays = new Date(year, month, 0).getDate(); // Dernier jour du mois précédent
        for (let i = firstDayOfWeek - 1; i >= 1; i--) {
            const dayOfWeek = mapDayToWeek(i);
            // Ajouter les jours du mois précédent avec padding "01", "02", etc.
            daysOfWeek[dayOfWeek].unshift(String(previousMonthDays).padStart(2, '0'));
            previousMonthDays--; // Décrémenter après utilisation
        }
    }

    // Ajouter les jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = mapDayToWeek(new Date(year, month, day).getDay() || 7);
        daysOfWeek[dayOfWeek].push(String(day).padStart(2, '0'));
    }

    // Compléter avec les jours du mois suivant si nécessaire pour remplir jusqu'à 6 lignes complètes
    const totalDays = Object.values(daysOfWeek).reduce((acc, days) => acc + days.length, 0);
    const remainingDays = 42 - totalDays;

    if (remainingDays > 0) {
        for (let i = 1; i <= remainingDays; i++) {
            const dayOfWeek = mapDayToWeek(new Date(year, month + 1, i).getDay() || 7);
            daysOfWeek[dayOfWeek].push(String(i).padStart(2, '0'));
        }
    }

    return daysOfWeek;
}





export default Planning;