import React from 'react'
import axios from 'axios'
import Papa from 'papaparse';
import { Redirect } from 'react-router-dom'
import './Home.css'
import CollectionList from '../../components/CollectionList/CollectionList'
import SpecimenView from '../../components/SpecimenView/SpecimenView'
import Header from '../../components/Header/Header'
import { Grid, Loader, Segment, Divider, Input } from 'semantic-ui-react'
import { getQueryHeaders } from '../../functions/helpers'
import { checkHeaders } from '../../functions/queryChecks'
import { runSelectQuery, runCountQuery, runUpdateQuery, runDeleteQuery } from '../../functions/queries'
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
            let headerErrors = checkHeaders(data[0])
            console.log(headerErrors)
            if (headerErrors.length !== 0) {
                errors = errors.concat(headerErrors)
                console.log(errors)
                valid = false
            }
        }



        // if headers correct, check each row and only add valid rows to insertion query
        let ret = {}
        if (valid) {
            ret = {
                valid : valid,
                data : data
            }
        }
        else {
            ret = {
                valid : valid,
                data : errors
            }
        }

        return ret
    }

    async runQuery(query) {
        console.log(query)
        let queryType = ''

        if (query.toUpperCase().startsWith('SELECT COUNT')) {
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

                if (data.error) {
                    let errorMessage = `SQL ERROR: Code: ${data.error.code}, Message: ${data.error.sqlMessage}`
                    console.log(errorMessage)
                    this.props.updateSelectErrorMessage([errorMessage])
                    this.props.updateLoadingStatus(false)
                    this.props.updateRefreshStatus(false)
                }

                else {
                    this.props.updateQueryData(data.specimen)
                    let headers = getQueryHeaders(data.specimen[0])
                    this.props.updateHeaders(headers)
                    this.props.updateQuery(query)

                }
                break

            case 'COUNT':
                // let data = await runSelectQuery(query)
                let countData = await runCountQuery(query)

                if (!countData.error) {
                    countData = countData.data[Object.keys(countData.data)[0]]
                    this.props.updateCountQueryCount(Object.values(countData)[0]) // isolate the number
                    console.log(countData)
                }
                else {
                    let error = [`SQL ERROR: Code: ${countData.error.code}, Message: ${countData.error.sqlMessage}`]
                    this.props.updateCountErrorMessage(error)
                }
                break

            case 'DELETE':
                let deleteData = await runDeleteQuery(query)

                if (deleteData.data.success) {
                    // console.log(this.props.current_query)
                    this.runQuery(this.props.current_query)
                    console.log('success')
                }
                else {
                    console.log(deleteData.data)
                }
                break;


            case 'UPDATE':
                console.log(query)
                let updateData = await runUpdateQuery(query)

                console.log(updateData)

                // failed
                if (!updateData.data.success) {
                  console.log('failed')
                  console.log(updateData.data)
                  let updateError = [`SQL ERROR: Code: ${updateData.data.code}, Message: ${updateData.data.sqlMessage}`]
                  this.props.updateUpdateErrorMessage(updateError)
                }
                else {
                    console.log(updateData.data)
                }

                break
            default:
                console.log('not yet')
                break
        }



    }

    render() {

        // console.log(this.props.errorMessages)

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
                    {...this.props}
                    current_view='home'
                    isValidCSV={this.isValidCSV.bind(this)}
                    runQuery={this.runQuery.bind(this)}
                    logout={this.logout.bind(this)}
                />
                <Grid columns='equal' padded stackable>
                    <Grid.Column width={11}>
                    <Loader content='Loading' active disabled={!this.props.loading} />
                      <Segment>
                        <CollectionList
                            {...this.props}
                            runQuery={this.runQuery.bind(this)}
                        />
                      </Segment>
                    </Grid.Column>
                    <Grid.Column style={{marginTop: '1rem'}}>
                      <Segment>
                        <SpecimenView
                          data={this.props.displayed}
                          selectedSpecimen={this.props.selectedSpecimen}
                          currentQuery={this.props.current_query}
                          runQuery={this.runQuery.bind(this)}
                          user={this.props.user}
                        />
                      </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
