import { connect } from 'react-redux'
import { toggleItem } from '../actions'
import ItemList from '../components/ItemList'

const mapStateToProps = (state) => {
	return {
		items: state.items
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onItemClick: (id) => {
			dispatch(toggleItem(id));
		}
	}
}

const ActiveItemList = connect(
 	mapStateToProps,
 	mapDispatchToProps
)(ItemList)

export default ActiveItemList
