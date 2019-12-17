import React from 'react'
import axios from 'axios'
//import Header from '../../components/Header/Header'
//import Navigation from '../../components/Navigation/TopBar'
import Footer from '../../components/Footer/Footer'

import './Home.css'
import CollectionList from '../../components/CollectionList/CollectionList'

import data from '../../components/CollectionList/test_data'
import { Col, Row } from 'react-bootstrap'
import SideBar from '../../components/Navigation/SideBar'
import DBToolbar from '../../components/Toolbar/DBToolbar'
import SideToolbar from '../../components/Toolbar/SideToolbar'
import SpecimenView from '../../components/SpecimenView/SpecimenView'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredText: '',
            selectedSpecimen: 0,
            data: data
        }

        // alter for component did mount research
        axios.get('/api/fetch-all').then(res => {
            const data = res.data
            console.log(data)
            this.setState({data: data.specimen})
        })
    }

    filterUpdate(value) {
        this.setState({
            filteredText: value
        })
    }

    selectedUpdate(id) {
        this.setState({
            selectedSpecimen: id
        })
    }

    render() {
        return (
            <div>
                {/* <Navigation /> */}
                <Row>
                    <Col sm={2}>
                        <SideToolbar />
                        <SideBar />
                    </Col>
                    <Col sm={6}>
                        <DBToolbar filterUpdate={this.filterUpdate.bind(this)}/>
                        <CollectionList data={this.state.data} filteredText={this.state.filteredText} selectedUpdate={this.selectedUpdate.bind(this)}/>
                    </Col>
                    <Col sm={4}>
                        <SpecimenView data={this.state.data} selectedSpecimen={this.state.selectedSpecimen}/>
                    </Col>
                </Row>
                <Footer />
            </div>
        )
    }
    
}

export default Home