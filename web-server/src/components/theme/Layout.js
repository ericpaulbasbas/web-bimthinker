import React from "react"
import SEO from "../common/seo"
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Header from './Header'
import Footer from './Footer'

const LandingPage = ({ children, seoTitle = 'Home' }) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      width: '100%',
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Header />
        <SEO title={seoTitle} keywords={[`gatsby`, `application`, `react`]} />
        <Container className={classes.container} maxWidth="lg">
          { children }
        </Container>
      <Footer />
    </>
)}

export default LandingPage
