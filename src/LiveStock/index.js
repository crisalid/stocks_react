import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchStockRequestAction, removeStockSymbolAction, fetchMultiStockRequestAction } from './actions';

import { Container, Row, Col , Button} from 'reactstrap';


class LiveStock extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			companyName: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.refreshStockData = this.refreshStockData.bind(this);
		this.removeStockData = this.removeStockData.bind(this);
		this.getStockRowText = this.getStockRowText.bind(this);
	}

	handleInputChange(event){
		const inputValue = event.target.value;
		this.setState({companyName: inputValue});
	}
	
	// Load quote for symbol when form is submitted
	handleFormSubmit(event){
		this.props.fetchStockRequestAction(this.state.companyName);
		this.setState({companyName: ''});
		event.preventDefault();
	}
	refreshStockData(symbol){
		this.props.fetchStockRequestAction(symbol);
	}
	removeStockData(symbol){
		this.props.removeStockSymbolAction(symbol);
	}
	componentDidUpdate(){
		const symbols = Object.keys(this.props.stocks);
		if(localStorage && symbols.length){
			localStorage.setItem('symbols', JSON.stringify(symbols));
		}
	}

	// Load quotes for symbols stored in localstorage
	componentDidMount(){
		let symbols = localStorage && localStorage.getItem('symbols') || '[]';
		symbols = JSON.parse(symbols);
		this.props.fetchMultiStockRequestAction(symbols);
	}

	// Generate HTML for a stock row
	getStockRowText(stock){
		const currentStock = this.props.stocks[stock];
		return (<Row key={stock} className="stock-row" style={{paddingBottom: 5}}>
			<Col sm="1">{currentStock.symbol}</Col>
			<Col sm="2">{currentStock.companyName}</Col>
			<Col sm="2">{currentStock.latestPrice}</Col>
			<Col sm="2">{currentStock.change}</Col>
			<Col sm="3">
				<Button color="info" onClick={() => this.refreshStockData(stock)} >Reload</Button>{' '} 
				<Button color="danger" onClick={() => this.removeStockData(stock)} >Remove</Button>
			</Col>
			<Col sm="2">{currentStock.latestUpdate}</Col>
		</Row>);
	}

	render(){
		const stockSymbols = Object.keys(this.props.stocks);

		return (<div>
			MyStocks App
			<form onSubmit={this.handleFormSubmit}>
				<input value={this.state.companyName} onChange={this.handleInputChange} />
				<input type="submit" value="add"/>
			</form>

			{this.props.errorMessage && <p className='danger'>{this.props.errorMessage}</p>}

			<Container>
			{stockSymbols.map(this.getStockRowText)}
			</Container>
			</div>);
	}
}
const mapStateToProps = (state) => {
	console.log('state',state);
	return {
		stocks: state.liveStocksReducer.stockData,
		errorMessage: state.liveStocksReducer.errorMessage
	}
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
	fetchStockRequestAction: fetchStockRequestAction,
	removeStockSymbolAction: removeStockSymbolAction,
	fetchMultiStockRequestAction: fetchMultiStockRequestAction
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(LiveStock);
