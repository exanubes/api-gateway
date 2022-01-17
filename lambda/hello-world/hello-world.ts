import {APIGatewayProxyEvent, Callback, Context} from "aws-lambda";

export async function main (event: APIGatewayProxyEvent, context: Context, callback: Callback) {
    const name = event?.queryStringParameters?.name
    if(!name){
        return callback(new Error('Name cannot be undefined'))
    }
    return {
        statusCode: 200,
        body: "Hello " + name,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'text/plain',
        },
    }

}
