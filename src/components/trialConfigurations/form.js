import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Container, Card, Form, FormGroup  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';


export default class TrialConfigurationForm extends Component {
  state = {
    name: "",
    drug: "",
    drugOptions: [],
    doctor: "",
    doctorOptions: [],
    clinic: "",
    clinicOptions: [],
  }

  componentDidMount() {
    this.drugOptions();
    this.doctorOptions();
    this.clinicOptions();

    if(!this.props.create) {
      ApiRequest('trial_configuration', 'get', this.props.trialConfigurationId, null, null).then(response => {
        let drug = response.data.data.drug;
        let doctor = response.data.data.doctor;
        let clinic = response.data.data.clinic;

        this.setState({
          name: doctor.name,
          drug: { label: drug.name, value: drug.id },
          doctor: { label: doctor.name, value: doctor.id },
          clinic: { label: clinic.name, value: clinic.id }
        })
      })
    }

  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  drugOptions = () => {
    if (this.state.drugOptions.length === 0 ) {
      ApiRequest('all_drug', 'get', null, null, null).then(response => {
        this.setState({ drugOptions: response.data.data.map(d => ({ label: d.name, value: d.id }))})
      })
    }
  }

  handleDrugSelect = (drug) => {
    this.setState({ drug })
  }

  clinicOptions = () => {
    if (this.state.clinicOptions.length === 0) {
      ApiRequest('clinic', 'get', null, null, null).then(response => {
        this.setState({ clinicOptions: response.data.data.map(d => ({ label: d.name, value: d.id })) });
      })
    }
  }

  handleClinicSelect = (clinic) => {
    this.setState({ clinic });
  }

  doctorOptions = () => {
    if (this.state.doctorOptions.length === 0) {
      ApiRequest('doctor', 'get', null, null, null).then(response => {
        this.setState({ doctorOptions: response.data.data.map(d => ({ label: d.name, value: d.id })) });
      })
    }
  }

  handleDoctorSelect = (doctor) => {
    this.setState({ doctor });
  }

  handleSubmit = () => {
    const { name, drug, clinic, doctor } = this.state;
    let params = {
      trial_configuration: {
        name,
        drug_id: drug.value,
        doctor_id: doctor.value,
        clinic_id: clinic.value,
      }
    }

    this.props.create ? this.props.createTrialConfiguration(params) : this.props.updateTrialConfiguration(params)
  }

  render() {
    const { name, drug, drugOptions, doctor, doctorOptions, clinic, clinicOptions } = this.state;

    return (
      <Container>
        <Card>
          <Card.Header>
            Trial Configuration
          </Card.Header>
					<Card.Body>
            <Form>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleNameChange}></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Drug</Form.Label>
                <Select
                  value={drug}
                  onChange={this.handleDrugSelect}
                  options={drugOptions} 
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Doctor</Form.Label>
                <Select
                  value={doctor}
                  onChange={this.handleDoctorSelect}
                  options={doctorOptions} 
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Clinic</Form.Label>
                <Select
                  value={clinic}
                  onChange={this.handleClinicSelect}
                  options={clinicOptions} 
                />
              </FormGroup>
            </Form>
					</Card.Body>
          <Card.Footer>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>{' '}
            <Link id="cancel" to={`/trial_configurations`}><button className="btn btn-secondary">Cancel</button></Link>
          </Card.Footer>
        </Card>
      </Container>      
    )
  }
}