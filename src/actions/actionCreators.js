import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,  
  REMOVE_SERVICE, 

  FETCH_HITS_SUCCESS,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_ID_SUCCESS,

  CHANGE_CATEGORY,
  CHANGE_OFFSET,
  CHANGE_SEARCH_REQUEST,
  CHANGE_SEARCH_INPUT,
  SELECT_SIZE,
  SELECT_COUNT,
  SELECT_CART_ITEM_PROPERTIES_TO_SAVE,
  CART_ITEM_TO_INITIAL,  
  CHANGE_COST,
 
  GET_LOCALSTORAGE_SUCCESS,
  GET_LOCALSTORAGE_FAILURE,
  SET_LOCALSTORAGE_SUCCESS,
  SET_LOCALSTORAGE_FAILURE,

  CHANGE_ORDER_FIELD, 
  
  FETCH_HITS_REQUEST,
  FETCH_HITS_FAILURE,
  FETCH_ID_REQUEST,
  FETCH_ID_FAILURE,
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,

} from './actionTypes';

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const changeOrderField = (name, value) => ({
  type: CHANGE_ORDER_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeServiceItem = removeId => ({
  type: REMOVE_SERVICE,
  payload: {
    removeId,
  },
});

// ***********************************************************************

export const selectSize = (size) => ({
  type: SELECT_SIZE,
  payload: {  
    size,        
  },
});

export const selectCount = (count) => ({
  type: SELECT_COUNT,
  payload: {  
    count,                   
  },
});

export const changeCost = (newCount, idPrice) => ({
  type: CHANGE_COST,
  payload: {  
    newCount,
    idPrice,                   
  },    
});


export const selectProperties = (id, title, price) => ({
  type: SELECT_CART_ITEM_PROPERTIES_TO_SAVE,
  payload: {  
    id, 
    title,
    price,                  
  },
});

export const cartItemToInitial = () => ({
  type: CART_ITEM_TO_INITIAL,  
});

// *****************************************************
export const getLocalStorageItems = () =>  async (dispatch) =>{
  
  try {    
    let cart = Object.entries(localStorage).map((item) => item[1]);      
    cart = cart.map((item) => JSON.parse(item));
    const costs = cart.map((item) => item.cost);
    const totalCost = costs.reduce((sum, current) => sum + current);
    return dispatch(getLocalStorageSuccess(cart, totalCost));

  } catch (error) {
    return dispatch(getLocalStorageFailure(error.message));
  }

};

export const getLocalStorageFailure = error => ({
  type: GET_LOCALSTORAGE_FAILURE,
  payload: {
    error,
  },
});

export const getLocalStorageSuccess = (cart, totalCost) => ({
  type: GET_LOCALSTORAGE_SUCCESS,
  payload: {   
    totalCost,
    cart,    
  },
});

export const setLocalStorageItems = (cartItem) =>  async (dispatch) =>{
 
  try {    
    localStorage.setItem(`${cartItem.id}`, JSON.stringify(cartItem));
    return dispatch(setLocalStorageSuccess());
  } catch (error) {
    return dispatch(setLocalStorageFailure(error.message));
  }
};

export const setLocalStorageFailure = error => ({
  type: SET_LOCALSTORAGE_FAILURE,
  payload: {
    error,
  },
});

export const setLocalStorageSuccess = () => ({
  type: SET_LOCALSTORAGE_SUCCESS,
});

// ********************************************************

export const selectCategory = (selectedCategory) => ({
  type: CHANGE_CATEGORY,
  payload: {
    selectedCategory,    
  },
});

export const changeOffset = (offset) => ({
  type: CHANGE_OFFSET,
  payload: {    
    offset,    
  },
});

export const changeSearchInput = (value) => ({
  type: CHANGE_SEARCH_INPUT,
  payload: {    
    value,
  },
});

export const changeSearchRequest = (search) => ({
  type: CHANGE_SEARCH_REQUEST,
  payload: {    
    search,    
  },
});
// ===============================================================

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchServices = (url) => async (dispatch) => {
  dispatch(fetchServicesRequest());
  
  try {    
    const response = await fetch(`${url}`);

    if(!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));  

  } catch (error) {   
    dispatch(fetchServicesFailure(error.message));
  }
};
// ---------------------------------------------------
export const fetchIdSuccess = idItem => ({
  type: FETCH_ID_SUCCESS,
  payload: {
    idItem,
  },
});

export const fetchIdRequest = () => ({
  type: FETCH_ID_REQUEST,
});

export const fetchIdFailure = errorId => ({
  type: FETCH_ID_FAILURE,
  payload: {
    errorId,
  },
});

export const fetchId = (url) => async (dispatch) => {
  
  dispatch(fetchIdRequest());
 
  try {    
    const response = await fetch(`${url}`);

    if(!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchIdSuccess(data));

  } catch (error) {   
    dispatch(fetchIdFailure(error.message));  
  }
};
//------------------------------------------------------
export const fetchHitsSuccess = hits => ({
  type: FETCH_HITS_SUCCESS,
  payload: {
    hits,
  },
});

export const fetchHitsRequest = () => ({
  type: FETCH_HITS_REQUEST,
});

export const fetchHitsFailure = hitsError => ({
  type: FETCH_HITS_FAILURE,
  payload: {
    hitsError,
  },
});

export const fetchHits = (url) => async (dispatch) => {
  dispatch(fetchHitsRequest());
  
  try {    
    const response = await fetch(`${url}`);
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchHitsSuccess(data));
  } catch (error) {   
    dispatch(fetchHitsFailure(error.message));
  }
};
//---------------------------------------------------------
// export const fetchCatalogSuccess = cards => ({
//   type: FETCH_CATALOG_SUCCESS,
//   payload: {
//     cards,
//   },
// });

