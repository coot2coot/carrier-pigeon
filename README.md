[![Code Climate](https://codeclimate.com/github/foundersandcoders/carrier-pigeon/badges/gpa.svg)](https://codeclimate.com/github/foundersandcoders/carrier-pigeon)

# Carrier Pigeon
## An Inventory Management System

#### Installation

Once you have cloned the project with git, run:

```
npm install
npm install gulp -g
```

and use command:

``` 
gulp
```

This compiles the sass and starts the server

To run all the tests first use command:

```
gulp test
gulp e2e
```


To run local e2e tests in one terminal:

```
gulp selenium-install
gulp selenium-start
```

In another termainal run:

```
gulp e2e-local
```