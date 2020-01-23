import React, { Component } from 'react'
import { Menu, Form, Button, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class HeaderBase extends Component {
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
                        disabled={this.props.current_view === 'login'}
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
                            <Form>
                                <Form.Input 
                                type="text"
                                icon='search' 
                                placeholder='Search...' 
                                disabled={true}
                                />
                            </Form>
                        </Menu.Item>
                        <Menu.Item>
                            <Button icon labelPosition='left' disabled={true}>
                                <Icon name='archive' />
                                Query
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown
                                text='Filter'
                                icon='filter'
                                floating
                                labeled
                                button
                                className='icon'
                                disabled={true}
                            >
                            </Dropdown> 
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown
                                text='Sort'
                                icon='sort'
                                floating
                                labeled
                                button
                                className='icon'
                                disabled={true}
                            >
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item>
                            <Button icon labelPosition='left' disabled={true}>
                                <Icon name='upload' />
                                New Insert
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button icon labelPosition='left' disabled={true}>
                                <Icon name='download' />
                                Download
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button icon labelPosition='left' basic color='red' disabled={true}>
                                <Icon name='user circle' />
                                Logout
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>

                </Menu>
            </div>
        )
    }
}