import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

type Props = {
  classes: {},
  execPath: string
};

class SimulateLayout extends Component<Props> {
  props: Props;

  render() {
    const { execPath, classes } = this.props;
    const { paperStyle, table, cell, cellRight } = classes;

    return (
      <Paper className={paperStyle}>
        <Table className={table}>
          <TableBody>
            <TableRow>
              <TableCell
                className={cell}
                align="right"
                component="th"
                scope="row"
              >
                GPUSPH exe path
              </TableCell>
              <TableCell className={cellRight} align="left">
                {execPath}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={cell}
                align="right"
                component="th"
                scope="row"
              >
                Setting 2
              </TableCell>
              <TableCell className={cellRight} align="left">
                2
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={cell}
                style={{ border: '0' }}
                align="right"
                component="th"
                scope="row"
              >
                Setting 3
              </TableCell>
              <TableCell
                className={cellRight}
                style={{ border: '0' }}
                align="left"
              >
                3
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const wstyles = () => ({
  paperStyle: {
    backgroundColor: '#313641',
    margin: '10px',
    minHeight: '100px',
    overflowX: 'auto'
  },
  cell: {
    width: '110px',
    padding: '4px 24px 4px 24px',
    color: 'rgba(255,255,255,0.8)',
    borderBottom: '1px solid rgba(100,100,100,0.5)'
  },
  cellRight: {
    width: 'auto',
    padding: '4px 24px 4px 24px',
    backgroundColor: '#272a31',
    color: 'rgba(255,255,255,0.8)',
    borderBottom: '1px solid rgba(100,100,100,0.5)'
  }
});
export default withStyles(wstyles, { withTheme: true })(SimulateLayout);
