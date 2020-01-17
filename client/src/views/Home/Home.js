import React from 'react'
import axios from 'axios'
import Papa from 'papaparse';
import { Redirect } from 'react-router-dom'
import './Home.css'
import CollectionList from '../../components/CollectionList/CollectionList'
import SpecimenView from '../../components/SpecimenView/SpecimenView'
import Header from '../../components/Header/Header'
import { Grid } from 'semantic-ui-react'

class Home extends React.Component {
    constructor(props) {
        super(props);

        let authenticated = localStorage.getItem('authenticated') === "true" ? true : false
        console.log(authenticated)

        this.state = {
            authenticated: authenticated,
            filteredText: '',
            filterCategory: 'Species',
            selectedSpecimen: 0,
            sortBy: '',
            data: [],
            current_query: ''
        }
    }

    isValidCSV(csv) {
        // return object with valid param
        let obj = Papa.parse(csv)
        // console.log(obj)
        let data = obj.data

        var ret = {
            "valid" : true,
            "data" : data
        }

        return ret
    }

    updateList() {
        axios.get('/api/fetch-all').then(res => {
            const data = res.data
            // console.log(data)
            this.setState({data: data.specimen})
        })
    }

    updateFilterCategory(category) {
        this.setState({
            filterCategory: category
        })
    }

    updateFilteredText(value) {
        console.log(value)
        this.setState({
            filteredText: value
        })
    }

    updateSortBy(value) {
        this.setState({
            sortBy: value
        })
    }

    selectedUpdate(id) {
        this.setState({
            selectedSpecimen: id
        })
    }

    runQuery(query) {
        // check validity, return errors in log
        console.log(this.state)

        let data = { command: query}
        console.log(data)

        axios.post('/api/fetch/', data)
        .then(response => {
            const data = response.data
            this.setState({data: data.specimen})
        })
    }

    updateQuery(new_query) {
        this.setState({
            current_query: new_query
        })

        this.runQuery(new_query)
    }

    clearQuery() {
        this.setState({
            data: [],
            current_query: ''
        })
    }

    render() {
        if (!this.state.authenticated) {
            return (
                <Redirect to={{pathname: '/Login', state: {
                }}} />
            )
        }

        return (
            <div>
                <Header
                    current_view='home'
                    updateFilteredText={this.updateFilteredText.bind(this)} 
                    updateFilterCategory={this.updateFilterCategory.bind(this)}
                    updateSortBy={this.updateSortBy.bind(this)}
                    updateList={this.updateList.bind(this)}
                    data={this.state.data}
                    isValidCSV={this.isValidCSV.bind(this)}
                    updateQuery={this.updateQuery.bind(this)}
                    runQuery={this.runQuery.bind(this)}
                />
                <Grid columns='equal' padded>
                    <Grid.Column width={11}>
                        <CollectionList 
                            data={this.state.data} 
                            filteredText={this.state.filteredText} 
                            filterCategory={this.state.filterCategory} 
                            selectedUpdate={this.selectedUpdate.bind(this)}
                            sortBy={this.state.sortBy}
                            clearQuery={this.clearQuery.bind(this)}
                            current_query={this.state.current_query}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <SpecimenView data={this.state.data} selectedSpecimen={this.state.selectedSpecimen} updateList={this.updateList.bind(this)}/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
    
}

export default Home