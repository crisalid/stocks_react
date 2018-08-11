
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {FETCH_STOCK_REQUEST, fetchStockSuccessAction,
	FETCH_MULTISTOCK_REQUEST, fetchMultiStockSuccessAction,
	fecthStockErrorAction
} from './actions';

function getStockApi(symbolName){
	console.log('symbolName', symbolName)
	// Fetch data from server
	return axios.get('https://api.iextrading.com/1.0/stock/'+ symbolName +'/quote').then(res=> res)
		.catch(function(err){ 
			console.log('api error', err);
			return {error: symbolName+': symbol not found'};
		});
}
function getMultiStockApi(symbolNames){
	console.log('symbolName', symbolNames)
	// Fetch data from server, multiple symbols
	return axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols='
		+ symbolNames.join() +'&types=quote&range=1m&last=5').then(res=> res)
		.catch(function(err){ 
			console.log('api error', err);
		});
}

// Fetch quote from server and dispatch success to reducer
function* fetchStockFromServer(reqData){
	try{
		const {data, error} = yield call(getStockApi, reqData.payload);
		if(error){
			yield put(fecthStockErrorAction(error));
		}else {
			yield put(fetchStockSuccessAction(data));
		}
		
	}catch(e){
		//handle failed cases
		console.log(e);
	}
	
}
function* fetchMultiStockFromServer(reqData){
	try{console.log('multi', reqData);
		const {data} = yield call(getMultiStockApi, reqData.payload);
		let fullData = {};
		reqData.payload.map(stock => fullData[stock] = data[stock].quote);
		console.log(data, 'full', fullData);
		yield put(fetchMultiStockSuccessAction(fullData));
	}catch(e){
		//handle failed cases
		console.log(e);
	}
	
}

// Watch dispatch actions for LiveStock app
function* rootSaga(){
	yield takeLatest(FETCH_STOCK_REQUEST , fetchStockFromServer);
	yield takeLatest(FETCH_MULTISTOCK_REQUEST , fetchMultiStockFromServer)
}

export {rootSaga};
