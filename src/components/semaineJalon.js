import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";

function Semaine(props) {

    const [aujourdhui, setaujourdhui] = useState("");
    const[calendrier, setCalendrier ] = useState({
        "Monday": ["1", "2", "3", "4", "5"],
        "Tuesday": ["1", "2", "3", "4", "5"],
        "Wednesday": ["1", "2", "3", "4", "5"],
        "Thursday": ["1", "2", "3", "4", "5"],
        "Friday": ["1", "2", "3", "4", "5"],
        "Saturday": ["1", "2", "3", "4", "5"],
        "Sunday": ["1", "2", "3", "4", "5"]
    });
    const[dateDuCalendrier, setDateDuCalendrier ] = useState({
        "Monday": ["1", "2", "3", "4", "5"],
        "Tuesday": ["1", "2", "3", "4", "5"],
        "Wednesday": ["1", "2", "3", "4", "5"],
        "Thursday": ["1", "2", "3", "4", "5"],
        "Friday": ["1", "2", "3", "4", "5"],
        "Saturday": ["1", "2", "3", "4", "5"],
        "Sunday": ["1", "2", "3", "4", "5"]
    });

    const [jalons, setJalons] = useState(props.jalons)


    useEffect( ()=>{
        setDateDuCalendrier(getDaysinCalendars(props.annee, props.mois ))
        const today = new Date();
        setaujourdhui(today.getDate());
        setCalendrier(props.calendrier)

        const test = props.calendrier
        console.log(test)

    }, [props.calendrier])

    //mise à jour de mon jalon
    useEffect( ()=>{
        setJalons(props.jalons);

    }, [props.jalons])

    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (<>

        <  tr>
            <td className={aujourdhui == calendrier.Monday[props.index] ? "day today" : "day "}>
                <span className="number"> {calendrier.Monday[props.index]} </span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {
                    console.log(dateDuCalendrier)
                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Monday[props.index]

                    // Vérifier si la date du jalon est entre deux dates

                    const isBetween =
                        new Date(dateAct) > new Date(dateDebJalon) &&
                        new Date(dateAct) < new Date(dateFinJalon);


                    var estDebut = false;
                    if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                        estDebut = true;
                    }
                    var estFin = false
                    if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                        estFin = true;
                    }

                    return (
                        <>

                            <span className={isBetween ? "event event-multiday" : "d-none"} style={{ backgroundColor: jalon.couleur }} c></span>
                            <span className={estDebut ? "event event-multiday-start eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className={estFin ? "event event-multiday-finish eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </>
                    )

                })}


            </td>
            <td className={aujourdhui == calendrier.Tuesday[props.index] ? "day today" : "day"}>
                <span className="number">{calendrier.Tuesday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Tuesday[props.index]

                    // Vérifier si la date du jalon est entre deux dates

                    const isBetween =
                        new Date(dateAct) > new Date(dateDebJalon) &&
                        new Date(dateAct) < new Date(dateFinJalon);


                    var estDebut = false;
                    if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                        estDebut = true;
                    }
                    var estFin = false
                    if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                        estFin = true;
                    }

                    return (
                        <>
                            <span className={isBetween ? "event event-multiday" : "d-none"} style={{ backgroundColor: jalon.couleur }} c></span>
                            <span className={estDebut ? "event event-multiday-start eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className={estFin ? "event event-multiday-finish eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </>
                    )

                })}

            </td>
            <td className={aujourdhui == calendrier.Wednesday[props.index] ? "day today" : "day"}>
                <span className="number"> {calendrier.Wednesday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Wednesday[props.index]

                    // Vérifier si la date du jalon est entre deux dates

                    const isBetween =
                        new Date(dateAct) > new Date(dateDebJalon) &&
                        new Date(dateAct) < new Date(dateFinJalon);


                    var estDebut = false;
                    if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                        estDebut = true;
                    }
                    var estFin = false
                    if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                        estFin = true;
                    }

                    return (
                        <>

                            <span className={isBetween ? "event event-multiday" : "d-none"} style={{ backgroundColor: jalon.couleur }} c></span>
                            <span className={estDebut ? "event event-multiday-start eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className={estFin ? "event event-multiday-finish eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </>
                    )

                })}

            </td>
            <td className={aujourdhui == calendrier.Thursday[props.index] ? "day today" : "day"}>
                <span className="number"> {calendrier.Thursday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Thursday[props.index]

                    // Vérifier si la date du jalon est entre deux dates

                    const isBetween =
                        new Date(dateAct) > new Date(dateDebJalon) &&
                        new Date(dateAct) < new Date(dateFinJalon);


                    var estDebut = false;
                    if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                        estDebut = true;
                    }
                    var estFin = false
                    if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                        estFin = true;
                    }

                    return (
                        <>
                            <span className={isBetween ? "event event-multiday" : "d-none"} style={{ backgroundColor: jalon.couleur }} c></span>
                            <span className={estDebut ? "event event-multiday-start eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className={estFin ? "event event-multiday-finish eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </>
                    )

                })}

            </td>
            <td  className={aujourdhui == calendrier.Friday[props.index] ? "day today" : "day"}>
                <span className="number"> {calendrier.Friday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Friday[props.index]

                    // Vérifier si la date du jalon est entre deux dates

                    const isBetween =
                        new Date(dateAct) > new Date(dateDebJalon) &&
                        new Date(dateAct) < new Date(dateFinJalon);


                    var estDebut = false;
                    if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                        estDebut = true;
                    }
                    var estFin = false
                    if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                        estFin = true;
                    }

                    return (
                        <>

                            <span className={isBetween ? "event event-multiday" : "d-none"} style={{ backgroundColor: jalon.couleur }} c></span>
                            <span className={estDebut ? "event event-multiday-start eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className={estFin ? "event event-multiday-finish eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </>
                    )

                })}

            </td>
            <td className={aujourdhui == calendrier.Saturday[props.index] ? "day today" : "day"}>
                <span className="number"> {calendrier.Saturday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Saturday[props.index]

                    // Vérifier si la date du jalon est entre deux dates

                    const isBetween =
                        new Date(dateAct) > new Date(dateDebJalon) &&
                        new Date(dateAct) < new Date(dateFinJalon);


                    var estDebut = false;
                    if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                        estDebut = true;
                    }
                    var estFin = false
                    if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                        estFin = true;
                    }


                    return (
                        <>

                            <span className={isBetween ? "event event-multiday" : "d-none"} style={{ backgroundColor: jalon.couleur }} c></span>
                            <span className={estDebut ? "event event-multiday-start eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className={estFin ? "event event-multiday-finish eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </>
                    )

                })}

            </td>
            <td className={aujourdhui == calendrier.Sunday[props.index] ? "day today" : "day"}>
                    <span className="number"> {calendrier.Sunday[props.index]}</span>

                {jalons.length > 0 && jalons.map((jalon, cpt) => {

                    const dateFinJalon =   jalon.date_liv_theorique;
                    const dateDebJalon = jalon.date_com_theorique ;
                    const dateAct = dateDuCalendrier.Sunday[props.index]

                    // Vérifier si la date du jalon est entre deux dates

                    const isBetween =
                        new Date(dateAct) > new Date(dateDebJalon) &&
                        new Date(dateAct) < new Date(dateFinJalon);


                    var estDebut = false;
                    if(new Date(dateDebJalon).getTime() ===  new Date(dateAct).getTime()){
                        estDebut = true;
                    }
                    var estFin = false
                    if( new Date(dateFinJalon).getTime() ===  new Date(dateAct).getTime()){
                        estFin = true;
                    }

                    return (
                        <>

                            <span className={isBetween ? "event event-multiday" : "d-none"} style={{ backgroundColor: jalon.couleur }} c></span>
                            <span className={estDebut ? "event event-multiday-start eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className={estFin ? "event event-multiday-finish eventclass" : "d-none"} style={{ backgroundColor: jalon.couleur }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                            <span className="event" className={jalon.charge == 1  ? "event" : "d-none"} style={{ backgroundColor: '#bd32ce ' }} ></span>
                        </>
                    )

                })}

            </td>
        </tr>

        </>
    )

}


