import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import XTerm from '../components/XTerm';

type Props = {
  terminalPath: string
};

class TerminalLayout extends Component<Props> {
  props: Props;

  render() {
    const { terminalPath } = this.props;
    return <XTerm terminalPath={terminalPath} />;
  }
}

const wstyles = () => ({});
export default withStyles(wstyles, { withTheme: true })(TerminalLayout);
