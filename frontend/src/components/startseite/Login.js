import React, {Component} from 'react';
import {Col, Button, Form} from 'react-bootstrap';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      nutzername: "admin",
      password: "admin"
    };
    this.handleChangeNutzername =this.handleChangeNutzername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeNutzername(event) {
    this.setState({nutzername: event.target.value})
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.nutzername, this.state.password);
  }

  render() {
    return (
			<Form class="form-inline" onSubmit={this.handleSubmit}>
				<Form.Row>
					<Col>
						<Form.Control type="text" placeholder="Nutzername" value={this.state.nutzername} onChange={this.handleChangeNutzername} />
					</Col>
					<Col>
            <Form.Control type="password" placeholder="Passwort" value={this.state.password} onChange={this.handleChangePassword} />
          </Col>
					<Col>
					<Button variant="primary" type="submit" onClick={this.handleSubmit}>Login</Button>
					</Col>
				</Form.Row>
			</Form>
    )
  }
}

export default Login;
