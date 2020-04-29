const awsLambdaFastify = require('aws-lambda-fastify')
const { server } = require('./index')

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
]

exports.handler = async (event, context) => {
  const app = await server()
  const proxy = awsLambdaFastify(app, { binaryMimeTypes })
  return proxy(event, context)
}
