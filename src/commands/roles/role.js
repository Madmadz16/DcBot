const Discord = require('discord.js');

module.exports = {
  run: async(client, message, args) => {

    const user = message.mentions.members.first();
    if (!user) {
      const noUser = new Discord.MessageEmbed()
        .setColor('#9e5ab9')
        .setDescription(`couldn't find user`)

      return message.channel.send(noUser);
    }

    let rolemap = user.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r)
      .join("\n");
    if (rolemap.length > 1024) rolemap = "To many roles to display";
    if (!rolemap) rolemap = "No roles";

    // const roles = roles.cache(user);

    const roles1Embed = new Discord.MessageEmbed()
      .setColor('#9e5ab9')
      .addField("Role Name", `${rolemap}`)
    await message.channel.send(roles1Embed);
  },
  aliases: [],
  description: 'Lists every role from a user'
}
