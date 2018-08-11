// Action type to fetch single stock symbol
export const FETCH_STOCK_REQUEST = 'FETCH_STOCK_REQUEST';
export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';

// Action type to fetch quote for multiple stock symbols, fetched from localstorage
export const FETCH_MULTISTOCK_REQUEST = 'FETCH_MULTISTOCK_REQUEST';
export const FETCH_MULTISTOCK_SUCCESS = 'FETCH_MULTISTOCK_SUCCESS';

// Action type to remove single stock symbol
export const REMOVE_STOCK_SYMBOL = 'REMOVE_STOCK_SYMBOL';

// Action type to handle error
export const FETCH_STOCK_ERROR = 'FETCH_STOCK_ERROR';

export const fetchStockRequestAction = (stockName) => ({
	type: FETCH_STOCK_REQUEST,
	payload: stockName
});

export const fetchStockSuccessAction = (stockdata) => ({
	type: FETCH_STOCK_SUCCESS,
	payload: stockdata
});

export const removeStockSymbolAction = (stockName) => ({
	type: REMOVE_STOCK_SYMBOL,
	payload: stockName
});

export const fetchMultiStockRequestAction = (stockNames) => ({
	type: FETCH_MULTISTOCK_REQUEST,
	payload: stockNames
});
export const fetchMultiStockSuccessAction = (stockdata) => ({
	type: FETCH_MULTISTOCK_SUCCESS,
	payload: stockdata
});

export const fecthStockErrorAction = (error) => ({
	type: FETCH_STOCK_ERROR,
	payload: error
})