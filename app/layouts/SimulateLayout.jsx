import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Chart from '../components/Chart';
import SimulationTable from '../components/SimulationTable';

type Props = {
  simulation: [],
  classes: {}
};

class SimulateLayout extends Component<Props> {
  props: Props;

  render() {
    const { simulation, classes } = this.props;
    const { chartView } = classes;

    return (
      <>
        <div className={chartView}>
          <Chart
            xLabel="my X"
            yLabel="my Y"
            chartTension={0.2}
            chartData={simulation.map(elem => ({
              x: elem.iteration,
              y: elem.MIPPS.last
            }))}
          />
        </div>
        <SimulationTable tableData={simulation} />
      </>
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

export default withStyles(wstyles, { withTheme: true })(SimulateLayout);
