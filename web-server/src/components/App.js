import React from "react"
import ModelsListPage from "./models/ModelsListPage"
import ModelsItemPage from "./models/ModelsItemPage"
import LandingPage from "./landing/LandingPage"
import LoginPage from "./login/LoginPage"
import CategoriesListPage from "./categories/CategoriesListPage"
import { Router } from '@reach/router'

const App = () => {
  return (
    <Router>
      <LandingPage path="/" component={LandingPage} />
      <ModelsListPage path="/models" component={ModelsListPage} />
      <ModelsItemPage path="/models/:modelId" component={ModelsItemPage} />
      <CategoriesListPage path="/categories" component={CategoriesListPage} />
      <LoginPage path="/login" component={LoginPage} />
    </Router>
)}

export default App
