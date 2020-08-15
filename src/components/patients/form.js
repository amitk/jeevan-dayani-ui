import React, { Component } from 'react';
import Select from 'react-select';
import { Link, Redirect } from 'react-router-dom';
import { Container, Card, Form, FormGroup  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import Feedback from 'react-bootstrap/esm/Feedback';
import Loading from '../Loading.js'

export default class PatientForm extends Component {

  state = {
    name: "",
    age: "",
    sex: "",
    trial: {},
    feedbackPresent: false,
    feedback: "",
    success: false,
    feedbackId: "",
    loading: true
  }
  
  componentWillMount() {
    //get pharma company
    const { trialId, patientId } = this.props;
    
    ApiRequest('trial', 'get', trialId, null, null).then(response => {
      this.setState({ trial: response.data.data.trial })
    })

    if(this.props.create) {
      this.setState({ loading: false })
    } else {
      ApiRequest('patient', 'get', patientId, null, { resource: 'trial', id: trialId }).then(response => {
        let patient = response.data.data.patient
        let feedback = response.data.data.feedback
    
        this.setState({
          name: patient.name,
          age: patient.age,
          sex: { label: patient.sex, value: patient.sex },
          feedbackPresent: !!feedback,
          feedback: feedback ? { label: feedback.state, value: feedback.state } : "",
          feedbackId: feedback ? feedback.id : "",
          loading: false
        })
      })
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleAgeChange = (e) => {
    this.setState({ age: e.target.value });
  }

  returnSexOptions = () => {
    return ["Male", "Female"].map(
      sex => ({ label: sex, value: sex }))
  }

  handleSexChange = (sex) => {
    this.setState({ sex })
  }

  feedbackOptions = () => {
    return ["Not Feeling Well", "Feeling Better", "Happy"].map(f => ({ label: f, value: f }))
  }

  handleFeedbackChange = (feedback) => {
    this.setState({ feedback });
  }

  handleSubmit = () => {
    const { name, age, sex, feedback, feedbackPresent, feedbackId } = this.state;
    let params = {
      patient: {
        name,
        age,
        sex: sex.value,
        feedback: feedback.value,
        feedbackPresent,
        feedbackId,
      }
    }

    this.props.create ? this.props.createPatient(params) : this.props.updatePatient(params)
  }

  render() {
    const { name, age, sex, feedback, success, trial, loading } = this.state;

    if (success) {
      return <Redirect to={`/trials/${trial.id}/patients`} />
    }

    if(loading) {
      return <Loading />
    }
    return (
      <Container>
        <Card>
          <Card.Header>
            Patient
          </Card.Header>
					<Card.Body>
            <Form>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleNameChange}></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" min={1} value={age} onChange={this.handleAgeChange}></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Sex</Form.Label>
                <Select
                  value={sex}
                  onChange={this.handleSexChange}
                  options={this.returnSexOptions()}
                />
              </FormGroup>
              { !this.props.create &&
                <FormGroup>
                  <Form.Label>Feedback</Form.Label>
                  <Select
                    value={feedback}
                    onChange={this.handleFeedbackChange}
                    options={this.feedbackOptions()}
                  />
                </FormGroup>
              }
            </Form>
					</Card.Body>
          <Card.Footer>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>{' '}
            <Link id="cancel" to={`/trials/${trial.id}/patients`}><button className="btn btn-secondary">Cancel</button></Link>
          </Card.Footer>
        </Card>
      </Container>      
    )
  }
}