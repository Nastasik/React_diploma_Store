import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import logo from '../css/img/header-logo.png';
import Search from './Search.js';
import {changeSearchRequest} from '../actions/actionCreators';

function Header(props) {    
    const {search} = useSelector(state => state.serviceList);
    const {order} = useSelector(state => state.serviceAdd);
    const [isOpen, setIsOpen] = useState('');
    const dispatch = useDispatch(); 

    const openSearch = (event) => {
        if (isOpen === '')  {
            setIsOpen('open')
        } else {
            if(search !== "") { 
                dispatch(changeSearchRequest());
                props.history.push("/catalog.html");
            }
            setIsOpen(''); 
        }      
    }    

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="Bosa Noga"/>
                        </Link>

                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Главная</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/catalog.html">Каталог</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about.html">О магазине</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contacts.html">Контакты</Link>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div onClick={() => openSearch()} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                                    <Link to="/cart.html">
                                        <div className="header-controls-pic header-controls-cart">
                                            {order.items.length !== 0 && 
                                                <div className="header-controls-cart-full">{order.items.length}</div>}
                                            <div className="header-controls-cart-menu"></div>
                                        </div>
                                    </Link>
                                </div>
                                <Search isGo="Yes"  setIsOpen={setIsOpen} searchClass={`header-controls-search-form ${isOpen !== 'open' ? "invisible" : ""}`}/>                                
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}


export default withRouter(Header)


