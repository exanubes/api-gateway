#!/usr/bin/env node
import * as cdk from "@aws-cdk/core"
import {resolveCurrentUserOwnerName} from '../utils'
import {ApiGatewayStack} from '../lib/api-gateway.stack'

async function main() {
    const owner = await resolveCurrentUserOwnerName()
    const app = new cdk.App()
    new ApiGatewayStack(app)
    cdk.Tags.of(app).add("owner", owner)
}

main().catch(error => {
    console.log(error)
    process.exit(1)
})
