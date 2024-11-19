import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getJalons} from "../model/jalon";
import {creaPosteMachine} from '../model/jalon.js'

function JalonCrud(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [dateCommencement, setDateCommencement] = useState("non");
    const [errorModal, setErrorModal] = useState("");

    // pour la récupération de jalon on regarde si c'est le premier jalon ou pas
    useEffect( ()=>{

        isFirstJalon()

    }, [props.dateAjout])

    // vérification que le nouverau jalon demandé est le premier ou pas
    const isFirstJalon = () => {
        if(props.jalons ){
            const jalons = props.jalons;
            const dateFinDemande = props.dateAjout;
            var dateFin ;
            if(jalons.length > 0 ){
                dateFin = jalons[0].date_liv_theorique;

                if(  new Date(dateFin).getTime() >  new Date(dateFinDemande).getTime() ){
                    setDateCommencement("oui")
                }
                else{
                    setDateCommencement("non")
                }
            }
            else{
                setDateCommencement("oui")
            }


        }
    };

    // *********************************************************************************
    // Ajout de jalon
    // *********************************************************************************

    const [inputChangeLibelle, setInputChangeLibelle] = useState("")
    const [inputChangeCouleur, setInputChangeCouleur] = useState("")
    const [inputChangeDateCommencement, setInputChangeDateCommencement] = useState("")
    const handleChangeLibelle = (event) => {
        setInputChangeLibelle(event.target.value);
    };
    const handleChangeCouleur = (event) => {
        setInputChangeCouleur(event.target.value);
    };

    const handleChangeDateCommencemment = (event) => {
        setInputChangeDateCommencement(event.target.value);
    };

    //récupération des jalons
    const ajoutJalon = async () => {
        // console.log(inputPrixCrea + inputTypeCrea + inputQteCrea + inputResCrea)

        if (inputChangeLibelle != "" && inputChangeCouleur != "") {
            if(inputChangeDateCommencement != "" && new Date(inputChangeDateCommencement).getTime() > new Date(props.dateAjout).getTime()){

                    setErrorModal("La date de commencement du jalon ne peut pas être supérieur à celle de fin.")
            }else{
                    try {
                        const data = await creaPosteMachine(props.projetEnCours, inputChangeLibelle, props.dateAjout,inputChangeDateCommencement, user.id_user , inputChangeCouleur);
                        if (data == "400") {
                            console.log("data/error : ", data.status);
                            setErrorModal("Vous ne pouvez pas ajouter un jalon à date butoir d'un autre.")
                        }
                        else {

                            // Ferme la modal
                            var closeModalBtn = document.getElementById("btnclosemodalJalonAjout");
                            closeModalBtn.click();
                            setErrorModal("");

                            setInputChangeLibelle("")
                            setInputChangeCouleur("")
                            setInputChangeDateCommencement("")

                            props.setMettreAJour(!props.mettreAJour)

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
    // pour la récupération de jalon on regarde si c'est le premier jalon ou pas
    useEffect( ()=>{

        isFirstJalon()

    }, [props.jalonModif])



    return (<>

            <div className="modal fade" id="ajoutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Ajout jalon</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnclosemodalJalonAjout"></button>
                        </div>
                        <div className="modal-body">
                            <div className={errorModal == "" ? "d-none" : "alert alert-danger"} role="alert">
                                {errorModal}
                            </div>

                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date de livraison :</label>
                                <div className="col-sm-6">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail"
                                           value={props.dateAjout}></input>
                                </div>
                            </div>
                            <div  className={dateCommencement === "oui" ? "mb-3 row" : "d-none"}>
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date de commencement :</label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control" id="exampleColorInput"
                                           value={inputChangeDateCommencement} onChange={handleChangeDateCommencemment}  ></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Libellé :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="inputPassword"  value={inputChangeLibelle} onChange={handleChangeLibelle}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Couleur du jalon :</label>
                                <div className="col-sm-6">
                                    <input type="color" className="form-control form-control-color" id="exampleColorInput"
                                           value="#563d7c" title="Choose your color"  value={inputChangeCouleur} onChange={handleChangeCouleur}></input>
                                </div>

                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={ ajoutJalon}>Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade" id="modifModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modification jalon</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    id="btnclosemodalJalonAjout"></button>
                        </div>
                        <div className="modal-body">
                            <div className={errorModal == "" ? "d-none" : "alert alert-danger"} role="alert">
                                {errorModal}
                            </div>
                            {props.jalonModif} - jalon a modifier

                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date de livraison
                                    :</label>
                                <div className="col-sm-6">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail"
                                           value={props.dateAjout}></input>
                                </div>
                            </div>
                            <div className={dateCommencement === "oui" ? "mb-3 row" : "d-none"}>
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date de commencement
                                    :</label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control" id="exampleColorInput"
                                           value={inputChangeDateCommencement}
                                           onChange={handleChangeDateCommencemment}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Libellé :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="inputPassword"
                                           value={inputChangeLibelle} onChange={handleChangeLibelle}></input>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Couleur du jalon
                                    :</label>
                                <div className="col-sm-6">
                                    <input type="color" className="form-control form-control-color"
                                           id="exampleColorInput"
                                           value="#563d7c" title="Choose your color" value={inputChangeCouleur}
                                           onChange={handleChangeCouleur}></input>
                                </div>

                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={ajoutJalon}>Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default JalonCrud;