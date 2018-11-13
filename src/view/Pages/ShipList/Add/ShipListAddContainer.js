import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { operations } from '../../../../state/ducks/shipList';
import ShipListAdd from './ShipListAdd';

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateShipListSelected: operations.updateShipListSelected,
  },
  dispatch,
);
const ShipListAddContainer = connect(
  null,
  mapDispatchToProps,
)(ShipListAdd);
export default ShipListAddContainer;