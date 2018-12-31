import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import * as instanceActions from '../actions/instanceActions';
import * as UIActions from '../actions/UIActions';

function mapStateToProps(state) {
  return {
    version: state.instance.version,
    problemName: state.instance.problemName,
    HDF5: state.instance.HDF5,
    MPI: state.instance.MPI,
    chrono: state.instance.chrono,
    capability: state.instance.capability,
    maxIter: state.instance.maxIter,
    outDir: state.instance.outDir,
    simulation: state.instance.simulation,
    isSimulating: state.instance.isSimulating,

    isDrawerOpen: state.UI.isDrawerOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      instanceActions: bindActionCreators(instanceActions, dispatch),
      UIActions: bindActionCreators(UIActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
