import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar(props) {



    return (<>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="src/components#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Projets choisit
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="src/components#">Action</a></li>
                                    <li><a className="dropdown-item" href="src/components#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><a className="dropdown-item" href="src/components#">Something else here</a></li>
                                </ul>
                            </li>

        </>
    )

}

export default Navbar;