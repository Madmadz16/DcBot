module.exports = {
  run: async(client, message) => {
    message.channel.send('Pong!');
  },
  aliases: ['pong'],
  description: 'ping command'
}