function getDaysinCalendars(year, month) {

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

    // Fonction pour formater la date au format "YYYY-MM-DD"
    const formatDate = (year, month, day) => {
        const monthStr = String(month + 1).padStart(2, '0'); // Ajouter un 0 devant si nécessaire
        const dayStr = String(day).padStart(2, '0'); // Ajouter un 0 devant si nécessaire
        return `${year}-${monthStr}-${dayStr}`;
    };

    // Ajouter les jours du mois précédent s'il ne commence pas un Lundi
    if (firstDayOfWeek !== 1) {
        const previousMonthDays = new Date(year, month, 0).getDate(); // Dernier jour du mois précédent
        const previousMonth = month === 0 ? 11 : month - 1;
        const previousYear = month === 0 ? year - 1 : year;

        for (let i = firstDayOfWeek - 1; i >= 1; i--) {
            const dayOfWeek = mapDayToWeek(i);
            const dayNumber = previousMonthDays - (firstDayOfWeek - 1) + (i - 1);
            daysOfWeek[dayOfWeek].unshift(formatDate(previousYear, previousMonth, dayNumber));
        }
    }

    // Ajouter les jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = mapDayToWeek(new Date(year, month, day).getDay() || 7);
        daysOfWeek[dayOfWeek].push(formatDate(year, month, day));
    }

    // Compléter avec les jours du mois suivant si nécessaire pour remplir un tableau de 6 semaines (42 cases)
    const totalDays = Object.values(daysOfWeek).reduce((acc, days) => acc + days.length, 0);
    const remainingDays = 42 - totalDays;

    if (remainingDays > 0) {
        const nextMonth = (month + 1) % 12;
        const nextYear = month === 11 ? year + 1 : year;

        for (let i = 1; i <= remainingDays; i++) {
            const dayOfWeek = mapDayToWeek(new Date(year, month + 1, i).getDay() || 7);
            daysOfWeek[dayOfWeek].push(formatDate(nextYear, nextMonth, i));
        }
    }

    return daysOfWeek;
}


export default Semaine;