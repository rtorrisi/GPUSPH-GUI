import React, { Component } from 'react';

import SimulationTable from '../components/SimulationTable';

type Props = {
  simulation: [],
  isSimulating: boolean
};

class TableLayout extends Component<Props> {
  props: Props;

  render() {
    const { simulation, isSimulating } = this.props;

    return (
      <SimulationTable
        tableData={
          isSimulating
            ? simulation.slice(-30).reverse()
            : simulation.slice(0).reverse()
        }
      />
    );
  }
}

export default TableLayout;
