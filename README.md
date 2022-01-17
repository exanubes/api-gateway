# API Gateway

Repository from [exanubes.com](https://exanubes.com) for [Create API Gateway with custom domain](https://exanubes.com/blog/create-api-gateway-with-custom-domain).


## Commands:

Run the following commands for deploying and destroying the stacks

```
npm run cdk:deploy
npm run cdk:destroy
```


Both of these commands use the `aws-cli sts` service to get the account id and aws IAM role `exanubes-cloudformation-access` in order to dynamically provide role arn. Make sure you're using the account you want to deploy the stacks to and that you have the role created either with the same name or different name and change the scripts in `package.json`.

These commands use `sam-beta-cdk` CLI, you can install it with:

```
brew install aws-sam-cli-beta-cdk
```
