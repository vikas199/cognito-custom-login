module.exports = {
  launch: {
    dumpio: true,
    headless: 'false',
    args: ['--no-sandbox']
  },
  server: {
    command: 'yarn start',
    port: 3005
  },
  browserContext: 'default'
}
