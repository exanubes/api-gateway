import * as cdk from '@aws-cdk/core'
import {IFunction, Function, Runtime, Code} from "@aws-cdk/aws-lambda";
import * as path from "path";

export class LambdaStack extends cdk.Stack {
    handler: IFunction
    constructor(app: cdk.App) {
        super(app, LambdaStack.name);
        this.handler = new Function(this, 'hello-world', {
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            runtime: Runtime.NODEJS_14_X,
            handler: "hello-world.main",
            code: Code.fromAsset(path.join(__dirname, "/../lambda/", 'hello-world'))
        })
    }
}
