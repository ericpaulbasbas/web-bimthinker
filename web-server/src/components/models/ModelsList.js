import React from 'react'
import Loading from '../common/Loading'
import Grid from "@material-ui/core/Grid";
import { useSelector } from 'react-redux'
import ModelsItem from './ModelsItem'


const Models = () => {
  const models = useSelector(state => state.modelsState.models);
  const isLoading = useSelector(state => state.modelsState.isLoading);

  return (
    <>
      { isLoading ? (
        <Loading />
      ) : (
        <>
          { models ? (
            <Grid container spacing={2}>
              {models.map(({ title, model_id, description, image_name, category }, i) => {
              return (
                <Grid item key={model_id} xs={12} sm={6} md={3} lg={2}>
                  <ModelsItem modelId={i} />
                </Grid>
              )})}
            </Grid>
          ) : (<h2>No models found</h2>)}
        </>
      )}
    </>
  )
}

export default Models;
