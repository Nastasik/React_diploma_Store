import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchServices} from '../actions/actionCreators';
import Card from './Card.js';

function CatalogCards(props) {
    const {items, itemsUrl, offset, loading, error} = useSelector(state => state.serviceList);
    const dispatch = useDispatch(); 
   
    useEffect(() => {
        dispatch(fetchServices(itemsUrl))
    }, [dispatch, itemsUrl, offset])  

    return (
            <>
                {(loading && <div className='preloader'><span></span><span></span><span></span><span></span></div>) ||
                (error && <p className='error'>Произошла ошибка!</p>) ||
                <div className="row">
                    {items.map(item => <Card item={item} key={`catalog${item.id}`}/>)}  
                </div>}
                
            </>
    )
}

export default CatalogCards

