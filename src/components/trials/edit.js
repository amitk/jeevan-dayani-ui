import React, { Component } from 'react';
import TrialForm from './form.js'
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class TrialEdit extends Component {
  state = {
    success: false,
    trialConfigurationId: "",
  }

  componentDidMount() {
    this.setState({ trialId: this.props.match.params.id });
  }

  updateTrial = (params) => {
    const { trialId } = this.state;
    ApiRequest('trial', 'put', trialId, params, null).then(response => {
      if (response.status === 200) {
        this.setState({ success: true })
      }
    })
  }

  render() {
    const { success } = this.state;

    if (success) {
      return <Redirect to={`/trials`} />
    }
    return (
      <TrialForm
        create={false}
        updateTrial={(params) => this.updateTrial(params)}
        trialId={this.props.match.params.id}
      />
    )
  }
}