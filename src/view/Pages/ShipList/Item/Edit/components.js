import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../../Templates/PageTemplate';
import Form from '../../../../Organisms/ShipListItemForm';
import { shipListItems } from '../../../../../data';

const editShipListItem = (shipListItemId, history, valores) => {
  const shipListItem = shipListItems.find(item => item.id === shipListItemId);
  Object.assign(shipListItem, valores);
  history.push('/shipList');
};
const Edit = ({ history, match }) => {
  const shipListItemId = parseInt(match.params.id, 10);
  const shipListItem = shipListItems.find(item => item.id === shipListItemId);
  let conteudo = <Typography>Item não encontrado</Typography>;
  if (shipListItem !== undefined) {
    conteudo = (
      <Form
        item={shipListItem}
        textoBotao="Alterar"
        onSubmit={valores => editShipListItem(shipListItemId, history, valores)}
      />
    );
  }
  return <PageTemplate titulo="Editar Item">{conteudo}</PageTemplate>;
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Edit;
