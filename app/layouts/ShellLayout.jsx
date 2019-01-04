import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

type Props = {
  classes: {}
};

class ShellLayout extends Component<Props> {
  props: Props;

  render() {
    const { classes } = this.props;
    const { paperStyle } = classes;

    return <Paper className={paperStyle} />;
  }
}

const wstyles = () => ({
  paperStyle: {
    flex: '1',
    backgroundColor: '#313641',
    margin: '10px',
    padding: '10px',
    minHeight: '100px',
    overflowX: 'auto'
  }
});
export default withStyles(wstyles, { withTheme: true })(ShellLayout);
