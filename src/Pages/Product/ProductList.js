import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import { operations } from 'controle-compras-frontend-redux/ducks/products';

const ProductList = (props) => {
  const { history, products, removeProduct } = props;
  return (
    <PageTemplate titulo="Lista de Produtos">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="colunaBotoes" padding="none" />
              <TableCell>Produto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const { productType } = product;
              const brand = product && product.brand;
              const size = product && product.size;
              const productDescription = `${productType.description} ${brand} ${size}`;
              return (
                <TableRow key={product.id}>
                  <TableCell padding="none">
                    <IconButton onClick={() => history.push(`/product/${product.id}`)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => removeProduct(product.id)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {productDescription}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <ButtonFabContainer>
        <ButtonFab onClick={() => history.push('/product/new')}>
          <AddIcon />
        </ButtonFab>
      </ButtonFabContainer>
    </PageTemplate>
  );
};
ProductList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  removeProduct: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  products: state.products,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    removeProduct: operations.removeProduct,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductList);