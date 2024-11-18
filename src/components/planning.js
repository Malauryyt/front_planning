import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getJalons} from '../model/jalon.js'
import Semaine from "./semaineJalon";


function Planning(props) {

    const [error, setError] = useState({});
    const [calendrier, setCalendrier] = useState({});
    const[dateDuCalendrier, setDateDuCalendrier ] = useState({});
    const [jalons, setJalon] = useState([]);


    useEffect( ()=>{
        setCalendrier(getCalendarDays(2024, 10)); // Génère les jours du mois
        console.log("mise à jour de mon calendrier")

    }, [])

    // récupération de mes jalons selon le projets choisis
    useEffect( ()=>{

        console.log("mise à jour de mes jalons ")
        getJalonProjet()

    }, [props.projetEnCours])


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
                    console.log(data)
                    setJalon(data) ;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }


    }

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

                <table>
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
                                    <Semaine calendrier={calendrier} index={index}/>

                                </>


                            )
                        }

                    )}
                    <tr>
                        <td className="day"><span className="number">31</span></td>
                        <td className="day"><span className="number">1</span><span className="event"></span><span
                            className="event"></span></td>
                        <td className="day"><span className="number">2</span></td>
                        <td className="day"><span className="number">3</span><span
                            className="event event-multiday-start"></span></td>
                        <td className="day"><span className="number">4</span>
                            <span className="event event-multiday"></span>
                            <span className="event event-multiday-start eventclass" style={{ backgroundColor: '#5a9ab2' }} ></span>
                            <span className="event" style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </td>
                        <td className="day"><span className="number">5</span><span
                            className="event event-multiday-finish"></span>
                            <span className="event event-multiday eventclass"
                                                                                 style={{ backgroundColor: '#5a9ab2' }}></span>
                        </td>
                        <td className="day"><span className="number">6</span><span className="event event-ghost"></span><span
                            className="event event-multiday-finish eventclass" style={{ backgroundColor: '#5a9ab2' }}></span></td>
                    </tr>
                    <tr>
                        <td className="day"><span className="number">7</span></td>
                        <td className="day"><span className="number">8</span><span className="event"></span></td>
                        <td className="day"><span className="number">9</span></td>
                        <td className="day"><span className="number">10</span></td>
                        <td className="day"><span className="number">11</span></td>
                        <td className="day"><span className="number">12</span></td>
                        <td className="day"><span className="number">13</span></td>
                    </tr>
                    <tr>
                        <td className="day"><span className="number">14</span></td>
                        <td className="day"><span className="number">15</span></td>
                        <td className="day"><span className="number">16</span><span className="event"></span></td>
                        <td className="day"><span className="number">17</span><span className="event"></span></td>
                        <td className="day"><span className="number">18</span></td>
                        <td className="day"><span className="number">19</span></td>
                        <td className="day"><span className="number">20</span></td>
                    </tr>
                    <tr>
                        <td className="day"><span className="number">21</span></td>
                        <td className="day"><span className="number">22</span></td>
                        <td className="day"><span className="number">23</span></td>
                        <td className="day"><span className="number">24</span></td>
                        <td className="day"><span className="number">25</span></td>
                        <td className="day"><span className="number">26</span></td>
                        <td className="day"><span className="number">27</span><span className="event event-multiday-start"
                                                                                    style={{ backgroundColor: '#5a9ab2' }}></span></td>
                    </tr>
                    <tr>
                        <td className="day"><span className="number">28</span><span className="event event-multiday"
                                                                                    style={{ backgroundColor: '#5a9ab2' }}></span></td>
                        <td className="day today"><span className="number">29</span><span
                            className="event event-multiday-finish" style={{ backgroundColor: '#5a9ab2' }}></span></td>
                        <td className="day"><span className="number">30</span></td>
                        <td className="day"><span className="number">1</span></td>
                        <td className="day"><span className="number">2</span></td>
                        <td className="day"><span className="number">3</span></td>
                        <td className="day"><span className="number">4</span></td>
                    </tr>
                    <tr>
                        <td className="day"><span className="number">5</span></td>
                        <td className="day"><span className="number">6</span><span className="event"></span></td>
                        <td className="day"><span className="number">7</span></td>
                        <td className="day"><span className="number">8</span></td>
                        <td className="day"><span className="number">9</span></td>
                        <td className="day"><span className="number">10</span></td>
                        <td className="day"><span className="number">11</span></td>
                    </tr>
                </table>
            </div>

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
    // Si `firstDayOfWeek` est `0` (Dimanche), on le convertit en `7` pour qu'il devienne après `Lundi` = 1
    if (firstDayOfWeek === 0) {
        firstDayOfWeek = 7;
    }

    // Fonction pour mapper le jour (1 = Lundi) aux jours de la semaine
    const mapDayToWeek = (day) => {
        switch (day) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
            default:
                return null;
        }
    };

    // Ajouter les jours du mois précédent s'il ne commence pas un Lundi
    if (firstDayOfWeek !== 1) {
        const previousMonthDays = new Date(year, month, 0).getDate(); // Dernier jour du mois précédent
        for (let i = firstDayOfWeek - 1; i >= 1; i--) {
            const dayOfWeek = mapDayToWeek(i);
            daysOfWeek[dayOfWeek].unshift(previousMonthDays - (firstDayOfWeek - 1) + (i - 1));
        }
    }

    // Ajouter les jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = mapDayToWeek(new Date(year, month, day).getDay() || 7); // `getDay()` renvoie 0 pour dimanche, on le remplace par 7
        daysOfWeek[dayOfWeek].push(day);
    }

    // Compléter avec les jours du mois suivant si nécessaire pour remplir jusqu'à 6 lignes complètes
    const totalDays = Object.values(daysOfWeek).reduce((acc, days) => acc + days.length, 0);
    const remainingDays = 42 - totalDays; // Pour remplir un tableau complet de 6 semaines (42 cases)

    if (remainingDays > 0) {
        for (let i = 1; i <= remainingDays; i++) {
            const dayOfWeek = mapDayToWeek(new Date(year, month + 1, i).getDay() || 7); // `getDay()` renvoie 0 pour dimanche, on le remplace par 7
            daysOfWeek[dayOfWeek].push(i);
        }
    }

    return daysOfWeek;
}


export default Planning;