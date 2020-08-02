import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Container, Card, Form, FormGroup  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';


export default class ClinicForm extends Component {
  state = {
    name: "",
    city: "",
    state: "",
    country: "",
    doctors: "",
    doctorOptions: [],
  }

  componentDidMount() {
    this.doctorOptions();

    if(!this.props.create) {
      ApiRequest('clinic', 'get', this.props.clinicId, null, null).then(response => {
        let clinic = response.data.data.clinic;
        let doctors = response.data.data.doctors;

        this.setState({
          name: clinic.name,
          city: { label: clinic.city, value: clinic.city },
          state: { label: clinic.state, value: clinic.state },
          country: { label: clinic.country, value: clinic.country },
          doctors: doctors.map(d => ({ label: d.name, value: d.id }))      
        })
      })
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  cityOptions = () => {
    return [
      { label: 'Pune', value: 'Pune' },
      { label: 'Nagpur', value: 'Nagpur' },
      { label: 'Nasik', value: 'Nasik' },
      { label: 'Mumbai', value: 'Mumbai'}
    ]
  }

  handleCityChange = (city) => {
    this.setState({ city })
  }

  stateOptions = () => {
    return [
      { label: 'Maharashtra', value: 'Maharashtra' }
    ]
  }

  handleStateChange = (state) => {
    this.setState({ state })
  }

  countryOptions = () => {
    return [
      { label: 'India', value: 'India' }
    ]
  }

  handleCountryChange = (country) => {
    this.setState({ country })
  }

  doctorOptions = () => {
    ApiRequest('doctor', 'get', null, null, null).then(response => {
      this.setState({ doctorOptions: response.data.data.map(d => ({ label: d.name, value: d.id })) });
    })
  }

  handleDoctorsSelect = (doctors) => {
    this.setState({ doctors });
  }

  handleSubmit = () => {
    const { name, city, state, country, doctors } = this.state;
    let params = {
      clinic: {
        name, 
        city: city.value,
        state: state.value,
        country: country.value,
        doctor_ids: doctors.map(d => d.value),
      }
    }
    this.props.create ? this.props.createClinic(params) : this.props.updateClinic(params)
  }

  render() {
    const { name, city, state, country, doctors, doctorOptions } = this.state;

    return (
      <Container>
        <Card>
          <Card.Header>
            Clinic
          </Card.Header>
					<Card.Body>
            <Form>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleNameChange}></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>City</Form.Label>
                <Select
                  value={city}
                  onChange={this.handleCityChange}
                  options={this.cityOptions()} 
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>State</Form.Label>
                <Select
                  value={state}
                  onChange={this.handleStateChange}
                  options={this.stateOptions()} 
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Country</Form.Label>
                <Select
                  value={country}
                  onChange={this.handleCountryChange}
                  options={this.countryOptions()} 
                />
              </FormGroup>                            
              <FormGroup>
                <Form.Label>Doctors</Form.Label>
                <Select
                  value={doctors}
                  onChange={this.handleDoctorsSelect}
                  isMulti
                  closeMenuOnSelect={false}
                  options={doctorOptions}
                />
              </FormGroup>
            </Form>
					</Card.Body>
          <Card.Footer>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>{' '}
            <Link id="cancel" to={`/clinics`}><button className="btn btn-secondary">Cancel</button></Link>
          </Card.Footer>
        </Card>
      </Container>      
    )
  }
}