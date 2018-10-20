import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBarContainer from "../../containers/header/appbar-container";

class Header extends Component {
    render() {
        return (
            <div>
                <AppBarContainer/>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/faq'>F.A.Q.</Link></li>
                </ul>
            </div>
        );
    }

}

export default Header;