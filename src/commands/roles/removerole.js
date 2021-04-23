module.exports = {
  run: async(client, message, args, getUserFromMention, Discord) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You are not allowed to do that')

    const user = getUserFromMention(args[0]);
    if (!user) {
      const noUser = new Discord.MessageEmbed()
        .setColor('#9e5ab9')
        .setDescription(`Coulnt find user`)

      return message.channel.send(noUser);
    }
    const target = message.guild.members.cache.get(user.id);

    args.shift();
    const roleName = args.join(' ');

    const { guild } = message;

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {

      const noRoleEmbed = new Discord.MessageEmbed()
        .setColor('#9e5ab9')
        .setDescription(`There is no role with the name ${roleName}`)

      message.reply(noRoleEmbed);
      return
    }

    const member = guild.members.cache.get(target.id);

    if (member.roles.cache.get(role.id)) {

      member.roles.remove(role)

      const removeRoleEmbed = new Discord.MessageEmbed()
        .setColor('#24a8d4')
        .setDescription(`removed ${role} from ${user.tag}`)

      message.channel.send(removeRoleEmbed);
    } else {
      const neverHadEmbed = new Discord.MessageEmbed()
        .setColor('#9e5ab9')
        .setDescription(`The user does not have ${role}`)

      message.reply(neverHadEmbed);
    }

  },
  aliases: ['roleremove'],
  description: 'removes a role to user'
}
