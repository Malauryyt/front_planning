import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate} from "react-router-dom";
import {getTachesByJalon} from "../../model/tache";
import {Estimation} from "../jalon/estimation";
import TacheContainerMultiples from "./tache_container_multiple";

function TacheContainer(props) {

    const [mesTaches, setMesTaches] = useState([]);
    const [mesTachesInfo, setMesTachesInfo] = useState([]);
    const [majTache, setMajTache] = useState(true);

    // récupération de mes jalons selon le projets choisis
    useEffect( () =>{
        getMesTaches(props.jalon);
    }, [props.jalon])


    //récupération des atches a chaque fois que c'est demandé
    useEffect( () =>{
        getMesTaches(props.jalon);
    }, [majTache])

    useEffect( () =>{
        modifTabTache();
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

    const modifTabTache = () => {

        const tableauAvecStatus = mesTaches.map(tache => {

            let statutTachePrece = "";
            if (tache.id_tache != null) {

                const tacheInexistante = mesTaches.find(item => item.id === tache.id_tache);
                statutTachePrece = tacheInexistante.statut;

            }

            return {
                ...tache,  // Copie de l'objet original
                statusPrece: statutTachePrece  // Ajout du nouveau champ
            };
        });

        // Retourner ou utiliser tableauAvecStatus si besoin
        setMesTachesInfo(tableauAvecStatus) ;
        console.log(tableauAvecStatus)
    }




    return (<>

        <div className="conteneur container-xl taches ">

            <h3> Taches </h3>
            <div className="list-group col-9">
                {mesTachesInfo.length > 0 &&
                    mesTachesInfo.map((tache, cpt) => {

                        var couleur;
                        switch (tache.statut) {
                            case 0:
                                couleur = "green";
                                break;
                            case 50:
                                couleur = "orange";
                                break;
                            case 100:
                                couleur = "green";
                                break;
                        }
                        return (
                            <>
                                <TacheContainerMultiples taches={tache} couleur={couleur}/>
                            </>
                        );

                    })

                }
            </div>




        </div>

        </>

    )

}



export default TacheContainer;