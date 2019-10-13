import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategories, selectCategory, changeOffset} from '../actions/actionCreators';
import CatalogCards from './CatalogCards.js';
import {NavLink} from 'react-router-dom';

function Catalog(props) {
    const {items, categories, categoriesLoading} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();
    const urlCategories =  "http://localhost:7070/api/categories";

    useEffect(() => {
        dispatch(fetchCategories(urlCategories))
    }, [dispatch])

    const onSelectCategory = (item) => {
        dispatch(selectCategory(item))
    }

    const onLoadMore = () => {
        dispatch(changeOffset())        
    }

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
                {props.children}
            {(categoriesLoading && <div className='preloader'><span></span><span></span><span></span><span></span></div>) ||
            
            <>
                <ul className="catalog-categories nav justify-content-center">
                            <NavLink onClick={() => onSelectCategory("Все")} to="#" className="nav-link" activeClassName="active" key={"Все"}>
                                <li className="nav-item">Все</li>
                            </NavLink>
                        {categories.map(item =>         
                            <NavLink onClick={() => onSelectCategory(item)} to="#" className="nav-link" activeClassName="active" key={item.id}>
                                <li className="nav-item">{item.title}</li>
                            </NavLink>)}     
                </ul>               
                <CatalogCards/>
                {items.length === 6 && 
                    <div className="text-center">
                        <button type="button" onClick = {() => onLoadMore()} className="btn btn-outline-primary">Загрузить ещё</button>
                    </div>}
            </>}
        </section>
  )
}

export default Catalog

