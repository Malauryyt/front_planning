import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";
import TacheContainer from "../components/tache/tache_container";
import {Estimation} from "../components/jalon/estimation";
import {getJalonById} from "../model/jalon";
import TacheCRUD from "../components/tache/tacheCRUD";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export function InfoGlobalJalon(props) {
    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [idJalon, setIdJalon] = useState(0)
    const [monJalon, setMonJalon] = useState([{"test" : "test"}])
    const [maj, setMaj] = useState(true)
    const [tacheModif, setTacheModif] = useState("")
    const [tacheBloquer, setTacheBloquer] = useState(false)

    useEffect( ()=>{

        if(localStorage.getItem("idJalon") != null){
             const id_jalon = JSON.parse(localStorage.getItem("idJalon"))
            setIdJalon(id_jalon)
        }

    }, [])

    useEffect( ()=>{

        console.log("id que je passe",idJalon)
        getUnJalon(idJalon)

    }, [idJalon])

    // récupération d'un de mes jalon
    //récupération des jalons
    const getUnJalon = async (id_jalon) => {

        if (Number.isInteger(id_jalon) && id_jalon > 0) {
            try {
                const data = await getJalonById(id_jalon);
                if (data == "400") {
                    console.log("data/error : ", data.status);
                } else {
                    console.log("mon jalon", data)
                    setMonJalon(data);

                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }

    }


    return (<>

            <Navbar user={props.user} projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>

            <div className="conteneur container-xl taches ">

                <div ><h1 className="ms-2">{monJalon[0].libelle}</h1> </div>
                <div className="m-3">
                    <div className={monJalon[0].etat === 0 ? "d-flex justify-content-between" : "d-none"}>
                        <p >Etat : En attente <FontAwesomeIcon icon="fa-solid fa-clock" style={{color: "#808080",}} /></p>
                             </div>
                    <div className={monJalon[0].etat === 1 ? "d-flex justify-content-between" : "d-none"}>
                        <p className={monJalon[0].etat === 1 ? "" : "d-none"} >Etat : En cours <FontAwesomeIcon icon="fa-solid fa-calendar-check" style={{color: "#FFD43B",}} /></p>
                             </div>
                    <div className={monJalon[0].etat === 2 ? "d-flex justify-content-between" : "d-none"}>
                        <p className={monJalon[0].etat === 2 ? "" : "d-none"} >Etat : Terminé <FontAwesomeIcon icon="fa-regular fa-circle-check" style={{color: "#00ff40",}} /></p>
                    </div>

                    <spanp>Date commencement : {monJalon[0].date_com_theorique}</spanp>
                    <span className={monJalon[0].etat !== 2 ? "ms-3" : "d-none"}> Date de fin théorique : {monJalon[0].date_liv_theorique}</span>

                </div>
               <div className="m-3 ">
                  <div> <h3> Avancement </h3></div>
                   <div><Estimation jalon={monJalon[0]} projetEnCours={props.projetEnCours} setMaj={setMaj} maj={maj} pageInfo={"oui"}/></div>
               </div>


                <div className="d-flex">

                    <div className="col-6 m-3">
                        <div className="d-flex justify-content-between">
                            <h3> Taches </h3>
                            <FontAwesomeIcon icon="fa-solid fa-plus" style={{color: "#000000",}} className="m-2 pointer"  data-bs-toggle="modal" data-bs-target="#ajoutTache"/>
                        </div>

                        <TacheContainer jalon={idJalon} setMaj={setMaj} maj={maj} setTacheModif={setTacheModif} tacheModif={tacheModif} setTacheBloquer={setTacheBloquer}/>
                    </div>
                    <div className="col-6 m-3">
                        <h3> Exigences </h3>

                    </div>
                </div>


            </div>

            <TacheCRUD monJalon={monJalon[0]}  projetEnCours={props.projet} setMaj={setMaj} maj={maj} setTacheModif={setTacheModif} tacheModif={tacheModif} tacheBloquer={tacheBloquer}/>

        </>
    );
}
