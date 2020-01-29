import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import SearchFilter from '../Search/SearchFilter'
import DBSearch from '../Search/DBSearch'
import SortCollection from '../CollectionList/SortCollection'
import InsertDocument from '../InsertDocument/InsertDocument'
import { Link } from 'react-router-dom'
import DownloadDB from '../DownloadDB/DownloadDB'
import QueryGrid from '../Query/QueryGrid'
import Logout from '../Logout/Logout'

export default class Header extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => { 
        this.setState({ activeItem: name })
    }

    render() {
        return (
            <div>
                <Menu>
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
                            <DBSearch updateFilteredText={this.props.updateFilteredText.bind(this)} disabled={this.props.data === undefined || this.props.data.length === 0} />
                        </Menu.Item>
                        <Menu.Item>
                            <QueryGrid updateQuery={this.props.updateQuery.bind(this)} runQuery={this.props.runQuery.bind(this)}/>
                        </Menu.Item>
                        <Menu.Item>
                            <SearchFilter updateFilterCategory={this.props.updateFilterCategory.bind(this)} disabled={this.props.data === undefined || this.props.data.length === 0} />
                        </Menu.Item>
                        {/* <Menu.Item>
                            <SortCollection updateSortBy={this.props.updateSortBy.bind(this)} disabled={this.props.data === undefined || this.props.data.length === 0} />
                        </Menu.Item> */}
                        <Menu.Item>
                            <InsertDocument updateList={this.props.updateList.bind(this)} isValidCSV={this.props.isValidCSV.bind(this)} />
                        </Menu.Item>
                        <Menu.Item>
                            <DownloadDB data={this.props.data} disabled={this.props.data === undefined || this.props.data.length === 0} />
                        </Menu.Item>
                        <Menu.Item>
                            {/* <Button icon labelPosition='left' basic color='red'>
                                <Icon name='user circle' />
                                Logout
                            </Button> */}
                            <Logout logout={this.props.logout.bind(this)} />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}