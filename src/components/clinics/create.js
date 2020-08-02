import React, { Component } from 'react';
import ClinicForm from './form.js';
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class ClinicCreate extends Component {
  state = {
    success: false,
  }

  createClinic = (params) => {
    ApiRequest('clinic', 'post', null, params, null).then(response => {
      if (response.status === 200) {
        this.setState({ success: true })
      }
    })
  }

  render() {
    const { success } = this.state;
    if (success) {
      return <Redirect to={`/clinics`} />
    }
    return (
      <ClinicForm
        create={true}
        createClinic={(params) => this.createClinic(params)}
      />
    )
  }
}