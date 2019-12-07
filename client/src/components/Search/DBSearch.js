import React from 'react';

class DBSearch extends React.Component {
	filterUpdate() {
		//Here you will need to update the value of the filter with the value from the textbox
		const val = this.myValue.value;
		this.props.filterUpdate(val)
		//console.log('search changed to: ', val)
	}
	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value
		
		return (
			<form>
				<input type="text"
				ref={ (value) => {this.myValue = value }}
				placeholder="Type to filter"
				onChange={this.filterUpdate.bind(this)}
				/>
			</form>
		);
	}
}
export default DBSearch;