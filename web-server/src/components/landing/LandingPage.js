import React from "react"
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Layout from '../theme/Layout';
import CategoriesList from '../categories/CategoriesList'

const LandingPage = () => {
  return (
    <Layout seoTitle="Home">
      <Typography align="center">
        <Typography
          component="span"
          variant="h2"
          align="center"
          color="secondary"
          display="inline"
          style={{fontWeight: '600', color: '#1EB980'}}
        >
          BIM
        </Typography>
        <Typography
          component="span"
          variant="h2"
          align="center"
          color="textPrimary"
          display="inline"
        >
          thinker
        </Typography>
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        the model shop
      </Typography>
      <div style={{marginBottom: '50px'}}></div>
      <Typography variant="h5" align="center" color="textSecondary" paragraph gutterBottom>
        <Button variant="contained" color="secondary" disableElevation href="/categories">Explore Models</Button>
      </Typography>
      <div style={{marginBottom: '50px'}}></div>
      <CategoriesList />
    </Layout>
)}

export default LandingPage
