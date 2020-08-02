import React, { Component } from 'react';
import TrialForm from './form.js';
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';

export default class TrialCreate extends Component {
  state = {
    success: false,
  }

  createTrial = (params) => {
    ApiRequest('trial', 'post', null, params, null).then(response => {
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
        create={true}
        createTrial={(params) => this.createTrial(params)}
      />
    )
  }
}