import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as pty from 'node-pty-prebuilt';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';

type Props = {
  classes: {},
  terminalPath: string
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

    const { terminalPath } = props;
    this.ptyProc = pty.spawn(terminalPath, [], {
      cols: this.term.cols,
      rows: this.term.rows
    });
  }

  componentDidMount() {
    Terminal.applyAddon(fit);

    this.term.open(this.termContainer);
    this.term.focus();

    this.term.on('data', (data: string) => {
      this.ptyProc.write(data);
    });

    window.onresize = () => {
      this.term.fit();
      this.ptyProc.resize(this.term.cols, this.term.rows);
    };

    this.ptyProc.on('data', data => {
      this.term.write(data);
    });

    this.term.fit();
    this.ptyProc.resize(this.term.cols, this.term.rows);
  }

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
