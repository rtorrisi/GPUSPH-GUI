import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import * as instanceActions from '../actions/instanceActions';

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
    simulation: state.instance.simulation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(instanceActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
