import React, { Component } from 'react';
import DoctorForm from './form.js'
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class DoctorEdit extends Component {
  state = {
    success: false,
    doctorId: "",
  }

  componentDidMount() {
    this.setState({ doctorId: this.props.match.params.id });
  }

  updateDoctor = (params) => {
    const { doctorId } = this.state;
    ApiRequest('doctor', 'put', doctorId, params, null).then(response => {
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
        create={false}
        updateDoctor={(params) => this.updateDoctor(params)}
        doctorId={this.props.match.params.id}
      />
    )
  }
}