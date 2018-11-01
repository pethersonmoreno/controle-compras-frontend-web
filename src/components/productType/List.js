import React, {Component} from 'react';
import AppContent from '../AppContent';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {productTypes} from '../dataApp';

class List extends Component{
  edit(productType){
    const { history } = this.props;
    history.push('/productType/'+productType.id);
  }
  render(){
    return (
      <AppContent titulo="Lista de Tipos de Produtos">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell numeric>ID</TableCell>
                <TableCell>Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productTypes.map(productType => {
                return (
                  <TableRow key={productType.id}>
                    <TableCell>
                      <IconButton onClick={this.edit.bind(this, productType)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell numeric>{productType.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {productType.description}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </AppContent>
    );
  }
}
export default List;