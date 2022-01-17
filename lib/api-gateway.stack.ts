import * as cdk from '@aws-cdk/core'
import {
    BasePathMapping,
    DomainName,
    EndpointType,
    LambdaIntegration, LambdaRestApi,
    SecurityPolicy
} from "@aws-cdk/aws-apigateway";
import {IFunction} from "@aws-cdk/aws-lambda";
import {Certificate} from "@aws-cdk/aws-certificatemanager";
import {CnameRecord, HostedZone} from "@aws-cdk/aws-route53";

const certificateArn = "arn:aws:acm:us-east-1:453764188484:certificate/81b397ed-9fc4-4092-9121-27283b4aab81"

export class ApiGatewayStack extends cdk.Stack {
    constructor(app: cdk.App, handler: IFunction) {
        super(app, ApiGatewayStack.name);

        const certificate = Certificate.fromCertificateArn(this, 'api-gw-certificate', certificateArn)

        const domain = new DomainName(this, 'api-gw-domain-name', {
            domainName: 'custom.exanubes.com',
            certificate,
            securityPolicy: SecurityPolicy.TLS_1_2,
            endpointType: EndpointType.EDGE
        })

        const api = new LambdaRestApi(this, 'api-gateway', {
            proxy: false,
            handler: handler,
            defaultCorsPreflightOptions: {
                allowOrigins: ['http://localhost:3000'],
            },
        })
        new BasePathMapping(this, 'api-gw-base-path-mapping', {
            domainName: domain,
            restApi: api
        })

        const hostedZone = HostedZone.fromHostedZoneAttributes(
            this,
            'hosted-zone',
            {
                hostedZoneId: 'Z00971403R2PNG6AZVK4K',
                zoneName: "exanubes.com"
            }
        )

        new CnameRecord(
            this,
            'api-gw-custom-domain-cname-record',
            {
                recordName: 'custom',
                zone: hostedZone,
                domainName: domain.domainNameAliasDomainName
            }
        )
        const helloIntegration = new LambdaIntegration(handler)
        const hello = api.root.addResource('hello')
        hello.addMethod("GET", helloIntegration)
    }
}
