import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS, 

  FETCH_HITS_SUCCESS,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,

  CHANGE_CATEGORY,
  CHANGE_OFFSET,
  CHANGE_SEARCH_REQUEST,
  CHANGE_SEARCH_INPUT, 
  FETCH_ID_SUCCESS,

  FETCH_HITS_REQUEST,
  FETCH_HITS_FAILURE,

  FETCH_ID_REQUEST,
  FETCH_ID_FAILURE,
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  
} from '../actions/actionTypes'

const initialState = {
  items: [],
  hits: [],
  categories: [],
  selectedCategory: undefined,
  offset: 6,
  search: "",    
  itemsUrl: "http://localhost:7070/api/items",
  idItem: [], 
  loading: false,
  error: null,

  hitsLoading: false,
  hitsError: null,

  categoriesLoading: false,
  categoriesError: null,

  loadingId: false,
  errorId: null,
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    
    case FETCH_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SERVICES_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };

    case FETCH_SERVICES_SUCCESS:
      const {items} = action.payload;
      return {
        ...state,
        items,        
        loading: false,
        error: null,
        
      };
//----------------------------------------------------
    case FETCH_ID_SUCCESS:
      const {idItem} = action.payload;
      return {
        ...state,
        idItem,        
        loadingId: false,
        errorId: null,
      };

    case FETCH_ID_FAILURE:
      const {errorId} = action.payload;
      return {
        ...state,
        loadingId: false,
        errorId,
      };

    case FETCH_ID_REQUEST:
      return {
        ...state,
          loadingId: true,
          errorId: null,          
      };
// --------------------------------------------------
    case FETCH_HITS_SUCCESS:
        const {hits} = action.payload;
        return {
          ...state,          
          hits,
          hitsLoading: false,
          hitsError: null,         
        };

    case FETCH_HITS_FAILURE:
        const {hitsError} = action.payload;
        return {
          ...state,          
          hitsLoading: false,
          hitsError,
        };

    case FETCH_HITS_REQUEST:
      return {
        ...state,
          hitsLoading: true,
          hitsError: null,          
      };
// ------------------------------------------
    case FETCH_CATALOG_SUCCESS:
          const {cards} = action.payload;
          return {
            ...state,
            cards,            
            loadingCatalog: false,
            errorCatalog: null,
          };

    case FETCH_CATALOG_FAILURE:
          const {errorCatalog} = action.payload;
          return {
            ...state,
            loadingCatalog: false,
            errorCatalog,
          };

    case FETCH_CATALOG_REQUEST:
          return {
            ...state,
            loadingCatalog: true,
            errorCatalog: null,
          };
// ----------------------------------------------------------------
    case FETCH_CATEGORIES_SUCCESS:
            const {categories} = action.payload;
            return {
              ...state,
              categories,            
              loading: false,
              error: null,
            };

    case FETCH_CATEGORIES_FAILURE:
              const {categoriesError} = action.payload;
              return {
                ...state,          
                categoriesLoading: false,
                categoriesError,
              };
      
    case FETCH_CATEGORIES_REQUEST:
            return {
              ...state,
              categoriesLoading: true,
              categoriesError: null,          
            };
// -------------------------------------------------------------------------------
    case CHANGE_CATEGORY:
        const {selectedCategory} = action.payload;
        return {      
          ...state,
          selectedCategory,
          offset: 6,      
          itemsUrl: initialState.itemsUrl + (!selectedCategory.id ? "" : `?categoryId=${selectedCategory.id}`),
          loading: false,
          error: null,
        };

    case CHANGE_SEARCH_REQUEST:
        const  urlWithoutSearch = state.itemsUrl.indexOf('?q')!==-1 ? (state.itemsUrl.split('?q').slice(0, 1).join('')) : state.itemsUrl.split('&q').slice(0, 1).join('')
      return {      
        ...state,
        selectedCategory,    
        offset: 6,      
        itemsUrl: urlWithoutSearch + (urlWithoutSearch.indexOf('?')!==-1 ? `&q=${state.search}` : `?q=${state.search}`),
        loading: false,
        error: null,
      };

    case CHANGE_SEARCH_INPUT:
      const {value} = action.payload;
      return {      
        ...state,
        search: value,
        loading: false,
        error: null,
      }
    
    case CHANGE_OFFSET:
        const  urlWithoutOffset = state.itemsUrl.indexOf('?offset')!==-1 ? (state.itemsUrl.split('?offset').slice(0, 1).join('')) : state.itemsUrl.split('&offset').slice(0, 1).join('')
   
        return {
            ...state,
            offset: state.offset+6,
            // urlWithoutOffset: state.itemsUrl.split('?offset' || '&offset' || null).slice(0, 1).join(''),          
            itemsUrl: urlWithoutOffset + ((urlWithoutOffset===initialState.itemsUrl) ? `?offset=${state.offset}` : `&offset=${state.offset}`),       
            loading: false,
            error: null,
        };

    default:
      return state;
  }
}
