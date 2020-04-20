// const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const fastify = require('fastify')({
  logger: true,
})
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = require.main === module
// Instantiate nuxt.js
const nuxt = new Nuxt(config)

fastify.use(nuxt.render)

if (require.main === module) {
  nuxt.ready()
  // Build only in dev mode
  const builder = new Builder(nuxt)
  builder.build()

  fastify.listen(
    process.env.PORT || 3000,
    process.env.HOST || '127.0.0.1',
    (err, address) => {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    }
  )
} else {
  exports.server = async () => {
    await nuxt.ready()
    await fastify.ready()
    return fastify
  }
}
