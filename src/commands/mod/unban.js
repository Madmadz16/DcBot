const Discord = require('discord.js');

module.exports = {
  run: async(client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You are not allowed to do that');
    let userID = args[0]
    message.guild.fetchBans().then(bans=> {
      if(bans.size == 0) return
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return
      message.guild.members.unban(bUser.user)

      const unbanEmbed = new Discord.MessageEmbed()
        .setColor('#24a8d4')
        .setAuthor(`${userID} was Unbanned!`)
        .addField(`Unbanned by`, `${message.author.tag}`)

      message.channel.send(unbanEmbed)
    })
  },
  aliases: [],
  description: ''
}
