import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connexionApi } from '../model/user.js'
import { useNavigate } from 'react-router-dom';

function Connexion(props) {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const redirectToAboutPage = () => {
        navigate('/');
    };

    const Con = async () => {
        let login = document.getElementById('login').value;
        let mdp = document.getElementById('mdp').value;

        if(login == "" || mdp == ""){
            setError("Vous devez renseigner tous les champs." )
        }
        else {
            try {
                const data = await connexionApi(login, mdp);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setError("Login ou mot de passe incorrect." )
                }
                else{
                    //console.log(" je regarde dans mon login" + data)

                    console.log("mon token" ,   sessionStorage.getItem('token'))

                    props.setUser(data)
                    console.log(sessionStorage.user)
                    redirectToAboutPage()
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
            }
        }
    };

    return (<>

            <div className="container-md connexionContainer">

                <div className="connexion shadow align-middle d-flex flex-column justify-content-between">
                    <h1 className="text-center "> Connexion </h1>

                    <div>
                        <div className={error == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                            {error == "" ? "" : error}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="login"
                                   placeholder="name@example.com"></input>
                            <label htmlFor="floatingInput">Login</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="mdp"
                                   placeholder="Password"></input>
                            <label htmlFor="floatingPassword">Mot de passe</label>
                        </div>




                    </div>
                    <div className="d-flex flex-row-reverse">
                        <button  className="btn btnLogin " onClick={Con}>Se connecter</button>

                    </div>
                </div>

            </div>

        </>
    )

}

export default Connexion;