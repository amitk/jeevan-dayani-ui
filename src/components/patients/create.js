import React, { Component } from 'react';
import { ApiRequest } from '../sharedApi.js';
import { Redirect } from 'react-router-dom';
import PatientForm from './form.js';

export default class PatientCreate extends Component {

  state = {
    success: false,
    trialId: ""
  }

  componentDidMount() {
    this.setState({ trialId: this.props.match.params.trial_id })
  }

  createPatient = (params) => {
    const { trialId } = this.state;

    ApiRequest('patient', 'post', null, params, { resource: 'trial', id: trialId }).then(response => {
      if(response.status === 200) {
        this.setState({ success: true });
      }
    })
  }

  render() {
    const { success, trialId} = this.state;
    
    if(success) {
      return <Redirect to={`/trials/${trialId}/patients`} />
    }

    return (
      <PatientForm
        trialId={this.props.match.params.trial_id}
        createPatient={(params) => { this.createPatient(params) }}
        create={true}
      />
    )
  }
}