import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar.js";
import TacheContainer from "../components/tache/tache_container";
import {Estimation} from "../components/jalon/estimation";
import {getJalonById, getUnJalonRoutes} from "../model/jalon";
import TacheCRUD from "../components/tache/tacheCRUD";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getTachesByJalon, getTachesMine, getMesTachesRoutes} from "../model/tache";
import TacheContainerMultiples from "../components/tache/tache_container_multiple";


export function Tache(props) {
    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [mesTaches, setMesTaches] = useState([]);
    const [mesTachesInfo, setMesTachesInfo] = useState([]);

    const [maj, setMaj] = useState(true);
    const [tacheModif, setTacheModif] = useState("");
    const [tacheBloquer, setTacheBloquer] = useState(false);

    const [jalonModif, setJalonModif] = useState("");
    const [monJalonModif, setMonJalonModif] = useState([{'monjalon': 'mon jal'}]);


    useEffect( () =>{
        getMesTaches(user.id_user);
    }, [])

    useEffect( () =>{
        getMesTaches(user.id_user);
    }, [maj])

    useEffect( () =>{
        modifTabTache();
    }, [mesTaches])

    useEffect( () =>{
        getJalonModif(jalonModif);
    }, [jalonModif])


    //récupération des taches du jalons
    const getMesTaches = async (id_user) => {

        //if(props.jalonModif != "" ){
        if(id_user != "" && id_user != null){

            try {
                const data = await getTachesMine(id_user);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setMesTaches([])
                }
                else{
                    console.log(data)
                    setMesTaches(data) ;

                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
                setMesTaches([])
            }
        }
    }

    const getJalonModif = async (id_jalon)=>{
        if(id_jalon != "" ){
            const jal = await getUnJalonRoutes(id_jalon);
            setMonJalonModif(jal)

        }
    }

    const modifTabTache = async () => {

        const tableauAvecStatus = await Promise.all(
            mesTaches.map(async (tache) => {
                let statutTachePrece = "";
                if (tache.id_tache != null) {
                    // Appel asynchrone ici
                    const tabTacheByJalon = await getMesTachesRoutes(tache.id_jalon);
                    const tacheInexistante = tabTacheByJalon.find(item => item.id === tache.id_tache);
                    statutTachePrece = tacheInexistante ? tacheInexistante.statut : "";
                }

                return {
                    ...tache,  // Copie de l'objet original
                    statusPrece: statutTachePrece  // Ajout du nouveau champ
                };
            })
        );

        // Retourner ou utiliser tableauAvecStatus si besoin
        setMesTachesInfo(tableauAvecStatus) ;
        console.log("tab final modif", tableauAvecStatus)
    }


    return (<>

            <Navbar user={props.user} projetEnCours={props.projet} setProjetEnCours={props.setProjet}/>

            <div className="conteneur container-xl taches ">
                <h1 className="ms-2">Mes taches</h1>

                <div>
                    <div className="list-group mt-3">
                        {mesTachesInfo.length > 0 &&
                            mesTachesInfo.map((tache, cpt) => {

                                var couleur;
                                switch (tache.statut) {
                                    case 0:
                                        couleur = "gray";
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
                                        <TacheContainerMultiples taches={tache} nomProjet={tache.nomprojet} couleur={couleur} maj={maj}
                                                                 setTacheModif={setTacheModif} tacheModif={tacheModif} setTacheBloquer={setTacheBloquer}
                                                                 setJalonModif={setJalonModif}/>
                                    </>
                                );

                            })

                        }
                    </div>

                </div>

            </div>
            <TacheCRUD monJalon={monJalonModif[0]}  projetEnCours={props.projet} setMaj={setMaj} maj={maj} setTacheModif={setTacheModif} tacheModif={tacheModif} tacheBloquer={tacheBloquer}/>

        </>
    );
}
