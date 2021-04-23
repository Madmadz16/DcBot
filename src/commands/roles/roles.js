module.exports = {
  run: async(client, message, args, getUserFromMention, Discord) => {

    let rolemap = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r)
      .join("\n");
      if (rolemap.length > 1024) rolemap = "To many roles to display";
      if (!rolemap) rolemap = "No roles";

    const rolesEmbed = new Discord.MessageEmbed()
      .setColor('#9e5ab9')
      .addFields(
        { name: "Role Name", value: `${rolemap}`, inline: true }
      )
    await message.channel.send(rolesEmbed);

  },
  aliases: ['serverrole, serverroles'],
  description: 'Gets every role on server'
}
