import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchServices} from '../actions/actionCreators';
import Card from './Card.js';

function Hits(props) {
    const {hits, hitsLoading, hitsError} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();  
    const urlHits = 'http://localhost:7070/api/top-sales';

    useEffect(() => {
        dispatch(fetchServices(urlHits))
    }, [dispatch])

    return (
        (hits!==undefined && hits.length!==0) && 
                <section className="top-sales">
                    <h2 className="text-center">Хиты продаж!</h2>
                    <div className="row">
                        {   (hitsLoading && <div className='preloader'><span></span><span></span><span></span><span></span></div>) ||
                            (hitsError && <p className='error'>Произошла ошибка!</p>) ||
                            hits.map(item => <Card item={item} key={`hits${item.id}`}/>)}                       
                    </div>
                </section>
    )
}

export default Hits
