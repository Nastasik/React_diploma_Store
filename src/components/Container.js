import React from 'react';
import Banner from '../css/img/banner.jpg';

function Container(props) {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <div className="banner">
                        <img src={Banner} className="img-fluid" alt="К весне готовы!"/>
                        <h2 className="banner-header">К весне готовы!</h2>
                    </div>
                    {props.children}
                </div>
            </div>
        </main>
    )
}

export default Container


