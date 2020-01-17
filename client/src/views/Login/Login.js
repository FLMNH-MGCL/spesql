import React from 'react'
import { Form, Grid, Input, Button} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
// import HeaderBase from '../../components/Header/HeaderBase'

class Login extends React.Component {
    constructor() {
        super()

        let authenticated = localStorage.getItem('authenticated') === "true" ? true : false


        this.state = {
            username: '',
            password: '',
            authenticated: authenticated
        }
    }

    onChange = (e, {name, value}) => this.setState({[name]: value})

    onSubmit = () => {
        axios.post('/api/login/', {user: this.state.username, password: this.state.password})
        .then(response => {
            const data = response.data
            // console.log(data.logged_in)
            if (data.logged_in) {
                this.setState({authenticated: data.logged_in}, () => {
                    localStorage.setItem('authenticated', data.logged_in)
                })
            }
            else {
                alert('Login error. Please ensure correct username and password combination.')
            }
        })
    }

    render() {
        const {
            username,
            password
        } = this.state
        console.log(this.state)
        console.log(`IN RENDER LOGIN ${this.state.authenticated}`)

        if (this.state.authenticated) {
            return (
                <Redirect to={{pathname: '/Home', state: {
                }}} />
            )
        }

        return(
            <div>
                <div className='form-pad'>
                    <Grid centered columns={1} padded>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Field
                                        control={Input}
                                        placeholder='Username'
                                        label='Username'
                                        name='username'
                                        value={username}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field
                                        control={Input}
                                        type='password'
                                        placeholder='Password'
                                        label='Password'
                                        name='password'
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                                <Form.Group className='form-button'>                                    
                                    <Form.Field
                                        control={Button}
                                        content='Submit'
                                    />
                                </Form.Group>
                            </Form>
                        
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Login


// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication