import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Chart from '../components/Chart';

type Props = {
  simulation: [],
  classes: {}
};

class ScatterLayout extends Component<Props> {
  props: Props;

  render() {
    const { simulation, classes } = this.props;
    const { chartView } = classes;

    return (
      <div className={chartView}>
        <Chart
          xLabel="iterations"
          yLabel="MIPPS"
          chartTension={0}
          chartData={simulation.map(elem => ({
            x: elem.iteration,
            y: elem.MIPPS.last
          }))}
        />
      </div>
    );
  }
}

const wstyles = () => ({
  chartView: {
    padding: '30px 10px 10px 10px',
    flex: '1',
    display: 'flex',
    minHeight: '140px'
  }
});

export default withStyles(wstyles, { withTheme: true })(ScatterLayout);
