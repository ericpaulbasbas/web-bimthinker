# Whatchu Merchant
*This READ ME file is for Mac OS X setup. Windows setup to follow soon.*

## Pre-requisities
* [Gatsby] (https://www.gatsbyjs.org/tutorial/)
* [Golang](https://golang.org/dl/) version 10 or higher
* [dep](https://golang.github.io/dep/docs/installation.html), tool to manage GO dependencies, similar to npm.
* [Node](https://nodejs.org/en/) version 10 or higher
* [Yarn](https://yarnpkg.com/en/), serves the same purpose as npm but way more efficient and faster!

If you are new to Go, it is very important to read [How to Write Go Code](https://golang.org/doc/code.html) to setup your project structure. Go is unique in a sense that they are following a standard local directory.

## Getting Started

* Clone the repo

```
mkdir -p $GOPATH/src/github.com/ericpaulbasbas
cd $GOPATH/src/github.com/ericpaulbasbas
git clone git@github.com:ericpaulbasbas/web-bimthinker.git
cd web-bimthinker
```

## Build

### API Server

```
cd api-server
go build
```

It will create a binary file which you can easily run via `./api-server`.

### Web Server

```
cd web-server
npm install
```

It should automatically open a browser running the application.

## Test

We do not have tests yet but we should have in the future. To run test:

```
go test ./...
```
