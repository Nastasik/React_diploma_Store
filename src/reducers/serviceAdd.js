import {
  CHANGE_SERVICE_FIELD,
  CHANGE_ORDER_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,  

  SELECT_SIZE,
  SELECT_COUNT,
  SELECT_CART_ITEM_PROPERTIES_TO_SAVE,
  CART_ITEM_TO_INITIAL,  
  CHANGE_COST,
  
  GET_LOCALSTORAGE_SUCCESS,
  GET_LOCALSTORAGE_FAILURE,
  SET_LOCALSTORAGE_SUCCESS,
  SET_LOCALSTORAGE_FAILURE,
  REMOVE_SERVICE,

} from '../actions/actionTypes'

const initialState = {
  cartItem: {
    id: null,
    title: "",
    price: null,
    count: 1, //отображается при выборе количества
    countStorage: 1, //суммарное количество, вкл предыдущие заказы
    size: null,  
    cost: 0,  
  },
  
  totalCost: 0,

  order: {
    owner: {
      phone: "",
      address: "",
    },
    items: []
    },
    loading: false,
    error: null,
    success: false,
  };

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,              
      };

    case ADD_SERVICE_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        success: false,
        error,       
      };

    case ADD_SERVICE_SUCCESS:          
      return {
        ...initialState,        
        success: true,
      };

    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const { item } = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        }
    }; 

    case CHANGE_ORDER_FIELD:     
      const { order } = state;
      return {
        ...state,
        order: {
          ...order,
          owner: {
            ...state.order.owner,
            [action.payload.name]: action.payload.value,
          }
        }
    }; 

  //  *****************************************************************

  case SELECT_SIZE:    
    const {size} = action.payload;
    return {
      ...state,
      cartItem: {
        ...state.cartItem,
        size: size,
      }        
    };

  case SELECT_CART_ITEM_PROPERTIES_TO_SAVE:
      const {cost} = state.cartItem;
      const {id, title, price} = action.payload;
      return {
        ...state,
        cartItem: {
          ...state.cartItem,
          id: id,
          title: title,
          price: price, 
          cost: (cost === 0) ? price : cost,         
        }        
      };

  case SELECT_COUNT:      
      const {count} = action.payload;
      return {
        ...state,
        cartItem: {
          ...state.cartItem,
          count: count,         
        }        
      };

  case CHANGE_COST:
    const {newCount, idPrice} = action.payload;
    const countStorage = (localStorage.getItem(state.cartItem.id) !== null) ?
        (JSON.parse(localStorage.getItem(state.cartItem.id)).count + newCount) : newCount;
   
    return {
      ...state,
      cartItem: {
        ...state.cartItem,  
        countStorage: countStorage,     
        cost: idPrice * countStorage,
      }   
    };

  case CART_ITEM_TO_INITIAL: 
      return {
        ...state,
        cartItem: {
          ...initialState
        }
      }

  case GET_LOCALSTORAGE_FAILURE:      
      return {
          ...state,
          loading: false,
          error,
          success: false,
      };
    
  case GET_LOCALSTORAGE_SUCCESS:
      const {cart, totalCost} = action.payload;
      return {
           ...state,
           order: {
            ...state.order,
            items: cart,
          }, 
          totalCost,       
          loading: false,
          error: null,
          success: false,
      };    

      case SET_LOCALSTORAGE_FAILURE:        
        return {
            ...state,
            loading: false,
            error,
            success: false,
        };
      
    case SET_LOCALSTORAGE_SUCCESS:        
        return {
          ...initialState,           
        };  

        case REMOVE_SERVICE:
          const {removeId} = action.payload;
         
          return {
            ...state,
            totalCost: 0,
            order: {
              ...state.order,
              items: state.order.items.filter(item => item.id !== removeId)}
          };

    default:
      return state;
  }
}
