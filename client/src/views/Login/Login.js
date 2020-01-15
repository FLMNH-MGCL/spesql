import React from 'react'
import { Form, Grid, Input, Button} from 'semantic-ui-react'
import './Login.css'

class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    onChange = (e, {name, value}) => this.setState({[name]: value})

    onSubmit = () => {
        // attempt login
        // clear form
        // reroute if sucessful
    }

    render() {
        const {
            username,
            password
        } = this.state
        return(
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
        )
    }
}

export default Login


// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication