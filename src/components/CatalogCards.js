import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchServices} from '../actions/actionCreators';
import Card from './Card.js';

function CatalogCards(props) {
    const {items, itemsUrl, offset} = useSelector(state => state.serviceList);
    const dispatch = useDispatch(); 
   
    useEffect(() => {
        dispatch(fetchServices(itemsUrl))
    }, [dispatch, itemsUrl, offset])  

    return (
            <>
                <div className="row">
                    {items.map(item => <Card item={item} key={`catalog${item.id}`}/>)}  
                </div>
                
            </>
    )
}

export default CatalogCards

