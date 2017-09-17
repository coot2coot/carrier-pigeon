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

This compiles the sass and starts the server.

Before you join in developing this project, do make sure you have a `credentials.json` file. This is an example of what that should look like:

```
{
	"secret": "yourJwtSecret",
	"username":"yourSauceLabsUsername",
	"accesskey":"yourSauceLabsAccessKey",
	"postgres": "dbUrl",
	"testUsername": "testUsername",
	"testAdminUsername":  "testUsername",
	"testPassword": "testPassword",
	"testAdminPassword": "testPassword",
	"mailGunApiKey": "example1234",
	"mailGunDomain": "example1234.mailgun.org"
}
```

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

In another terminal run:

```
gulp e2e-local
```

#### Deployment

The app is currently hosted on AWS Elastic Beanstalk. Dan can provide credentials to the root Coot Freight AWS account on request.

Make sure you're using AWS in the correct region, or you won't be able to see the app! (Ireland)

##### Building

To build for production run `gulp build`

##### Credentials

Ask Dan or a developer who has worked on the project before to provide access to the credentials for the production environment.

##### Database

The production database is hosted on AWS RDS. The credentials can be found via the app's config in Elastic Beanstalk. Using the credentials, you can connect to the postgres instance locally (either by running the app locally or via psql). Additionally, you need to go to the security group settings for the RDS instance and allow postgres connections from your own IP address.

##### Deploying to Elastic Beanstalk

You need to build before deploying. After building you can either:

1. Upload a ZIP in the Elastic Beanstalk console

2. Use the Elastic Beanstalk CLI tool (I recommend this option)

##### Setting up the EB CLI

1. Create a new user in AWS IAM, add the user to the Carrier Pigeon group - this gives them admin permissions. Download the user's credentials as a CSV. Use this account for logging in from now on.

2. Install the EBS CLI globally, if you don't have it already (with Homebrew you can run `brew install awsebcli`)

3. If you're already using AWS / EB CLI tools, add the new user to your root AWS config / credential files (See [this stackoverflow question](https://stackoverflow.com/questions/29190202/how-to-change-the-aws-account-using-the-elastic-beanstalk-cli) for help).

4. From within the root directory of your project, run `eb init --profile [NAME_OF_PROFILE_IN_YOUR_AWS_CONFIG]`

5. Set the production instance as your default Elastic Beanstalk environment - `carrierPigeonFac-Se-env`

6. Now you can deploy via git by running `eb deploy` (making sure you've added all your build files)
