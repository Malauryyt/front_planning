import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";
import Planning from "../components/planning/planning";
import {DetailJalon} from "../components/jalon/detailsJalon";
import {JalonChrono} from "../components/jalon/jalonChrono";
import InfoJalon from "../components/planning/infoJalon";
import TacheContainer from "../components/tache/tache_container";
import {Estimation} from "../components/jalon/estimation";
import {getJalonById} from "../model/jalon";


export function InfoGlobalJalon(props) {
    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [idJalon, setIdJalon] = useState(0)
    const [monJalon, setMonJalon] = useState([{"test" : "test"}])

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

                <h3> Avancement</h3>
                <Estimation jalon={monJalon[0]} projetEnCours={props.projetEnCours}/>

                <div className="d-flex">

                    <div className="col-6 m-3">
                        <h3> Taches </h3>
                        <TacheContainer jalon={idJalon}/>
                    </div>
                    <div className="col-6 m-3">
                        <h3> Exigences </h3>
                        <TacheContainer jalon={idJalon}/>
                    </div>
                </div>



            </div>


        </>
    );
}
