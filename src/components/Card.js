import React from 'react';
import {Link} from 'react-router-dom';

function Card(props) {
    const {item} = props;
    
    return (
        item!==undefined &&
         <div className="col-4">
            <div className="card catalog-item-card">
                <img src={item.images[0]}
                    className="card-img-top img-fluid" alt={item.title}/>
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    {/* {item.title.split(' ').slice(0, 2).join(' ')} */}
                    <p className="card-text">{item.price}</p>
                    <Link to={`/products/${item.id}.html`} className="btn btn-outline-primary">Заказать</Link>
                </div>
            </div>
        </div>
    )
}


export default Card

