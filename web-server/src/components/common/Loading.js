import React from 'react'
import ContentLoader from 'react-content-loader'

export default () => (
  <ContentLoader
    height={160}
    width={400}
    speed={1}
    primaryColor="#dedddf"
    secondaryColor="#ecebeb"
  >
    <circle cx="10" cy="20" r="8" />
    {/* <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> */}
    <circle cx="40" cy="20" r="8" />
    {/* <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> */}
    <circle cx="70" cy="20" r="8" />
    {/* <rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> */}
    <circle cx="100" cy="20" r="8" />
    {/* <rect x="25" y="105" rx="5" ry="5" width="220" height="10" /> */}
  </ContentLoader>
)
