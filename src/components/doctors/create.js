import React, { Component } from 'react';
import DoctorForm from './form.js';
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class DoctorCreate extends Component {
  state = {
    success: false,
  }

  createDoctor = (params) => {
    ApiRequest('doctor', 'post', null, params, null).then(response => {
      if (response.status === 200) {
        this.setState({ success: true })
      }
    })
  }

  render() {
    const { success } = this.state;
    if (success) {
      return <Redirect to={`/doctors`} />
    }
    return (
      <DoctorForm
        create={true}
        createDoctor={(params) => this.createDoctor(params)}
      />
    )
  }
}