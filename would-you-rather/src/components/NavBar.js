import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class NavBar extends Component {
    render() {
        return (
            // <nav className="navbar navbar-expand-lg navbar-light bg-light">
            //         <ul className="navbar-nav">
            //             <li className="nav-item">
            //             <a className="nav-link active" aria-current="page" href="#">Home</a>
            //             </li>
            //             <li className="nav-item">
            //             <a className="nav-link" href="#">Features</a>
            //             </li>
            //             <li className="nav-item">
            //             <a className="nav-link" href="#">Pricing</a>
            //             </li>
            //             <li className="nav-item dropdown">
            //             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            //                 Dropdown link
            //             </a>
            //             <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            //                 <li><a className="dropdown-item" href="#">Action</a></li>
            //                 <li><a className="dropdown-item" href="#">Another action</a></li>
            //                 <li><a className="dropdown-item" href="#">Something else here</a></li>
            //             </ul>
            //             </li>
            //         </ul>
            // </nav>
            <nav className="navbar navbar-expand navbar-dark bg-primary">
                <ul className="navbar-nav ms-2">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/" activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/new" activeClassName="active">
                            Not Home
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
