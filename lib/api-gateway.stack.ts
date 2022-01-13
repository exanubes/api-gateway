import * as cdk from '@aws-cdk/core'

export class ApiGatewayStack extends cdk.Stack {
    constructor(app: cdk.App) {
        super(app, ApiGatewayStack.name);
    }
}
