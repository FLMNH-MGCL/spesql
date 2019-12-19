import React from 'react';
import { Form } from 'semantic-ui-react'

class DBSearch extends React.Component {
	state = {filteredText: this.props.filteredText}

	handleChange = (e, { filteredText, value }) => {
		console.log(value)
		this.setState({ [filteredText]: value })
		this.props.updateFilteredText(value)
	}

	// updateFilteredText() {
	// 	//Here you will need to update the value of the filter with the value from the textbox
	// 	const val = this.myValue.value;
	// 	console.log(val)
	// 	this.props.updateFilteredText(val)
	// 	//console.log('search changed to: ', val)
	// }
	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value
		const { filteredText } = this.state
		
		return (
			<Form>
				<Form.Input 
				type="text"
				icon='search' 
				placeholder='Search...' 
				value={filteredText}
				onChange={this.handleChange}
				/>
			</Form>
		
			// <form>
			// 	<input type="text"
			// 	ref={ (value) => {this.myValue = value }}
			// 	placeholder="Type to filter"
			// 	onChange={this.filterUpdate.bind(this)}
			// 	/>
			// </form>
		);
	}
}
export default DBSearch;