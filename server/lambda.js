const awsLambdaFastify = require('aws-lambda-fastify')
const { server } = require('./index')

const appPromise = server()

exports.handler = async (event, context) => {
  const app = await appPromise
  const proxy = awsLambdaFastify(app, { binaryMimeTypes: ['*/*'] })
  return proxy(event, context)
}
