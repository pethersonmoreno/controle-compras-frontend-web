import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LabelIcon from '@material-ui/icons/Label';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShipListItem from '../Molecules/ShipListItem';
import {
  shipListItems,
  categories,
  products,
  productTypes,
  SELECAO_DIRETA,
  SELECAO_POR_TIPO_TAMANHO,
} from '../data';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 1,
  },
  categoryItem: {
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  badgeRoot: {
    flex: '1 1 auto',
  },
  badgeText: {
    '&:first-child': {
      paddingLeft: '10px',
    },
  },
  badgeBadge: {
    top: 1,
    right: -2,
    // The border color match the background color.
    border: `0px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});

const getShipListItemsOfCategory = (category, shipList) => {
  if (shipList === undefined) {
    return [];
  }
  return shipListItems
    .filter(item => item.shipListId === shipList.id)
    .filter((item) => {
      let productType;
      if (item.selecao === SELECAO_DIRETA) {
        const product = products.find(productItem => productItem.id === item.productId);
        if (product !== undefined) {
          productType = productTypes.find(type => type.id === product.productTypeId);
        }
      } else if (item.selecao === SELECAO_POR_TIPO_TAMANHO) {
        productType = productTypes.find(type => type.id === item.productTypeId);
      }
      return productType !== undefined && productType.categoryId === category.id;
    });
};
const CategoryItem = (props) => {
  const {
    history, classes, category, shipList, isExpanded, toggleCollapse,
  } = props;
  const itemsOfCategory = getShipListItemsOfCategory(category, shipList);
  const expanded = isExpanded();
  if (itemsOfCategory.length > 0) {
    return (
      <div>
        <ListItem button className={classes.categoryItem} onClick={toggleCollapse}>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <Badge
            badgeContent={itemsOfCategory.length}
            color="primary"
            classes={{ root: classes.badgeRoot, badge: classes.badgeBadge }}
          >
            <ListItemText inset primary={category.description} className={classes.badgeText} />
          </Badge>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {itemsOfCategory.map(item => (
              <ShipListItem
                key={item.id}
                history={history}
                className={classes.nested}
                item={item}
              />
            ))}
          </List>
        </Collapse>
      </div>
    );
  }
  return <div />;
};
CategoryItem.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  shipList: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  isExpanded: PropTypes.func.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
};
class CategoriesBox extends Component {
  constructor(props) {
    super(props);
    const { shipList } = props;
    let categoriesCollapsed = [];
    if (
      shipList !== undefined
      && shipListItems.filter(item => item.shipListId === shipList.id).length > 10
    ) {
      categoriesCollapsed = categories.map(category => category.id);
    }
    this.state = {
      categoriesCollapsed,
    };
  }

  handleCategoryExpandable = (category) => {
    const { categoriesCollapsed } = this.state;
    const newCategoriesCollapsed = categoriesCollapsed.concat();
    const index = newCategoriesCollapsed.indexOf(category.id);
    if (index === -1) {
      newCategoriesCollapsed.push(category.id);
    } else {
      newCategoriesCollapsed.splice(index, 1);
    }
    this.setState({ categoriesCollapsed: newCategoriesCollapsed });
  };

  isCategoryExpanded = (category) => {
    const { categoriesCollapsed } = this.state;
    return categoriesCollapsed.find(categoryId => categoryId === category.id) === undefined;
  };

  render() {
    const { history, classes, shipList } = this.props;
    return (
      <div>
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            history={history}
            classes={classes}
            toggleCollapse={() => this.handleCategoryExpandable(category)}
            isExpanded={() => this.isCategoryExpanded(category)}
            category={category}
            shipList={shipList}
          />
        ))}
      </div>
    );
  }
}
CategoriesBox.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  shipList: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export default withStyles(styles, { withTheme: true })(CategoriesBox);
