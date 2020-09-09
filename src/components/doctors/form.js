import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Container, Card, Form, FormGroup  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import Loading from '../Loading.js';

export default class DoctorForm extends Component {
  state = {
    name: "",
    specialization: "",
    clinics: [],
    clinicOptions: [],
    loading: true,
  }

  componentDidMount() {
    this.clinicOptions();

    if(this.props.create) {
      this.setState({ loading: false });
    } else {
      ApiRequest('doctor', 'get', this.props.doctorId, null, null).then(response => {
        let doctor = response.data.data.doctor;
        let clinics = response.data.data.clinics;

        this.setState({
          name: doctor.name,
          specialization: { label: doctor.specialization, value: doctor.specialization },
          clinics: clinics.map(c => ({ label: c.name, value: c.id })),
          loading: false, 
        })
      })
    }

  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  specializationOptions = () => {
    return [
      { label: 'Cardiologist', value: 'Cardiologist' },
      { label: 'Radiologist', value: 'Radiologist' },
      { label: 'Darmatologist', value: 'Darmatologist' },
      { label: 'Surgeon', value: 'Surgeon'},
      { label: 'Physiotherapist', value: 'Physiotherapist'}
    ]
  }

  handleSpecializationChange = (specialization) => {
    this.setState({ specialization });
  }

  clinicOptions = () => {
    ApiRequest('clinic', 'get', null, null, null).then(response => {
      this.setState({ clinicOptions: response.data.data.map(d => ({ label: d.name, value: d.id })) });
    })
  }

  handleClinicsSelect = (clinics) => {
    this.setState({ clinics });
  }

  handleSubmit = () => {
    const { name, specialization, clinics } = this.state;
    let params = {
      doctor: {
        name, 
        specialization: specialization.value,
        clinic_ids: clinics.map(d => d.value),
      }
    }

    this.props.create ? this.props.createDoctor(params) : this.props.updateDoctor(params)
  }

  render() {
    const { name, specialization, clinics, clinicOptions, loading } = this.state;

    if(loading) {
      return <Loading />
    }

    return (
      <Container>
        <Card>
          <Card.Header>
            Doctor
          </Card.Header>
					<Card.Body>
            <Form>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleNameChange}></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Specialization</Form.Label>
                <Select
                  value={specialization}
                  onChange={this.handleSpecializationChange}
                  options={this.specializationOptions()} 
                />
              </FormGroup>        
              <FormGroup>
                <Form.Label>Clinics</Form.Label>
                <Select
                  value={clinics}
                  onChange={this.handleClinicsSelect}
                  isMulti
                  closeMenuOnSelect={false}
                  options={clinicOptions}
                />
              </FormGroup>
            </Form>
					</Card.Body>
          <Card.Footer>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>{' '}
            <Link id="cancel" to={`/doctors`}><button className="btn btn-secondary">Cancel</button></Link>
          </Card.Footer>
        </Card>
      </Container>      
    )
  }
}
