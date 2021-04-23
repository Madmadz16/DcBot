module.exports = {
  run: async(client, message, args, getUserFromMention, Discord) => {
    message.delete();

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You are not allowed to do that');

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
      await target.kick(reason);

      const kickEmbed = new Discord.MessageEmbed()
        .setColor('#cc3131')
        .setAuthor(`${user.tag} was kicked!`, user.avatarURL())
        .addFields(
          { name: 'Kicked by', value: `${message.author.tag}`},
          { name: 'Reason:', value: `${reason}`}
        )
      await message.channel.send(kickEmbed);
    } catch {
      const failedKickEmbed = new Discord.MessageEmbed()
        .setColor('#9e5ab9')
        .setDescription(`Failed to kick **${user.tag}**`)

      return message.channel.send(failedKickEmbed);
    }

  },
  aliases: [],
  description: 'kick user'
}
