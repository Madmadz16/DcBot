module.exports = {
  run: async(client, message, args) => {
    if (!args.length) {
		  return message.channel.send(`You have not provided enough arguments ${message.author}`);
	      } else if (args[0] === 'foo') {
          return message.channel.send('bar');
        }

	    message.channel.send(`Arguments: ${args} \nArguments Length: ${args.length}`);
  },
  aliases: ['args'],
  description: 'list the arguments'
}
