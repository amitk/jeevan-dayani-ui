import React, { Component } from 'react';
import PatientForm from './form.js';
import { ApiRequest } from '../sharedApi.js';
import { Redirect } from 'react-router-dom';

export default class PatientEdit extends Component {
  state = {
    patientId: "",
    trialId: "",
    success: false,
  }

  componentDidMount() {
    this.setState({
      patientId: this.props.match.params.id,
      trialId: this.props.match.params.trial_id
    })
  }

  updatePatient = (params) => {
    const { patientId, trialId } = this.state;

    ApiRequest('patient', 'put', patientId, params, { resource: 'trial', id: trialId }).then(response => {
      if(response.status === 200) {
        this.setState({ success: true });
      }
    })

    this.feedbackRequests(params.patient)
  }

  feedbackRequests = (params) => {
    const { patientId, trialId } = this.state;

    let feedbackParams = {
      feedback: {
        state: params.feedback,
        patient_id: patientId,
        trail_id: trialId,
      }
    }
    if (params.feedbackId) {
      ApiRequest('feedback', 'put', params.feedbackId, feedbackParams, { resource: 'trial', id: trialId }).then(response => {
        console.log("feedback updated successfully")
      })
    } else {
      ApiRequest('feedback', 'post', null, feedbackParams, { resource: 'trial', id: trialId}).then(resource => {
        console.log("feedback created successfully")
      })
    }
  }

  render() {
    const { patientId, success, trialId } = this.state;

    if(success) {
      return <Redirect to={`/trials/${trialId}/patients`} />
    }

    return (
      <PatientForm
        patientId={this.props.match.params.id}
        trialId={this.props.match.params.trial_id}
        updatePatient={(params) => {this.updatePatient(params)}}
      />
    )
  }
}