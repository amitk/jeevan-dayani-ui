import React, { Component } from 'react';
import TrialConfigurationForm from './form.js';
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class TrialConfigurationCreate extends Component {
  state = {
    success: false,
  }

  createTrialConfiguration = (params) => {
    ApiRequest('trial_configuration', 'post', null, params, null).then(response => {
      if (response.status === 200) {
        this.setState({ success: true })
      }
    })
  }

  render() {
    const { success } = this.state;
    if (success) {
      return <Redirect to={`/trial_configurations`} />
    }
    return (
      <TrialConfigurationForm
        create={true}
        createTrialConfiguration={(params) => this.createTrialConfiguration(params)}
      />
    )
  }
}