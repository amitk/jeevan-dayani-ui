import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Form, FormGroup  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi';
import Loading from '../Loading.js';

export default class PharmaCompanyForm extends Component {
  state = {
    name: "",
    success: false,
    loading: true,
  }

  componentDidMount() {
    if(this.props.create) {
      this.setState({ loading: false })
    } else {
      ApiRequest('pharma_company', 'get', this.props.pharmaCompanyId, null, null).then(response => {
        this.setState({ name: response.data.data.name, loading: false })
      })
    }
  }

  handleSubmit = () => {
    let params = {
      pharma_company: {
        name: this.state.name,
      }
    }
    this.props.create ? this.props.createPharmaCompany(params) : this.props.updatePharmaCompany(params)
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  render() {
    const { success, name, loading } = this.state;
    
    if(loading) {
      return <Loading />
    }
    
    return (
      <Container>
        <Card>
          <Card.Header>
            Pharma Company
          </Card.Header>
					<Card.Body>
            <Form>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleNameChange}></Form.Control>
              </FormGroup>
            </Form>
					</Card.Body>
          <Card.Footer>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>{' '}
            <Link id="cancel" to={`/pharma_companies`}><button className="btn btn-secondary">Cancel</button></Link>
          </Card.Footer>
        </Card>
      </Container>
    )
  }
}