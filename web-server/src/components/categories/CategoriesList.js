import React, { useEffect } from 'react'
import Loading from '../common/Loading'
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from './actions'
import CategoriesItem from './CategoriesItem'
import Typography from "@material-ui/core/Typography";


const Categories = () => {
  const categories = useSelector(state => state.categoriesInfo.categories);
  const isLoading = useSelector(state => state.categoriesInfo.isLoading);
  const loaded = useSelector(state => state.categoriesInfo.loaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) dispatch(getCategories());
  }, [ dispatch, loaded ])

  return (
    <>
      <Typography align="center" style={{marginBottom: "20px"}}>
        <Typography
          component="span"
          variant="h4"
          paragraph
        >
          Model Categories
        </Typography>
      </Typography>
      { isLoading ? (
        <Loading />
      ) : (
        <>
          {categories && categories.root && (
            <Grid container spacing={2}>
              {categories.root.map(({ title, category_id, parent_id }, i) => {
              return (
                <Grid item key={category_id} xs={12} sm={6} md={3} lg={2}>
                  <CategoriesItem categoryId={i} />
                </Grid>
              )})}
            </Grid>
          )}
        </>
      )}
    </>
  )
}

export default Categories;
