import {Arn, ArnFormat} from "@aws-cdk/core"
import {
    STSClient,
    GetCallerIdentityCommand,
    GetCallerIdentityCommandInput,
    GetCallerIdentityCommandOutput
} from "@aws-sdk/client-sts";
const client = new STSClient({})
const input: GetCallerIdentityCommandInput = {}
const command = new GetCallerIdentityCommand(input)

export async function resolveCurrentUserOwnerName(): Promise<string> {
    const result: GetCallerIdentityCommandOutput = await client.send(command)
    const parsed = Arn.split(result.Arn!, ArnFormat.SLASH_RESOURCE_NAME)
    return parsed.resourceName!
}
