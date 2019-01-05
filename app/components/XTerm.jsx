import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as os from 'os';
import * as pty from 'node-pty-prebuilt';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';

type Props = {
  classes: {}
};

class XTerm extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.term = new Terminal({
      cursorBlink: true,
      fontSize: 12,
      experimentalCharAtlas: 'dynamic'
    });

    this.ptyProc = pty.spawn(
      os.platform() === 'win32'
        ? 'PowerShell.exe'
        : process.env.SHELL || '/bin/bash',
      [],
      {
        cols: this.term.cols,
        rows: this.term.rows
      }
    );
  }

  componentDidMount() {
    Terminal.applyAddon(fit);

    this.term.open(this.termContainer);
    this.term.fit();
    this.ptyProc.resize(
      Math.max(this.term.cols, 1),
      Math.min(this.term.rows, 1)
    );
    this.term.focus();

    this.term.on('data', (data: string) => {
      this.ptyProc.write(data);
    });

    window.onresize = () => this.term.fit();

    this.term.on('resize', size => {
      this.ptyProc.resize(
        Math.max(size ? size.cols : this.term.cols, 1),
        Math.min(size ? size.rows : this.term.rows, 1)
      );
    });

    this.ptyProc.on('data', data => {
      this.term.write(data);
    });
  }

  componentWillUnmount = () => {
    this.term.off('resize', () => null);
  };

  render() {
    const { classes } = this.props;
    const { terminalContainer } = classes;
    return (
      <div
        className={terminalContainer}
        ref={ref => {
          this.termContainer = ref;
        }}
      />
    );
  }
}

const styles = () => ({
  terminalContainer: {
    flex: '1',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    borderRadius: '10px',
    backgroundColor: 'black',
    border: '3px solid #313641'
  }
});

export default withStyles(styles, { withTheme: true })(XTerm);
