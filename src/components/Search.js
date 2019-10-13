import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from "react-router-dom";
import {changeSearchInput, changeSearchRequest, changeServiceField} from '../actions/actionCreators';

function Search(props) {
    const {search} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();
    const {searchClass, isGo, setIsOpen} = props; 
    
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(changeSearchRequest());
        if(search !== "") {        
            if (isGo === "Yes") {                
                const {name, value} = event.target;                        
                dispatch(changeServiceField(name, value));                         
            }
        }    
    }

    // const onBlur = () => {
    //     if(search === "") {
    //         setIsOpen("");
    //     }
    // }
    // onBlur={() => onBlur()}

    const onChangeInput = (event) => {
        const {value} = event.target;
        dispatch(changeSearchInput(value));
    }   
   
    return (
        <form onSubmit={(event) => onSubmit(event)} className={`${searchClass} form-inline`}>
            <input type="text" name="search" value={search} onChange={(event) => onChangeInput(event)} className="form-control" placeholder="Поиск"/>
        </form>
    )
}
export default withRouter(Search)


