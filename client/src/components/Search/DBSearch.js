import React from 'react';
import { Form, Popup } from 'semantic-ui-react'

class DBSearch extends React.Component {
	handleChange = (e, { filteredText, value }) => {
		console.log(value)
		this.props.updateFilteredText(value)
	}

	render() {
		const { filteredText } = this.props

		let popupMessage = ''
		if (this.props.disabled) {
			if (this.props.queryLength === 0) {
				popupMessage = 'Make a query to be able to search'
			}
			else {
				popupMessage = 'Select a filter category to search through'
			}
		}
		else {
			popupMessage = ''
		}
		
		return (
			<Popup
				content={popupMessage}
				disabled={popupMessage === ''}
				trigger={
					<Form>
						<Form.Input 
							type="text"
							icon='search' 
							placeholder='Search...' 
							value={filteredText}
							onChange={this.handleChange}
							disabled={this.props.disabled}
						/>
					</Form>
				}
			/>

		);
	}
}
export default DBSearch;