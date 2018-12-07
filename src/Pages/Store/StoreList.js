import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations } from 'controle-compras-frontend-redux/ducks/stores';
import { List } from '@material-ui/core';
import PaperListItem from 'Atoms/PaperListItem';

const StoreList = (props) => {
  const {
    history, uid, stores, remove,
  } = props;
  return (
    <PageTemplate titulo="Lojas">
      <List disablePadding>
        {stores.map(store => (
          <PaperListItem
            button
            key={store.id}
            onClick={() => history.push(`/store/${store.id}`)}
          >
            <div className="content">
              {store.name}
            </div>
            <div className="contentRight">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  asyncOperation(() => remove(uid, store.id), {
                    successMessage: `Sucesso ao remover Loja ${store.name}`,
                    errorMessage: `Erro ao remover Loja ${store.name}`,
                  });
                }}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </div>
          </PaperListItem>
        ))}
      </List>
      <ButtonFabContainer>
        <ButtonFab onClick={() => history.push('/store/new')}>
          <AddIcon />
        </ButtonFab>
      </ButtonFabContainer>
    </PageTemplate>
  );
};
StoreList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  stores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  remove: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  stores: state.stores,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    remove: operations.remove,
  },
  dispatch,
);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(StoreList);
