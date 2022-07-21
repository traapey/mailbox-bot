const { MessageEmbed, MessageAttachment } = require('discord.js');
const { roleMailbox } = require('../config.json');

exports.run = async (client, message, args, guild) => {

  if (!message.member.roles.cache.has(roleMailbox)) return;
  if (message.channel.type === 'dm') return;

  const sendMessage = args.join(" ")

  if (!sendMessage) return;

  const channelName = message.channel.topic;
  const id = message.guild.members.cache.get(channelName);

  if (!message.guild.members.cache.get(id));

  try {

    await message.delete();

    const embedSendUser = new MessageEmbed()
    .setAuthor(`Equipe de Suporte`, client.user.displayAvatarURL())
    .setDescription(`**Suporte**: ${sendMessage}`)
    .setColor(3553598)
    .setImage(message.attachments.first() ? message.attachments.first().url : '')

    const embedSendChannel = new MessageEmbed()
    .setAuthor(`Equipe de Suporte`, client.user.displayAvatarURL())
    .setDescription(`**${message.author.tag}** **Suporte**: ${sendMessage}`)
    .setColor(3553598)
    .setImage(message.attachments.first() ? message.attachments.first().url : '')

    id.send(embedSendUser)
    message.channel.send(embedSendChannel)

  } catch (e) {
    console.log(e)
    message.reply('A dm dessa pessoa está fechada peça que habilite!')
  }
}

module.exports.config = {
  name: 'r',
  aliases: ['answer', 'responder'],
  description: 'Responde um ticket aberto!'
}