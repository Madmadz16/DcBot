module.exports = {
  run: async(client, message, args, getUserFromMention, Discord, logsID) => {
    message.delete();

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You are not allowed to do that');

    const user = getUserFromMention(args[0]);
    if (!user) {
      const noUser = new Discord.MessageEmbed()
        .setColor('#9e5ab9')
        .setDescription(`Coulnt find user`)

      return message.channel.send(noUser);
    }
    const target = message.guild.members.cache.get(user.id);

    let reason = 'No reason provided.'
    if (args[1]) {
      reason = args.slice(1).join(' ');
    }
    try {
      await target.ban({reason});

      const banEmbed = new Discord.MessageEmbed()
        .setColor('#cc3131')
        .setAuthor(`${user.tag} was Banned!`, user.avatarURL())
        .addFields(
          { name: `Banned by`, value: `${message.author.tag}`},
          { name: `Reason:`, value: `${reason}`}
        )
      await message.channel.send(banEmbed);

      const banLogEmbed = new Discord.MessageEmbed()
        .setColor('#cc3131')
        .setAuthor(`${user.tag} was Banned!`, user.avatarURL())
        .addFields(
          { name: `Banned by`, value: `${message.author.tag}`},
          { name: `UserID:`, value: `${user.id}`},
          { name: `Reason:`, value: `${reason}`}
        )

      const logsChannel = client.channels.cache.get(logsID);
      if(!logsChannel)	{
        await console.log('channel not found');
      } else {
        await logsChannel.send(banLogEmbed);
      }

    } catch {
      const failedBanEmbed = new Discord.MessageEmbed()
        .setColor('#9e5ab9')
        .setDescription(`Failed to ban **${user.tag}**`)

      return message.channel.send(failedBanEmbed);
    }

  },
  aliases: [],
  description: 'Ban user'
}
