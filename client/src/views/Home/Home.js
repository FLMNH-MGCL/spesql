import React from 'react'
import axios from 'axios'
import Papa from 'papaparse';
import { Redirect } from 'react-router-dom'
import './Home.css'
import CollectionList from '../../components/CollectionList/CollectionList'
import SpecimenView from '../../components/SpecimenView/SpecimenView'
import Header from '../../components/Header/Header'
import { Grid, Loader } from 'semantic-ui-react'
import getQueryHeaders from '../../functions/getQueryHeaders'
import { runSelectQuery } from '../../functions/queries'
import { mapStateToProps, mapDispatchToProps } from '../../redux/mapFunctions'
import { connect } from 'react-redux'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    logout() {
        sessionStorage.setItem('authenticated', false)
        sessionStorage.removeItem('current_query')
        this.props.logout()
        // this.setState({authenticated: false})
    }

    isValidCSV(csv) {
        // return object with valid param
        let obj = Papa.parse(csv)
        // console.log(obj)
        let data = obj.data

        // check headers

        // if headers correct, check each row and only add valid rows to insertion query

        var ret = {
            "valid" : true,
            "data" : data
        }

        return ret
    }

    async runQuery(query) {
        // fetch & update data
        console.log('here')
        // this.props.clearQuery()
        this.props.updateLoadingStatus(true)
        this.props.updateRefreshStatus(true)

        let data = await runSelectQuery(query)
        this.props.updateQueryData(data.specimen)

        let headers = getQueryHeaders(data.specimen[0])
        this.props.updateHeaders(headers)
        this.props.updateQuery(query)
    }

    render() {
        console.log(this.props.loading)
        if (!this.props.authenticated) {
            return (
                <Redirect to={{pathname: '/Login', state: {
                }}} />
            )
        }

        if (this.props.current_query === '' && sessionStorage.getItem('current_query') && this.props.data.length === 0) {
            this.runQuery(sessionStorage.getItem('current_query'))
        }

        return (
            <div>
                <Header
                    current_view='home'
                    filterCategory={this.props.filterCategory}
                    updateFilteredText={this.props.updateFilteredText} 
                    updateFilterCategory={this.props.updateFilteredCategory}
                    data={this.props.data}
                    displayed={this.props.displayed}
                    isValidCSV={this.isValidCSV.bind(this)}
                    runQuery={this.runQuery.bind(this)}
                    clearQuery={this.props.clearQuery}
                    logout={this.logout.bind(this)}
                    loading={this.props.loading}
                />
                <Grid columns='equal' padded>
                    <Grid.Column width={11}>
                    <Loader content='Loading' active disabled={!this.props.loading} />
                        <CollectionList 
                            data={this.props.data}
                            updateDisplayData={this.props.updateDisplayData}
                            filteredText={this.props.filteredText} 
                            filterCategory={this.props.filterCategory} 
                            selectedUpdate={this.props.updateSelectedSpecimen}
                            clearQuery={this.props.clearQuery}
                            current_query={this.props.current_query}
                            query_headers={this.props.query_headers}
                            updateLoadingStatus={this.props.updateLoadingStatus}
                            updateRefreshStatus={this.props.updateRefreshStatus}
                            runQuery={this.runQuery.bind(this)}
                            refreshing={this.props.refreshing}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <SpecimenView data={this.props.displayed} selectedSpecimen={this.props.selectedSpecimen}/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)