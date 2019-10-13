import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchServices} from '../actions/actionCreators';

import Card from './Card.js';

function CatalogCards(props) {
    const {items, catalogItems, selectedCategory, offset, searchRequest, loading, error} = useSelector(state => state.serviceList);
    const dispatch = useDispatch(); 
   
    const setCatalogFetchUrl = () => {
            let itemsUrl = `http://localhost:7070/api/items${(selectedCategory === "Все" || selectedCategory === undefined) ? "" : `?categoryId=${selectedCategory.id}`}`;
            if (offset !== 6) {
                itemsUrl = itemsUrl + ((itemsUrl.indexOf('?')===-1) ? `?offset=${offset}` : `&offset=${offset}`);}
            if(searchRequest !== "") {
                itemsUrl = itemsUrl + (itemsUrl.indexOf('?')!==-1 ? `&q=${searchRequest}` : `?q=${searchRequest}`)}
            return itemsUrl;
    }

    useEffect(() => {
        const itemsUrl = setCatalogFetchUrl()
        dispatch(fetchServices(itemsUrl))
    }, [dispatch, selectedCategory, searchRequest, offset])  

    return (
            <>
                {(loading && <div className='preloader'><span></span><span></span><span></span><span></span></div>) ||
                (error && <p className='error'>Произошла ошибка!</p>) ||
                <div className="row">
                    {(offset > 6 ? catalogItems : items).map(item => <Card item={item} key={`catalog${item.id}`}/>)}  
                </div>}
                
            </>
    )
}

export default CatalogCards

