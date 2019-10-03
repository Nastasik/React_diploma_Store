import React, {useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getLocalStorageItems, removeServiceItem, changeOrderField, addService} from '../actions/actionCreators';

function Cart(props) {    
    const {order, totalCost, loading, error, success} = useSelector(state => state.serviceAdd);
    const dispatch = useDispatch();
    
    const handleChange = event => {
        const {name, value} = event.target;
        dispatch(changeOrderField(name, value));        
    };

    const handleSubmit = event => {    
        event.preventDefault();    
        dispatch(addService(order.owner.phone, order.owner.address));          
    };

    const removeStorageItem = (id) => {
        localStorage.removeItem(id);
        dispatch(removeServiceItem(id));        
    }

    useEffect(() => {
        dispatch(getLocalStorageItems());       
    }, [dispatch])  

    return (
        <>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                {                    
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Размер</th>
                                <th scope="col">Кол-во</th>
                                <th scope="col">Стоимость</th>
                                <th scope="col">Итого</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items && order.items.map((item, i) => 
                                <tr key={item.id}>
                                    <th scope="row">{i + 1}</th>
                                    <td><Link to={`/products/${`${item.id}`.slice(0,-2)}.html`}>{item.title}</Link></td>
                                    <td>{item.size}</td>
                                    <td>{item.countStorage}</td>
                                    <td>{item.price}</td>
                                    <td>{item.cost}</td>
                                    <td><button onClick = {() => removeStorageItem(item.id)} className="btn btn-outline-danger btn-sm">Удалить</button></td>
                                </tr>)}
                            <tr>
                                <td colSpan={5} className="text-right">Общая стоимость</td>
                                <td>{totalCost}</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </section>
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                {(error && <p className='error'>Произошла ошибка!</p>) ||
                 (loading && <div className='preloader'><span></span><span></span><span></span><span></span></div>) ||
                 (success && <p className='success'>Заказ оформлен</p>) ||
                <div className="card" style={{"maxWidth": "30rem", "margin": "0 auto"}}>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input className="form-control" name="phone" onChange={handleChange} id="phone" placeholder="Ваш телефон" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input className="form-control" name="address" onChange={handleChange} id="address" placeholder="Адрес доставки" required/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="agreement" required/>
                            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                    </form>    
                </div>}
            </section>
        </>
    )
}

export default withRouter(Cart)

