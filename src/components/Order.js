import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchServices, selectSize, selectCount, selectProperties, setLocalStorageItems, changeCost} from '../actions/actionCreators';

function Order(props) {
    const {idItem, loadingId, errorId} = useSelector(state => state.serviceList);
    const {cartItem} = useSelector(state => state.serviceAdd);
    const dispatch = useDispatch();     
    const itemId = props.match.params.id;
    const urlItem =  `http://localhost:7070/api/items/${itemId}`;
    
    const changeCount = (operation) => {
        let newCount = cartItem.count + operation;         
        if(newCount === 0 || newCount === 11) return;        
        dispatch(selectCount(newCount));
        dispatch(changeCost(newCount, idItem.price));  
    }

    const changeSize = (event) => {
        const newSize = event.target.innerHTML;       
        dispatch(selectSize(newSize));
        const idCart = parseInt(`${idItem.id}${newSize}`);
        dispatch(selectProperties(idCart, idItem.title, idItem.price));                 
    }

    const toStorage = () => {
        if(cartItem.size !== null) {
            dispatch(setLocalStorageItems(cartItem));            
            props.history.push("/cart.html");
        }
    }
        
    useEffect(() => {
        dispatch(fetchServices(urlItem)); 
    }, [dispatch])

    return (

        (loadingId && <div className='preloader'><span></span><span></span><span></span><span></span></div>) ||
        (errorId && <p className='error'>Произошла ошибка!</p>) ||

        <section className="catalog-item">
            <h2 className="text-center">{idItem.title}</h2>
            <div className="row">
                <div className="col-5">
                    {idItem.images && <img src={idItem.images[0]} className="img-fluid" alt=""/>}
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{idItem.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{idItem.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{idItem.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{idItem.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{idItem.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{idItem.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        {idItem.sizes!==undefined && (idItem.sizes.map(item => item.avalible !== false).length !== 0) &&
                            <>
                                <p>Размеры в наличии: {idItem.sizes.map(item =><span className={`catalog-item-size ${cartItem.size===item.size? "selected" : ""}`}                                                                                    
                                                                                    onClick={(event) => changeSize(event)} 
                                                                                    key={`${item.size}${itemId}`}>
                                                                                            {item.size}
                                                                                </span>)}</p>
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                                    <button onClick={() => changeCount(-1)} className="btn btn-secondary">-</button>
                                                    <span className="btn btn-outline-primary">{cartItem.count}</span>
                                                    <button onClick={() => changeCount(+1)} className="btn btn-secondary">+</button>
                                                </span></p>
                            </>
                        }
                    </div>
                    <button onClick={() => toStorage()} className="btn btn-danger btn-block btn-lg">В корзину</button>
                </div>
            </div>
        </section>
    )
}

export default withRouter(Order)

