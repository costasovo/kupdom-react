import React from 'react';
import AddItem from '../components/AddItem'
import ActiveItemList from '../containers/ActiveItemList'
import './App.css';

const App = () => (
	<div>
		<AddItem />
		<ActiveItemList />
	</div>
);

export default App;
