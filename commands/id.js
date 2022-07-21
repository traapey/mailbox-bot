const { roleMailbox } = require('../config.json');

exports.run = async (bot, message, args) => {

  if (!message.member.roles.cache.has(roleMailbox)) return;

  const channelName = message.channel.topic;
  const id = message.guild.members.cache.get(channelName);

message.channel.send(id);

}

module.exports.config = {
  name: 'id',
  aliases: ['id'],
  description: 'Mostrar o id do autor do ticket'
}