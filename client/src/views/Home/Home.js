import React from 'react'
import axios from 'axios'
//import Header from '../../components/Header/Header'
//import Navigation from '../../components/Navigation/TopBar'
import Footer from '../../components/Footer/Footer'
import Papa from 'papaparse';

import './Home.css'
import CollectionList from '../../components/CollectionList/CollectionList'
// import { Col, Row } from 'react-bootstrap'
// import SideBar from '../../components/Navigation/SideBar'
// import DBToolbar from '../../components/Toolbar/DBToolbar'
// import SideToolbar from '../../components/Toolbar/SideToolbar'
import SpecimenView from '../../components/SpecimenView/SpecimenView'
import Header from '../../components/Header/Header'
import { Grid } from 'semantic-ui-react'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredText: '',
            filterCategory: 'Species',
            selectedSpecimen: 0,
            sortBy: '',
            data: []
        }

        // alter for component did mount research
        axios.get('/api/fetch-all').then(res => {
            const data = res.data
            console.log(data)
            this.setState({data: data.specimen})
        })
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
            console.log(data)
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

    render() {
        console.log(this.state)
        return (
            <div>
                <Header 
                    updateFilteredText={this.updateFilteredText.bind(this)} 
                    updateFilterCategory={this.updateFilterCategory.bind(this)}
                    updateSortBy={this.updateSortBy.bind(this)}
                    updateList={this.updateList.bind(this)}
                    data={this.state.data}
                    isValidCSV={this.isValidCSV.bind(this)}
                />
                <Grid columns='equal' padded>
                    <Grid.Column width={11}>
                        <CollectionList 
                            data={this.state.data} 
                            filteredText={this.state.filteredText} 
                            filterCategory={this.state.filterCategory} 
                            selectedUpdate={this.selectedUpdate.bind(this)}
                            sortBy={this.state.sortBy}
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