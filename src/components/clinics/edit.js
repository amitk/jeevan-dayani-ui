import React, { Component } from 'react';
import ClinicForm from './form.js'
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class ClinicCreate extends Component {
  state = {
    success: false,
    clinicId: "",
  }

  componentDidMount() {
    this.setState({ clinicId: this.props.match.params.id });
  }

  updateClinic = (params) => {
    const { clinicId } = this.state;
    
    ApiRequest('clinic', 'put', clinicId, params, null).then(response => {
      if (response.status === 200) {
        this.setState({ success: true })
      }
    })
  }

  render() {
    const { success, clinicId } = this.state;

    if (success) {
      return <Redirect to={`/clinics`} />
    }
    return (
      <ClinicForm
        create={false}
        updateClinic={(params) => this.updateClinic(params)}
        clinicId={this.props.match.params.id}
      />
    )
  }
}