import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import XTerm from '../components/XTerm';

class ShellLayout extends Component {
  render() {
    return <XTerm />;
  }
}

const wstyles = () => ({});
export default withStyles(wstyles, { withTheme: true })(ShellLayout);
