import React from 'react'
import { Form, Grid, Input, Button, Message} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
// import HeaderBase from '../../components/Header/HeaderBase'

async function attemptLogin(username, password) {
    let loggedIn = axios.post('/api/login/', {user: username, password: password})
    .then(response => {
        console.log(response)
            const data = response.data
            return data.logged_in
        }
    )

    return loggedIn
}

async function onSubmit() {
    let loggedIn = await attemptLogin(this.state.username, this.state.password)
    console.log(loggedIn)

    if (loggedIn) {
        sessionStorage.setItem('authenticated', true)
        this.onSuccess()
    }
    else {
        sessionStorage.setItem('authenticated', false)
        this.onFail()
    }
}

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        loginError: false,
        authenticated: sessionStorage.getItem('authenticated') ? this.props.isLoggedIn : false
    }

    componentDidUpdate() {
        console.log('updated!')
        this.props.setAuthentication(this.state.authenticated)
    }

    onSuccess = (e) => this.setState({authenticated: true})

    onFail = (e) => this.setState({authenticated: false})

    onChange = (e, {name, value}) => this.setState({[name]: value})

    render() {
        console.log(this.state.authenticated)
        const {
            username,
            password,
            authenticated,
        } = this.state

        if (authenticated) {
            console.log('made it')
            return (
                <Redirect to='/Home' />
            )
        }

        return(
            <div>
                <div className='form-pad'>
                    {/* <Message
                        error
                        header='Action Forbidden'
                        content='Logging in as root is forbidden. If you need a user account, please contact the Kawahara Lab.'
                    /> */}
                    <Grid centered padded>
                        <Grid.Column textAlign='centered' width={5}>
                            <Form onSubmit={() => setTimeout(onSubmit.bind(this), 1000)}>
                                <Form.Group>
                                    <Form.Field
                                        control={Input}
                                        placeholder='Username'
                                        label='Username'
                                        name='username'
                                        value={username}
                                        onChange={this.onChange}
                                        error={this.state.username === 'root' ? {
                                            content: 'Logging in as root is forbidden.',
                                            pointing: 'above'
                                        } : false}
                                        width={16}
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
                                        width={16}
                                    />
                                </Form.Group>
                                <Form.Group className='form-button'>                                    
                                    <Form.Field
                                        control={Button}
                                        content='Submit'
                                    />
                                </Form.Group>
                            </Form>
                            <Message error hidden={!this.state.loginError}>
                            <Message.Header>Login error</Message.Header>
                                <p></p>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Login


// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication