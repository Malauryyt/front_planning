import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {creaPosteJalon, getJalons, getJalonById, modifJalon, suppJalon} from "../../model/jalon";
import {getAllUser} from "../../model/user";
import { useNavigate } from 'react-router-dom';
import {creaTache, getTachesByJalon, modifTache, suppTache} from "../../model/tache";

function JalonCrud(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [errorModal, setErrorModal] = useState("");
    const [monJalon, setMonJalon] = useState([]);
    const [mesTaches, setMesTaches] = useState([]);
    const [maTache, setMaTache] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        setMonJalon(props.monJalon)
        const jal = props.monJalon
        getMesTaches(jal.id_jalon)

        setErrorModal("")
        setSupp("non")
    }, [props.monJalon, props.tacheModif, props.maj])

    useEffect(()=>{
        getUsers()
        getMesTaches(monJalon.id_jalon)
    }, [])



    const getUsers = async () => {

        try {
            const data = await getAllUser();
            if(data == "400"){
                console.log("data/error : ", data.status);
                errorModal("Impossible de récupérer les projets" )
            }
            else{
                setUsers(data) ;

            }
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
        }

    }

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
                else {
                    setMesTaches(data);

                    if (props.tacheModif != undefined){
                        const tabTaches = data;
                        const maT = tabTaches.find(tache => tache.id === props.tacheModif);

                        if (maT != undefined) {
                            setInputModifChangeLibelle(maT.libelle)
                            setInputModifChangeDescription(maT.description)
                            setInputModifChangeOperation(maT.operation)
                            setInputModifChangeDateDebutTheo(maT.dateDebutTheorique)
                            setInputModifChangeCharge(maT.charge)
                            setInputModifChangeResponsable(maT.id_user)
                            setInputModifChangeTache(maT.id_tache)
                            setInputModifChangeStatut(maT.statut)

                            setMaTache(maT)
                        }
                    }

                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
                setMesTaches([])
            }
        }
    }


    // *********************************************************************************
    // Ajout de jalon
    // *********************************************************************************

    const [inputChangeLibelle, setInputChangeLibelle] = useState("")
    const [inputChangeDescription, setInputChangeDescription] = useState("")
    const [inputChangeOperation, setInputChangeOperation] = useState("")
    const [inputChangeDateDebutTheo, setInputChangeDateDebutTheo] = useState("")
    const [inputChangeCharge, setInputChangeCharge] = useState("")
    const [inputChangeResponsable, setInputChangeResponsable] = useState("")
    const [inputChangeTache, setInputChangeTache] = useState(null)


    const handleChangeLibelle = (event) => {
        setInputChangeLibelle(event.target.value);
    };
    const handleChangeDescription = (event) => {
        setInputChangeDescription(event.target.value);
    };
    const handleChangeOperation = (event) => {
        setInputChangeOperation(event.target.value);
    };

    const handleChangeDateDebutTheo = (event) => {
        setInputChangeDateDebutTheo(event.target.value);
    };
    const handleChangeCharge = (event) => {
        setInputChangeCharge(event.target.value);
    };
    const handleChangeResponsable = (event) => {
        setInputChangeResponsable(event.target.value);
    };
    const handleChangeTache = (event) => {
        setInputChangeTache(event.target.value);
    };

    //récupération des jalons
    const ajoutTache = async () => {
        // console.log(inputPrixCrea + inputTypeCrea + inputQteCrea + inputResCrea)

        if (inputChangeLibelle != "" && inputChangeDescription != "" && inputChangeOperation != "" && inputChangeDateDebutTheo != "" && inputChangeResponsable != "" && inputChangeCharge != "") {

            const dateFinTheo = new Date(inputChangeDateDebutTheo);
            const dateliv = new Date(monJalon.date_liv_theorique);
            dateFinTheo.setDate(dateFinTheo.getDate() + parseInt(inputChangeCharge) - 1);

            if(inputChangeCharge > monJalon.charge || dateFinTheo.getTime() > new Date(monJalon.date_liv_theorique).getTime()){

                setErrorModal("La durée de la tâche ne peut pas être supérieure à la durée du jalon.")
            }else{
                try {
                    const data = await creaTache( inputChangeLibelle, inputChangeDescription, inputChangeOperation,inputChangeDateDebutTheo, inputChangeCharge, inputChangeResponsable,inputChangeTache,  monJalon.id_jalon, props.projetEnCours);
                    if (data == "400") {
                        console.log("data/error : ", data.status);
                        setErrorModal("Vous ne pouvez pas ajouter un jalon à date butoir d'un autre.")
                    }
                    else {

                        // Ferme la modal
                        var closeModalBtn = document.getElementById("btnclosemodalTacheAjout");
                        closeModalBtn.click();
                        setErrorModal("");

                        setInputChangeLibelle("")
                        setInputChangeDescription("")
                        setInputChangeOperation("")
                        setInputChangeDateDebutTheo("")
                        setInputChangeResponsable("")
                        setInputChangeCharge("")

                        props.setMaj(!props.maj)

                    }
                } catch (error) {
                    console.error("Erreur lors de la recherche de poste :", error);
                    setErrorModal("Vous ne pouvez pas ajouter un jalon à date butoire d'un autre.")
                }

            }
        }
        else {
            setErrorModal("Vous devez remplir tous les champs.")
        }

    };

    // *********************************************************************************
    // Modification de jalon
    // *********************************************************************************

    const [inputModifChangeLibelle, setInputModifChangeLibelle] = useState("")
    const [inputModifChangeDescription, setInputModifChangeDescription] = useState("")
    const [inputModifChangeOperation, setInputModifChangeOperation] = useState("")
    const [inputModifChangeDateDebutTheo, setInputModifChangeDateDebutTheo] = useState("")
    const [inputModifChangeDateDem, setInputModifChangeDateDem] = useState(null)
    const [inputModifChangeCharge, setInputModifChangeCharge] = useState("")
    const [inputModifChangeResponsable, setInputModifChangeResponsable] = useState("")
    const [inputModifChangeTache, setInputModifChangeTache] = useState(null)
    const [inputModifChangeStatut, setInputModifChangeStatut] = useState(0)

    const handleChangeModifLibelle = (event) => {
        setInputModifChangeLibelle(event.target.value);
    };
    const handleChangeModifDescription = (event) => {
        setInputModifChangeDescription(event.target.value);
    };
    const handleChangeModifOperation = (event) => {
        setInputModifChangeOperation(event.target.value);
    };

    const handleChangeModifDateDebutTheo = (event) => {
        setInputModifChangeDateDebutTheo(event.target.value);
    };
    const handleChangeModifCharge = (event) => {
        setInputModifChangeCharge(event.target.value);
    };
    const handleChangeModifResponsable = (event) => {
        setInputModifChangeResponsable(event.target.value);
    };
    const handleChangeModifTache = (event) => {
        setInputModifChangeTache(event.target.value);
    };
    const handleChangeModifStatut = (event) => {

        if(inputModifChangeStatut === 0 ){
            // je met a jour ma date de commencement à ajd
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois est basé sur 0
            const day = String(today.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            setInputModifChangeDateDem(formattedDate);
        }

        if(event.target.value === 0 ){
            setInputModifChangeDateDem(null);
        }
        setInputModifChangeStatut(event.target.value);
    };


    const modificationTache = async () => {
        // console.log(inputPrixCrea + inputTypeCrea + inputQteCrea + inputResCrea)

        if (inputModifChangeLibelle != "" && inputModifChangeDescription != "" && inputModifChangeOperation != "" && inputModifChangeDateDebutTheo != "" && inputModifChangeResponsable != "" && inputModifChangeCharge != "") {

            const dateFinTheo = new Date(inputModifChangeDateDebutTheo);
            const dateliv = new Date(monJalon.date_liv_theorique);
            dateFinTheo.setDate(dateFinTheo.getDate() + parseInt(inputModifChangeCharge));

            if(inputModifChangeCharge > monJalon.charge || dateFinTheo.getTime() > new Date(monJalon.date_liv_theorique).getTime()){

                setErrorModal("La durée de la tâche ne peut pas être supérieure à la durée du jalon.")
            }else{
                try {
                    const data = await modifTache(maTache.id, inputModifChangeLibelle, inputModifChangeDescription,
                                                inputModifChangeOperation,inputModifChangeDateDebutTheo,
                                                inputModifChangeDateDem, inputModifChangeCharge,
                                                inputModifChangeStatut, inputModifChangeResponsable, inputModifChangeTache,
                                                monJalon.id_jalon, props.projetEnCours);
                    if (data == "400") {
                        console.log("data/error : ", data.status);
                        setErrorModal("Vous ne pouvez pas ajouter un jalon à date butoir d'un autre.")
                    }
                    else {

                        // Ferme la modal
                        var closeModalBtn = document.getElementById("btnclosemodalTacheModif");
                        closeModalBtn.click();
                        setErrorModal("");

                        setInputModifChangeLibelle("")
                        setInputModifChangeDescription("")
                        setInputModifChangeOperation("")
                        setInputModifChangeDateDebutTheo("")
                        setInputModifChangeDateDem(null)
                        setInputModifChangeCharge("")
                        setInputModifChangeResponsable("")
                        setInputModifChangeTache("")
                        setInputModifChangeStatut("")


                        props.setMaj(!props.maj)

                    }
                } catch (error) {
                    console.error("Erreur lors de la recherche de poste :", error);
                    setErrorModal("Vous ne pouvez pas ajouter un jalon à date butoire d'un autre.")
                }

            }
        }
        else {
            setErrorModal("Vous devez remplir tous les champs.")
        }

    };

    // // *********************************************************************************
    // // Supression de jalon
    // // *********************************************************************************
    //modification de mon jalon
    const [supp, setSupp] = useState("non")
    const validationSupp = () =>{
        setSupp("oui")
    }
    const supressionTache = async () => {

        try {
            const data = await suppTache(maTache.id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setErrorModal("Cette tâche est liée à une autre dépendante. Vous ne pouvez pas la supprimer.")
                setSupp('non')
            }
            else {

                // Ferme la modal
                var closeModalBtn = document.getElementById("btnclosemodalTacheModif");
                closeModalBtn.click();
                setErrorModal("");
                setSupp("non")

                props.setMaj(!props.maj)

            }
        } catch (error) {
            console.error("Erreur lors de la supression de jalon :", error);
            setErrorModal("La modification n'a pas pu être effectuée correctement.")
        }

    };





    return (<>

            <div className="modal fade" id="ajoutTache" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Ajout jalon</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    id="btnclosemodalTacheAjout"></button>
                        </div>
                        <div className="modal-body">
                            <div className={errorModal == "" ? "d-none" : "alert alert-danger"} role="alert">
                                {errorModal}
                            </div>

                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Libellé :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="inputPassword"
                                           value={inputChangeLibelle} onChange={handleChangeLibelle}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="exampleFormControlTextarea1" className="col-sm-5 col-form-label">Description : </label>
                                <div className="col-sm-6">
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              value={inputChangeDescription}
                                              onChange={handleChangeDescription}></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="exampleFormControlTextarea1" className="col-sm-5 col-form-label">Opération : </label>
                                <div className="col-sm-6">
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              value={inputChangeOperation}
                                              onChange={handleChangeOperation}></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date commencement : </label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control-plaintext" id="staticEmail" min={monJalon.date_com_theorique} max={monJalon.date_liv_theorique}
                                           value={inputChangeDateDebutTheo} onChange={handleChangeDateDebutTheo}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Responsable : </label>
                                <div className="col-sm-6">
                                    <select className="form-select" aria-label="Default select example" value={inputChangeResponsable} onChange={handleChangeResponsable}>
                                        <option value="">-- Choisir un responsable</option>
                                        {users.length > 0 && users.map((user, cpt) => {
                                            return (
                                                <option value={user.id_user}>{user.trigramme} - {user.nom}</option>
                                            )

                                        })}
                                    </select>
                                </div>

                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Taches Précédente : </label>
                                <div className="col-sm-6">
                                    <select className="form-select" aria-label="Default select example" value={inputChangeTache} onChange={handleChangeTache}>
                                        <option value="">-- Choisir une tache</option>
                                        {mesTaches.length > 0 && mesTaches.map((tache, cpt) => {
                                            return (
                                                <option value={tache.id}>{tache.libelle}</option>
                                            )

                                        })}
                                    </select>
                                </div>

                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Charge : </label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control-plaintext" id="staticEmail" max={monJalon.charge}
                                           value={inputChangeCharge} onChange={handleChangeCharge}></input>
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler
                            </button>
                            <button type="button" className="btn btn-primary" onClick={ajoutTache}>Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade custom-modal" id="modifTache" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{maTache.libelle}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    id="btnclosemodalTacheModif"></button>
                        </div>
                        <div className="modal-body">
                            <div className={errorModal == "" ? "d-none" : "alert alert-danger"} role="alert">
                                {errorModal}
                            </div>

                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Libellé :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="inputPassword"
                                           value={inputModifChangeLibelle} onChange={handleChangeModifLibelle}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="exampleFormControlTextarea1" className="col-sm-5 col-form-label">Description : </label>
                                <div className="col-sm-6">
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              value={inputModifChangeDescription}
                                              onChange={handleChangeModifDescription}></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="exampleFormControlTextarea1" className="col-sm-5 col-form-label">Opération : </label>
                                <div className="col-sm-6">
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              value={inputModifChangeOperation}
                                              onChange={handleChangeModifOperation}></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date commencement Théorique: </label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control-plaintext" id="staticEmail" min={monJalon.date_com_theorique} max={monJalon.date_liv_theorique}
                                           value={inputModifChangeDateDebutTheo} onChange={handleChangeModifDateDebutTheo}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date commencement réel: </label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control-plaintext" id="staticEmail" min={monJalon.date_com_theorique} max={monJalon.date_liv_theorique}
                                           value={inputModifChangeDateDem} readOnly  ></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Responsable : </label>
                                <div className="col-sm-6">
                                    <select className="form-select" aria-label="Default select example" value={inputModifChangeResponsable} onChange={handleChangeModifResponsable}>
                                        <option value="">-- Choisir un responsable</option>
                                        {users.length > 0 && users.map((user, cpt) => {
                                            return (
                                                <option value={user.id_user}>{user.trigramme} - {user.nom}</option>
                                            )

                                        })}
                                    </select>
                                </div>

                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Taches Précédente : </label>
                                <div className="col-sm-6">
                                    <select className="form-select" aria-label="Default select example" value={inputModifChangeTache} onChange={handleChangeModifTache}>
                                        <option value="">-- Choisir une tache</option>
                                        {mesTaches.length > 0 && mesTaches.map((tache, cpt) => {
                                            return (
                                                <option value={tache.id}>{tache.libelle}</option>
                                            )

                                        })}
                                    </select>
                                </div>

                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Charge : </label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control-plaintext" id="staticEmail" max={monJalon.charge}
                                           value={inputModifChangeCharge} onChange={handleChangeModifCharge}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Etat : </label>
                                <div className="col-sm-6">
                                    <select className="form-select" aria-label="Default select example" value={inputModifChangeStatut}  disabled={props.tacheBloquer} onChange={handleChangeModifStatut}>
                                        <option value="0">A faire</option>
                                        <option value="50">En cours</option>
                                        <option value="100">Terminé</option>
                                    </select>
                                </div>
                            </div>

                            <div className={supp === "oui" ? "alert alert-danger " : "d-none"} role="alert">
                                <p>Êtes-vous sûr de vouloir supprimer ce jalon ?</p>
                                <div className="modal-footer d-flex justify-content-center">

                                    <button type="button" className="btn btn-secondary" onClick={() => {setSupp("non")}}>Non </button>
                                    <button type="button" className="btn btn-success" onClick={() => {supressionTache()}} >Oui </button>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer d-flex justify-content-between">

                            <button type="button" className="btn btn-danger" onClick={validationSupp}>Supprimer
                            </button>

                            <button type="button" className="btn btn-primary" onClick={() => {modificationTache()}}>Modifier</button>


                        </div>
                    </div>
                </div>
            </div>


        </>
    )

}




export default JalonCrud;