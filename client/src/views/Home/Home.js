import React from 'react'
import axios from 'axios'
import Papa from 'papaparse';
import { Redirect } from 'react-router-dom'
import './Home.css'
import CollectionList from '../../components/CollectionList/CollectionList'
import SpecimenView from '../../components/SpecimenView/SpecimenView'
import Header from '../../components/Header/Header'
import { Grid, Loader } from 'semantic-ui-react'
import { getQueryHeaders } from '../../functions/helpers'
import { checkHeaders } from '../../functions/queryChecks'
import { runSelectQuery, runCountQuery } from '../../functions/queries'
import { mapStateToProps, mapDispatchToProps } from '../../redux/mapFunctions'
import { connect } from 'react-redux'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    logout() {
        sessionStorage.removeItem('authenticated')
        sessionStorage.removeItem('current_query')
        this.props.logout()
    }

    isValidCSV(csv) {
        // return object with valid param
        let obj = Papa.parse(csv)
        // console.log(obj)
        let data = obj.data

        let valid = true
        let errors = []
        console.log(data)

        if (data === undefined || data.length === 0) {
            valid = false
            errors.push('Invalid CSV Formatting. (Detected empty submission)')
        }

        else if (data.length <= 1) {
            valid = false
            errors.push('Invalid CSV Formatting. (Are you missing the headers / data?)')
        }

        else {
            // check headers
            valid = checkHeaders(data[0])
            if (!valid) {
                errors.push('Error(s) detected in headers. Please ensure they match the example CSV document.')
            }
        }



        // if headers correct, check each row and only add valid rows to insertion query
        let ret = {}
        if (valid) {
            ret = {
                "valid" : valid,
                "data" : data
            }
        } 
        else {
            ret = {
                "valid" : valid,
                "data" : errors
            }
        }

        return ret
    }

    async runQuery(query) {
        let queryType = ''
        
        if (query.startsWith('COUNT')) {
            queryType = 'COUNT'
        }
        else {
            queryType = query.replace(/ .*/, '')
        }

        switch(queryType.toUpperCase()) {
            case 'SELECT':
                this.props.clearQuery()
                this.props.updateLoadingStatus(true)
                this.props.updateRefreshStatus(true)

                let data = await runSelectQuery(query)
                this.props.updateQueryData(data.specimen)

                let headers = getQueryHeaders(data.specimen[0])
                this.props.updateHeaders(headers)
                this.props.updateQuery(query)
                break
            case 'COUNT':
                // let data = await runSelectQuery(query)
                let fullQuery = 'SELECT ' + query

                let countData = await runCountQuery(fullQuery)

                if (!countData.error) {
                    countData = countData.data[Object.keys(countData.data)[0]]
                    console.log(countData)
                }
                else {

                }

                this.props.updateCountQueryCount(Object.values(countData)[0]) // isolate the number
                break
            case 'UPDATE':
                console.log(query)
                break
            default:
                console.log('not yet')
                break
        }



    }

    render() {

        console.log(this.props)

        // if (!this.props.authenticated) {
        //     return (
        //         <Redirect to='/Login' />
        //     )
        // }

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
                    countQueryCount={this.props.countQueryCount}
                    updateCountQueryCount={this.props.updateCountQueryCount}
                    errorMessages={this.props.errorMessages}
                    updateInsertErrorMessage={this.props.updateInsertErrorMessage}
                    updateSelectErrorMessage={this.props.updateSelectErrorMessage}
                    updateCountErrorMessage={this.props.updateCountErrorMessage}
                    updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
                    logout={this.logout.bind(this)}
                    loading={this.props.loading}
                />
                <Grid columns='equal' padded stackable>
                    <Grid.Column width={11}>
                    <Loader content='Loading' active disabled={!this.props.loading} />
                        <CollectionList
                            {...this.props}
                            runQuery={this.runQuery.bind(this)}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <SpecimenView data={this.props.displayed} selectedSpecimen={this.props.selectedSpecimen} currentQuery={this.props.current_query} />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)