import React, {useState} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, HeaderSection } from '../MarketContent';
import CancelButton from './CancelButton';
import { cancelOrder } from '../../../../actions/marketActions';
import { updateBalance } from '../../../../actions/nearActions';

const OpenOrders = ({orders, market, dispatch, account, contract, accountId, updateMarketOrders}) => {
	const [selectedOrder, setSelectedOrder] = useState(null)
	const callUpdateBalance = () => dispatch(updateBalance(contract, accountId));
	
	const StyledHeader = styled(Header)`
		text-align: center;
		width: 25%;
	`

	const buttons = orders.map((order, i) => {
		const callCancelOrder = () => {
			dispatch(cancelOrder(account, market.id, order.outcome, order.id, callUpdateBalance, updateMarketOrders));
		};
		let selected = i === selectedOrder;
		let label = market.outcome_tags[order.outcome];
		if (market.outcomes === 2) {
			label = order.outcome === 0 ? "NO" : "YES";
		}
		return <CancelButton label={label} cancelOrder={callCancelOrder} setSelected={() => setSelectedOrder(i) } selected={selected} order={order} key={i} />
	});

	return (
		<>
			<HeaderSection>
				<StyledHeader>contract</StyledHeader>
				<StyledHeader>price per share</StyledHeader>
				<StyledHeader>order value</StyledHeader>
				<StyledHeader>% filled</StyledHeader>
			</HeaderSection>
			{buttons}
		</>
	)
}

const mapStateToProps = state => ({
	canceled: state.market.orderCanceled,
	account: state.account.account,
	accountId: state.account.accountId,
	contract: state.near.contract
})

export default connect(mapStateToProps)(OpenOrders)