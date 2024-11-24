import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {creaPosteJalon, getJalons, getJalonById, modifJalon, suppJalon} from "../../model/jalon";
import {getAllUser} from "../../model/user";
import { useNavigate } from 'react-router-dom';

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
                        const data = await creaPosteJalon(props.projetEnCours, inputChangeLibelle, props.dateAjout,inputChangeDateCommencement, user.id_user , inputChangeCouleur);
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
    const [libelleModif, setLibelleModif] = useState("")
    const [date_liv_prev, setDate_liv_prev] = useState("")
    const [date_comModif, setDate_comModif] = useState("")
    const [id_userModif, setId_userModif] = useState("")
    const [etatModif, setEtatModif] = useState("")
    const [couleurModif, setCouleurModif] = useState("")

    const [isLast , setIsLast] = useState("non")
    const [users, setUsers] = useState("")

    const[monJalon, setMonJalon] = useState([{
        "id_jalon": 0,
        "libelle" : "",
        "date_liv_prev": "",
        "date_com": "",
        "id_user" : "",
        "id_projet": "",
        "etat": 0,
        "couleur" : ""
    }])

    // pour la récupération de jalon on regarde si c'est le premier jalon ou pas
    useEffect( ()=>{

        getUnJalon()
        isFirst()
        islast()

    }, [props.jalonModif])

    useEffect(() => {
        getUsers();
    }, [])

    // récupération d'un de mes jalon
    //récupération des jalons
    const getUnJalon = async () => {

        if(props.jalonModif != "" ){

            try {
                const data = await getJalonById(props.jalonModif);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    errorModal("Impossible de récupérer les projets" )
                }
                else{
                    setMonJalon(data) ;

                    setLibelleModif(data[0].libelle)
                    setDate_liv_prev(data[0].date_liv_theorique)
                    setDate_comModif(data[0].date_com_theorique)
                    setId_userModif(data[0].id_user)
                    setEtatModif(data[0].etat)
                    setCouleurModif(data[0].couleur)

                }
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }
    }

    // on regarde si mon jalon est le premier ou pas pour voir si je permet le changement de date
    const isFirst = () => {
        if(props.jalons ){
            const tabJalon = props.jalons
            const index = tabJalon.findIndex(jalon => jalon.id_jalon === props.jalonModif);
            console.log(index)
            if(index === 0){
                setDateCommencement("oui")
            }
        }
    };

    const islast = () => {
        if(props.jalons ){
            const tabJalon = props.jalons
            const index = tabJalon.findIndex(jalon => jalon.id_jalon === props.jalonModif);
            console.log(index)
            if(index === tabJalon.length - 1){
                setIsLast("oui")
            }
            else{
                setIsLast("non")
            }
        }
    };

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

    const handleChangelibelleModif = (event) => {
        setLibelleModif(event.target.value);
    };
    const handleChangedate_liv_prev = (event) => {
        setDate_liv_prev(event.target.value);
    };
    const handleChangedate_comModif = (event) => {
        setDate_comModif(event.target.value);
    };
    const handleChangeid_userModif = (event) => {
        setId_userModif(event.target.value);
    };
    const handleChangeetatModif = (event) => {
        setEtatModif(event.target.value);
    };
    const handleChangecouleurModif = (event) => {
        setCouleurModif(event.target.value);
    };


    //modification de mon jalon
    const modificationJalon = async () => {
        // console.log(inputPrixCrea + inputTypeCrea + inputQteCrea + inputResCrea)

        // le jalon ne peut pas etre en cours ou terminé si le jalon d'avant ne l'ai pas

        const tabJalon = props.jalons
        const index = tabJalon.findIndex(jalon => jalon.id_jalon === monJalon[0].id_jalon);
        if( index  !== 0 ){

            const prece = tabJalon.find((jalon, i) => i === index - 1);
            if(prece.etat != 2 && etatModif > 0 ){
                setErrorModal("Le jalon ne peut pas être en cours ou commencer si le jalon précédent n'est pas terminé. Vérifiez l'état du jalon précédent.")
                return;
            }

        }


        if (libelleModif!= "" && couleurModif != "" ) {

            if(date_comModif != "" && new Date(date_comModif).getTime() > new Date(date_liv_prev).getTime()){

                setErrorModal("La date de commencement du jalon ne peut pas être supérieur à celle de fin.")
            }else{
                try {
                    const data = await modifJalon(monJalon[0].id_jalon, libelleModif, date_liv_prev, date_comModif, id_userModif, props.projetEnCours, etatModif, couleurModif);
                    if (data == "400") {
                        console.log("data/error : ", data.status);
                        setErrorModal("La date de livraison ne peut pas être inférieur ou égale  à celle du jalon antérieur ou suivant.")
                    }
                    else {

                        // Ferme la modal
                        var closeModalBtn = document.getElementById("btnclosemodalJalonModif");
                        closeModalBtn.click();
                        setErrorModal("");

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
    // Supression de jalon
    // *********************************************************************************
    //modification de mon jalon
    const [supp, setSupp] = useState("non")
    const validationSupp = () =>{
        setSupp("oui")
    }
    const supressionJalon = async () => {

        try {
            const data = await suppJalon(monJalon[0].id_jalon);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setErrorModal("La modification n'a pas pu être effectuée correctement.")
            }
            else {

                // Ferme la modal
                var closeModalBtn = document.getElementById("btnclosemodalJalonModif");
                closeModalBtn.click();
                setErrorModal("");
                setSupp("non")

                props.setMettreAJour(!props.mettreAJour)

            }
        } catch (error) {
            console.error("Erreur lors de la supression de jalon :", error);
            setErrorModal("La modification n'a pas pu être effectuée correctement.")
        }

    };

    // *********************************************************************************
    // détails de jalon
    // *********************************************************************************
    const navigate = useNavigate();
    const redirectToAboutPage = (id_jalon) => {
        localStorage.setItem('idJalon', id_jalon);
        var closeModalBtn = document.getElementById("btnclosemodalJalonModif");
        closeModalBtn.click();
        navigate('/InfoGlobalJalon');
    };



        return (<>

                <div className="modal fade" id="ajoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Ajout jalon</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        id="btnclosemodalJalonAjout"></button>
                            </div>
                            <div className="modal-body">
                                <div className={errorModal == "" ? "d-none" : "alert alert-danger"} role="alert">
                                    {errorModal}
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date de livraison
                                        :</label>
                                    <div className="col-sm-6">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail"
                                               value={props.dateAjout}></input>
                                    </div>
                                </div>
                                <div className={dateCommencement === "oui" ? "mb-3 row" : "d-none"}>
                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date de
                                        commencement :</label>
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
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler
                                </button>
                                <button type="button" className="btn btn-primary" onClick={ajoutJalon}>Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="modifModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modification jalon
                                    - {monJalon[0].libelle}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        id="btnclosemodalJalonModif"></button>
                            </div>
                            <div className="modal-body">
                                <div className={errorModal == "" ? "d-none" : "alert alert-danger"} role="alert">
                                    {errorModal}
                                </div>


                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date de livraison :</label>
                                    <div className="col-sm-6">
                                        <input type="date" className="form-control" id="exampleColorInput"
                                               value={date_liv_prev}
                                               onChange={handleChangedate_liv_prev}></input>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Date début :</label>
                                    <div className="col-sm-6">
                                        <input type="date" className="form-control" id="exampleColorInput"
                                               readOnly={dateCommencement != "oui"}
                                               value={date_comModif}
                                               onChange={handleChangedate_comModif}></input>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Libellé :</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="inputPassword"
                                               value={libelleModif} onChange={handleChangelibelleModif}></input>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Couleur du jalon
                                        :</label>
                                    <div className="col-sm-6">
                                        <input type="color" className="form-control form-control-color"
                                               id="exampleColorInput"
                                               title="Choose your color" value={couleurModif}
                                               onChange={handleChangecouleurModif}></input>
                                    </div>

                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Etat :</label>
                                    <div className="col-sm-6">
                                        <select className="form-select" aria-label="Default select example" value={etatModif} onChange={handleChangeetatModif}>
                                            <option value="0">A commencer</option>
                                            <option value="1">En cours</option>
                                            <option value="2">Terminé</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Responsable : </label>
                                    <div className="col-sm-6">
                                        <select className="form-select" aria-label="Default select example" value={id_userModif} onChange={handleChangeid_userModif}>

                                            {users.length > 0 && users.map((user, cpt) => {
                                                return (
                                                    <option value={user.id_user}>{user.trigramme} - {user.nom}</option>
                                                )

                                            })}
                                        </select>
                                    </div>

                                </div>

                                <div className={supp === "oui" ? "alert alert-danger " : "d-none"} role="alert">
                                    <p>Êtes-vous sûr de vouloir supprimer ce jalon ?</p>
                                    <div className="modal-footer d-flex justify-content-center">

                                        <button type="button" className="btn btn-secondary" onClick={() => {setSupp("non")}}>Non </button>
                                        <button type="button" className="btn btn-success" onClick={() => {supressionJalon()}} >Oui </button>
                                    </div>

                                </div>


                            </div>
                            <div className="modal-footer d-flex justify-content-between">

                                <button type="button" className={dateCommencement === "oui" || isLast === "oui" ? "btn btn-danger" : "d-none"} onClick={validationSupp}>Supprimer
                                </button>


                                <button type="button" className="btn btn-secondary" onClick={() => {redirectToAboutPage(monJalon[0].id_jalon)}}>Détail</button>

                                <button type="button" className="btn btn-primary" onClick={modificationJalon}>Modifier</button>


                            </div>
                        </div>
                    </div>
                </div>

            </>
        )

}

export default JalonCrud;