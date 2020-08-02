import React, { Component } from 'react';
import TrialConfigurationForm from './form.js'
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class DoctorEdit extends Component {
  state = {
    success: false,
    trialConfigurationId: "",
  }

  componentDidMount() {
    this.setState({ trialConfigurationId: this.props.match.params.id });
  }

  updateTrialConfiguration = (params) => {
    const { trialConfigurationId } = this.state;
    ApiRequest('trial_configuration', 'put', trialConfigurationId, params, null).then(response => {
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
        create={false}
        updateTrialConfiguration={(params) => this.updateTrialConfiguration(params)}
        trialConfigurationId={this.props.match.params.id}
      />
    )
  }
}