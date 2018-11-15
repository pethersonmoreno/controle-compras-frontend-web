import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import Form from '../ShipListItemForm';

const ShipListItemEdit = ({
  history, match, shipLists, editShipListItem,
}) => {
  const {
    params: { shipListId, id: shipListItemId },
  } = match;
  const shipList = shipLists.find(i => i.id === shipListId);
  let shipListItem;
  if (shipList && shipList.items) {
    shipListItem = shipList.items.find(item => item.id === shipListItemId);
  }
  let conteudo = <Typography>Item não encontrado</Typography>;
  if (shipListItem !== undefined) {
    conteudo = (
      <Form
        item={shipListItem}
        textoBotao="Alterar"
        onSubmit={(data) => {
          editShipListItem(shipListId, shipListItemId, data);
          history.push('/shipList');
        }}
      />
    );
  }
  return <PageTemplate titulo="Editar Item">{conteudo}</PageTemplate>;
};
ShipListItemEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  editShipListItem: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  shipLists: state.shipLists.shipLists,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editShipListItem: operations.editShipListItem,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListItemEdit);
