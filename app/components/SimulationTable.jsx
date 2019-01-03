import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    flex: 1,
    backgroundColor: '#313641',
    margin: '10px',
    minHeight: '100px',
    overflowX: 'auto'
  },
  cell: {
    padding: '0px 10px 0px 10px',
    color: 'rgba(255,255,255,0.8)',
    borderBottom: '1px solid rgba(100,100,100,1)'
  }
};

type Props = {
  tableData: [],
  classes: {}
};

class SimulationTable extends Component<Props> {
  render() {
    const { tableData, classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell} align="center">
                Time (s)
              </TableCell>
              <TableCell className={classes.cell} align="center">
                Iteration
              </TableCell>
              <TableCell className={classes.cell} align="center">
                dt (s)
              </TableCell>
              <TableCell className={classes.cell} align="center">
                Parts
              </TableCell>
              <TableCell className={classes.cell} align="center">
                MIPPS
              </TableCell>
              <TableCell className={classes.cell} align="center">
                MIPPS (cum)
              </TableCell>
              <TableCell className={classes.cell} align="center">
                maxneibs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(e => (
              <TableRow key={e.id}>
                <TableCell
                  className={classes.cell}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {e.time}
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  {e.iteration}
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  {e.dt}
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  {e.parts}
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  {e.MIPPS.last}
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  {e.MIPPS.cum}
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  {e.maxneibs}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(SimulationTable);
