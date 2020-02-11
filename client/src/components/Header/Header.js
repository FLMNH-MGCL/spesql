import React, { Component } from 'react'
import { Menu, Dropdown, Accordion, Button } from 'semantic-ui-react'
import SearchFilter from '../Search/SearchFilter'
import DBSearch from '../Search/DBSearch'
import SortCollection from '../CollectionList/SortCollection'
import InsertDocument from '../InsertDocument/InsertDocument'
import { Link } from 'react-router-dom'
import DownloadDB from '../DownloadDB/DownloadDB'
import QueryGrid from '../Query/QueryGrid'
import Logout from '../Logout/Logout'
import { currentUser } from '../../functions/queries'

let user = null
currentUser().then(result => {
    if (result !== null) {
        user = result.split('@')[0]
    }
})

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = { activeItem: 'home', user: user, activeIndex: null}
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }


    handleItemClick = (e, { name }) => { 
        this.setState({ activeItem: name })
    }

    componentDidMount() {
        setTimeout(() => { this.setState({user: user}) }, 1000)
    }

    renderFullToolMenu = () => {
        return(
            <Menu stackable borderless>
                <Menu.Item as={ Link }
                    name='home'
                    active={'home' === this.props.current_view}
                    onClick={this.handleItemClick}
                    to='/Home'
                />
                <Menu.Item as={ Link }
                    name='about'
                    active={'view' === this.props.current_view}
                    onClick={this.handleItemClick}
                    to='/About'
                />

                <Menu.Menu position='right'>
                    <Menu.Item style={{width: '15rem'}}></Menu.Item>
                    <Menu.Item>
                        {/* <Input icon='search' placeholder='Search...' /> */}
                        <DBSearch 
                            updateFilteredText={this.props.updateFilteredText.bind(this)} 
                            disabled={this.props.data === undefined || this.props.data.length === 0 || this.props.filterCategory === ''}
                            queryLength={this.props.data === undefined ? 0 : this.props.data.length}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <SearchFilter 
                            updateFilterCategory={this.props.updateFilterCategory.bind(this)} 
                            disabled={this.props.data === undefined || this.props.data.length === 0} 
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <QueryGrid 
                            runQuery={this.props.runQuery.bind(this)}
                            clearQuery={this.props.clearQuery}
                            countQueryCount={this.props.countQueryCount}
                            updateCountQueryCount={this.props.updateCountQueryCount}
                            errorMessages={this.props.errorMessages}
                            updateSelectErrorMessage={this.props.updateSelectErrorMessage}
                            updateCountErrorMessage={this.props.updateCountErrorMessage}
                            updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
                        />
                    </Menu.Item>
                    {/* <Menu.Item>
                        <SortCollection updateSortBy={this.props.updateSortBy.bind(this)} disabled={this.props.data === undefined || this.props.data.length === 0} />
                    </Menu.Item> */}
                    <Menu.Item>
                        <InsertDocument isValidCSV={this.props.isValidCSV.bind(this)} />
                    </Menu.Item>
                    <Menu.Item>
                        <DownloadDB 
                            data={this.props.data}
                            displayed={this.props.displayed}
                            disabled={this.props.data === undefined || this.props.data.length === 0}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown
                            icon='user'
                            floating
                            button
                            className='icon'
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item text={`User: ${this.state.user}`}></Dropdown.Item>
                                {/* <Dropdown.Item icon='user delete' text='Logout'></Dropdown.Item> */}
                                <div style={{
                                        textAlign: 'center', paddingTop: '2px', paddingBottom: '5px', paddingLeft: '3px'
                                    }}
                                >
                                    <Logout logout={this.props.logout.bind(this)} />
                                </div>
                            </Dropdown.Menu>
                        </Dropdown> 
                    </Menu.Item>
                </Menu.Menu>
            </Menu>            
        )
    }

    renderMobileToolMenu() {
        const { activeIndex } = this.state
        return(
            <Accordion as={Menu} vertical fluid>
                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 0}
                        content='Pages'
                        index={0}
                        onClick={this.handleClick}
                    />
                    <Accordion.Content 
                        active={activeIndex === 0} 
                        content={
                            <div>
                                <Menu.Item as={ Link }
                                    name='home'
                                    active={'home' === this.props.current_view}
                                    onClick={this.handleItemClick}
                                    to='/Home'
                                />
                                <Menu.Item as={ Link }
                                    name='about'
                                    active={'view' === this.props.current_view}
                                    onClick={this.handleItemClick}
                                    to='/About'
                                />
                            </div>
                        }
                    />
                </Menu.Item>

                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 1}
                        content='Search / Filter'
                        index={1}
                        onClick={this.handleClick}
                    />
                    <Accordion.Content 
                        active={activeIndex === 1} 
                        content={
                            <React.Fragment>
                                <div style={{padding: '1rem'}}>
                                    <DBSearch 
                                        updateFilteredText={this.props.updateFilteredText.bind(this)} 
                                        disabled={this.props.data === undefined || this.props.data.length === 0 || this.props.filterCategory === ''}
                                        queryLength={this.props.data === undefined ? 0 : this.props.data.length}
                                    />
                                </div>
                                <div style={{padding: '1rem'}}>
                                    <SearchFilter 
                                        updateFilterCategory={this.props.updateFilterCategory.bind(this)} 
                                        disabled={this.props.data === undefined || this.props.data.length === 0} 
                                    />
                                </div>
                            </React.Fragment>
                        }
                    />
                </Menu.Item>

                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 2}
                        content='Query Tools / Options'
                        index={2}
                        onClick={this.handleClick}
                    />
                    <Accordion.Content 
                        active={activeIndex === 2} 
                        content={
                            <Button.Group>
                                <div style={{padding: '1rem'}}>
                                    <QueryGrid 
                                        runQuery={this.props.runQuery.bind(this)}
                                        clearQuery={this.props.clearQuery}
                                        countQueryCount={this.props.countQueryCount}
                                        updateCountQueryCount={this.props.updateCountQueryCount}
                                        errorMessages={this.props.errorMessages}
                                        updateSelectErrorMessage={this.props.updateSelectErrorMessage}
                                        updateCountErrorMessage={this.props.updateCountErrorMessage}
                                        updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
                                    />
                                </div>
                                <div style={{padding: '1rem'}}>
                                    <InsertDocument isValidCSV={this.props.isValidCSV.bind(this)} />
                                </div>
                                <div style={{padding: '1rem'}}>
                                    <DownloadDB 
                                        data={this.props.data}
                                        displayed={this.props.displayed}
                                        disabled={this.props.data === undefined || this.props.data.length === 0}
                                    />
                                </div>
                            </Button.Group>
                        }
                    />
                </Menu.Item>

                <Menu.Item>
                    <Dropdown
                        icon='user'
                        floating
                        button
                        className='icon'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item text={`User: ${this.state.user}`}></Dropdown.Item>
                            {/* <Dropdown.Item icon='user delete' text='Logout'></Dropdown.Item> */}
                            <div style={{
                                    textAlign: 'center', paddingTop: '2px', paddingBottom: '5px', paddingLeft: '3px'
                                }}
                            >
                                <Logout logout={this.props.logout.bind(this)} />
                            </div>
                        </Dropdown.Menu>
                    </Dropdown> 
                </Menu.Item>
            </Accordion>
        )
    }

    render() {

        return (
            <div>
                {this.renderFullToolMenu()}
            </div>
        )
    }
}