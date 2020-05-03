import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from 'react-redux'
import Popover from '@material-ui/core/Popover'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { getModels } from '../common/actions'
import { navigate } from 'gatsby'

const CategoriesItem = ({ categoryId }) => {
  const [ focused, setFocused ] = useState(false);
  const categories = useSelector(state => state.categoriesInfo.categories);
  const category = categories.root[categoryId];
  const dispatch = useDispatch();

  const subcat = categories[category.category_id] ? categories[category.category_id] : null;
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const useStyles = makeStyles((theme) => ({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardActions: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    cardContent: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(0),
      margin: 'auto',
      display: "flex",
      flexDirection: "row"
    },
    media: {
      height: 180,
      backgroundSize: 'inherit',
      borderBottom: '1px solid #eee',
    },
    typographyCategory: {
      fontSize: '12px',
      flexGrow: 1,
      color: '#CCC',
      textTransform: 'uppercase',
      display: 'inline-block',
    },
    typographyTitle: {
      fontSize: '15px',
      flexGrow: 1,
      display: 'inline-block',
    },
  }));

  const classes = useStyles();


  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);
  const getModelByCategory = e => {
    dispatch(getModels({ category: category.category_id }));
    navigate('/models');
  }

  return (
    <>
      <Card className={classes.card}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        raised={focused}
        onFocus={ () => void 0 }
        onBlur={ () => void 0 }
        onClick={subcat ? handleClick : getModelByCategory}
      >
        <CardContent className={classes.cardContent}>
          <Typography className={classes.typographyTitle}>
            {category.title}
          </Typography>
          {subcat ? <ArrowDropDownIcon /> : null}
        </CardContent>
      </Card>
      {subcat && (
      <Popover
        id="simple-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List component="nav" aria-label="main">
          {subcat.map(({ title, category_id, parent_id }, i) => {
          return (
            <ListItem
              button
              key={i}
              onClick={() => {
                dispatch(getModels({ category: category_id }));
                navigate('/models');
              }}
            >
              <ListItemText primary={title} />
            </ListItem>
          )})}
        </List>
      </Popover>
      )}
    </>
  )
}

export default CategoriesItem;
