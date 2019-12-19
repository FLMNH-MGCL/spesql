import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const tagOptions = [
    {
        key: 'Lep #',
        text: 'Lep #',
        value: 'Lep #',
        label: { color: 'blue', empty: true, circular: true },
    },
    {
        key: 'Superfamily',
        text: 'Superfamily',
        value: 'Superfamily',
        label: { color: 'orange', empty: true, circular: true },
    },
    {
        key: 'Family',
        text: 'Family',
        value: 'Family',
        label: { color: 'yellow', empty: true, circular: true },
    },
    {
        key: 'Genus',
        text: 'Genus',
        value: 'Genus',
        label: { color: 'red', empty: true, circular: true },
    },
    {
        key: 'Species',
        text: 'Species',
        value: 'Species',
        label: { color: 'black', empty: true, circular: true },
    },
    {
        key: 'Locality',
        text: 'Locality',
        value: 'Locality',
        label: { color: 'purple', empty: true, circular: true },
    },
    {
        key: 'Collection Date',
        text: 'Collection Date',
        value: 'Collection Date',
        label: { color: 'grey', empty: true, circular: true },
    },
    {
        key: 'Rack #',
        text: 'Rack #',
        value: 'Rack #',
        label: { color: 'violet', empty: true, circular: true },
    }
]

class SearchFilter extends React.Component {
    state = {filterCategory: this.props.filterCategory}

    handleChange = (e, {value}) => {
        //this.setState({ filterCategory: value})
        console.log(e.currentTarget.textContent)
        this.props.updateFilterCategory(value)
    }

    render() {
        const { filterCategory } = this.state
        return(
            <Dropdown
                text='Filter'
                icon='filter'
                floating
                labeled
                button
                className='icon'
                value={filterCategory}
                options={tagOptions}
                onChange={this.handleChange}
            >
            </Dropdown>

        )
    }
}

export default SearchFilter
