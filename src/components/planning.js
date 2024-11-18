import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Planning(props) {

    const [calendrier, setCalendrier] = useState({});
    const [aujourdhui, setaujourdhui] = useState({});


    useEffect( ()=>{
        setCalendrier(getCalendarDays(2024, 10)); // Génère les jours du mois
        console.log("mise à jour de mon calendrier")

    }, [])

    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    return (<>


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
                    <tr>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index}>
                                Indice : {index}
                            </div>
                        ))}
                        
                        <td className="day"><span className="number">{Object.values(calendrier.lundi)[0]}</span></td>
                        <td className="day"><span className="number">1</span><span className="event"></span><span
                            className="event"></span></td>
                        <td className="day"><span className="number">2</span></td>
                        <td className="day"><span className="number">3</span><span
                            className="event event-multiday-start"></span></td>
                        <td className="day"><span className="number">4</span><span className="event event-multiday"></span><span
                            className="event event-multiday-start eventclass" style={{ backgroundColor: '#5a9ab2' }} ></span><span
                            className="event"></span></td>
                        <td className="day"><span className="number">5</span><span
                            className="event event-multiday-finish"></span><span className="event event-multiday eventclass"
                                                                                 style={{ backgroundColor: '#5a9ab2' }}></span></td>
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
        lundi: [],
        mardi: [],
        mercredi: [],
        jeudi: [],
        vendredi: [],
        samedi: [],
        dimanche: []
    };

    // Récupérer le nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Récupérer le jour de la semaine du premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    // Fonction pour mapper le jour (0 = Dimanche) aux jours de la semaine
    const mapDayToWeek = (day) => {
        switch (day) {
            case 0:
                return "Sunday";
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
            default:
                return null;
        }
    };

    // Ajouter les jours du mois précédent s'il ne commence pas un Lundi
    if (firstDayOfWeek !== 1) {
        const previousMonthDays = new Date(year, month, 0).getDate(); // Dernier jour du mois précédent
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const dayOfWeek = mapDayToWeek(i);
            daysOfWeek[dayOfWeek].unshift(previousMonthDays - (firstDayOfWeek - 1) + i);
        }
    }

    // Ajouter les jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = mapDayToWeek(new Date(year, month, day).getDay());
        daysOfWeek[dayOfWeek].push(day);
    }

    // Compléter avec les jours du mois suivant si nécessaire pour remplir jusqu'au samedi
    const totalDays = Object.values(daysOfWeek).reduce((acc, days) => acc + days.length, 0);
    const remainingDays = 42 - totalDays; // Pour remplir un tableau complet de 6 semaines (42 cases)

    if (remainingDays > 0) {
        for (let i = 1; i <= remainingDays; i++) {
            const dayOfWeek = mapDayToWeek(new Date(year, month + 1, i).getDay());
            daysOfWeek[dayOfWeek].push(i);
        }
    }

    return daysOfWeek;
}

export default Planning;