// export const fetchCatalogRequest = () => ({
//   type: FETCH_CATALOG_REQUEST,
// });

// export const fetchCatalogFailure = errorCatalog => ({
//   type: FETCH_CATALOG_FAILURE,
//   payload: {
//     errorCatalog,
//   },
// });
// --------------------------------------------------------------
export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    categories,
  },
});

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = categoriesError => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    categoriesError,
  },
});

export const fetchCategories = (url) => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  
  try {    
    const response = await fetch(`${url}`);

    if(!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchCategoriesSuccess(data));
    
  } catch (error) {   
    dispatch(fetchCategoriesFailure(error.message));
  }
};
// ------------------------------------------------------------
// export const fetchServices = (url) => async (dispatch) => {
  
//   // dispatch(fetchCatalogRequest());
//   dispatch(fetchCategoriesRequest());
//   dispatch(fetchIdRequest());
//   dispatch(fetchHitsRequest());
//   dispatch(fetchServicesRequest());
  
//   try {    
//     const response = await fetch(`${url}`);

//     if(!response.ok) {
//       throw new Error(response.statusText);
//     }
//     const data = await response.json();

//     if(url==="http://localhost:7070/api/categories") {
//       return dispatch(fetchCategoriesSuccess(data));
//     }

//     if(url==="http://localhost:7070/api/top-sales") {
//       return dispatch(fetchHitsSuccess(data));
//     }

//     if(url.indexOf("http://localhost:7070/api/items/")!==-1) {
//       return dispatch(fetchIdSuccess(data));
//     }   
    
//     dispatch(fetchServicesSuccess(data));
    

//   } catch (error) {   
   
//     dispatch(fetchCategoriesFailure(error.message));
//     dispatch(fetchIdFailure(error.message));
//     dispatch(fetchHitsFailure(error.message));
//     dispatch(fetchServicesFailure(error.message));
//   }
// };


// =================================================================

export const addServiceRequest = (order) => ({
  type: ADD_SERVICE_REQUEST,
      payload: {
        order  
      },
})

export const addServiceFailure = message => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    message,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const addService = () => async (dispatch, getState) => {
  dispatch(addServiceRequest());
  const {serviceAdd: {order: {owner, items}}} = getState();

  try {
    const response = await fetch('http://localhost:7070/api/order', {
      method: 'POST',
      headers: {  
        'Access-Control-Allow-Origin': 'http://localhost:7070/api/order',      
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({owner, items}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    window.localStorage.clear();
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }

  dispatch(fetchServices());
};

// ==========================================================================

