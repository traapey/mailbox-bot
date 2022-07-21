const { prefix, guildId, roleMailbox } = require('../config.json');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = async (client, message) => {
  const guild = client.guilds.cache.get(guildId);

  if (message.author.bot) return;
  if (message.channel.type === 'dm') {
    if (message.channel.type !== 'dm' && !message.member.roles.cache.has(roleMailbox)) return;

    const searchTicket = guild.channels.cache.find(ch => ch.topic == message.author.id);
    if (searchTicket && !message.content.toLowerCase().startsWith(`${prefix}open`) && !message.content.toLowerCase().startsWith(`${prefix}abrir`) && !message.content.toLowerCase().startsWith(`${prefix}ajuda`) && !message.content.toLowerCase().startsWith(`${prefix}help`)) {

      try {

        const embedSendUser = new MessageEmbed()
        .setDescription(`💬 **${message.author.tag}**: ${message.content}`)
        .setColor('ORANGE')

        if (message.attachments.size !== 0) embedSendUser.setImage(message.attachments.first().url);

        searchTicket.send(embedSendUser)

        const embedSendTicket = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Mensagem enviada para nossos moderadores, aguarde pacientemente.`)

        return message.author.send(embedSendTicket)
      } catch {
        return;
      }
    }
  
  if (!searchTicket && !message.content.toLowerCase().startsWith(`${prefix}open`) && !message.content.toLowerCase().startsWith(`${prefix}abrir`) && !message.content.toLowerCase().startsWith(`${prefix}ajuda`) && !message.content.toLowerCase().startsWith(`${prefix}help`)) {
    const embedNoHasTicket = new MessageEmbed()
    .setColor(3553598)
    .setDescription(`Utilize \`\`${prefix}abrir\`\` para abrir um ticket!`) 

    message.author.send(embedNoHasTicket).catch(err => {
      return;
    });
  }
}
  
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const execute = client.commands.get(command) || client.aliases.get(command);

  if (!execute) return;

  try {
    execute.run(client, message, args, guild);
  } catch (e) {
    console.log(e);
  }
}  