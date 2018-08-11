import {FETCH_STOCK_SUCCESS, REMOVE_STOCK_SYMBOL, FETCH_MULTISTOCK_SUCCESS,FETCH_STOCK_ERROR} from './actions';

const defaultState = {
	stockData: {}, // { symbol: quote_object }
	errorMessage: null
}

const liveStocksReducer = (state = defaultState, {type, payload})=> {
	switch(type){

		case FETCH_STOCK_SUCCESS:
			//console.log(payload,'reducer', state.stockData)
			const stockData = {...state.stockData};
				stockData[payload.symbol] = payload;
			return {
				stockData,
				errorMessage: null
			};

		case REMOVE_STOCK_SYMBOL:
			let allStockData = {...state.stockData};
				allStockData[payload] && delete allStockData[payload];
			return {
				stockData: allStockData,
				errorMessage: null
			}

		case FETCH_MULTISTOCK_SUCCESS:
			return {
				stockData: payload,
				errorMessage: null
			};

		case FETCH_STOCK_ERROR:
			return {
				...state,
				errorMessage: payload
			}

		default:
			return state;
	}
}

export default liveStocksReducer;