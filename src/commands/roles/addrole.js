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
    member.roles.add(role)

    const addedRoleEmbed = new Discord.MessageEmbed()
      .setColor('#24a8d4')
      .setDescription(`added ${role} to ${user.tag}`)

    message.channel.send(addedRoleEmbed);
  },
  aliases: ['roleadd'],
  description: 'adds a role to user'
}
