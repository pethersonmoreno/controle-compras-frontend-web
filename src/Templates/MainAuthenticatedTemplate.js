import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuResponsive from 'Organisms/MenuResponsive';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations as operationsCategories } from 'controle-compras-frontend-redux/ducks/categories';
import { operations as operationsProductTypes } from 'controle-compras-frontend-redux/ducks/productTypes';
import { operations as operationsProducts } from 'controle-compras-frontend-redux/ducks/products';
import { operations as operationsShipLists } from 'controle-compras-frontend-redux/ducks/shipLists';
import withAuthorization from 'HOC/withAuthorization';

const styles = () => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
});

class MainAuthenticatedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { uid: props.uid };
  }

  componentDidMount() {
    const {
      startListenCategories,
      startListenProductTypes,
      startListenProducts,
      startListenShipLists,
    } = this.props;
    const { uid } = this.state;
    asyncOperation(
      Promise.all([
        startListenCategories(uid),
        startListenProductTypes(uid),
        startListenProducts(uid),
        startListenShipLists(uid),
      ]),
    );
  }

  componentWillUnmount() {
    const {
      stopListenCategories,
      stopListenProductTypes,
      stopListenProducts,
      stopListenShipLists,
    } = this.props;
    const { uid } = this.state;
    if (uid) {
      stopListenCategories(uid);
      stopListenProductTypes(uid);
      stopListenProducts(uid);
      stopListenShipLists(uid);
    }
  }

  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.root}>
        <MenuResponsive />
        <CssBaseline />
        {children}
      </div>
    );
  }
}

MainAuthenticatedTemplate.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  startListenCategories: PropTypes.func.isRequired,
  stopListenCategories: PropTypes.func.isRequired,
  startListenProductTypes: PropTypes.func.isRequired,
  stopListenProductTypes: PropTypes.func.isRequired,
  startListenProducts: PropTypes.func.isRequired,
  stopListenProducts: PropTypes.func.isRequired,
  startListenShipLists: PropTypes.func.isRequired,
  stopListenShipLists: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    startListenCategories: operationsCategories.startListenChanges,
    stopListenCategories: operationsCategories.stopListenChanges,
    startListenProductTypes: operationsProductTypes.startListenChanges,
    stopListenProductTypes: operationsProductTypes.stopListenChanges,
    startListenProducts: operationsProducts.startListenChanges,
    stopListenProducts: operationsProducts.stopListenChanges,
    startListenShipLists: operationsShipLists.startListenChanges,
    stopListenShipLists: operationsShipLists.stopListenChanges,
  },
  dispatch,
);
export default compose(
  withAuthorization({ loggedIn: true, emailVerified: true }, '/emailVerification'),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(MainAuthenticatedTemplate);