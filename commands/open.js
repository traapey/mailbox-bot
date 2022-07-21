const { MessageEmbed } = require('discord.js');
const { parentMailbox, roleMailbox } = require('../config.json');
const moment = require('moment'); moment.locale('pt-br');
const db = require('quick.db')

exports.run = async (client, message, args, guild) => {

  if (message.channel.type !== 'dm') return message.channel.send(`**${message.author.username}** esse comando só pode ser utilizado no meu **privado**!`)

  function ms(ms) {
    const seconds = ~~(ms/1000)
    const minutes = ~~(seconds/60)
    const hours = ~~(minutes/60) 
    const days = ~~(hours/24)
    return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }}

    let save_timer_daily = db.fetch(`delayTicket_${guild}_${message.author.id}`)

    let tempoMs = 300000;
    let saveDbMS = await save_timer_daily
    let tempo = ms(tempoMs - (Date.now() - saveDbMS))

  const searchTicket = guild.channels.cache.find(ch => ch.topic == message.author.id);

  if(tempo.hours > 0 || tempo.minutes > 0 || tempo.seconds > 0) {
    message.author.send({content: `Seu ticket foi fechado recentemente, você deve aguardar **${tempo.minutes} minuto(s) e ${tempo.seconds} segundo(s)** para abrir outro!`})
  } else {

  if (searchTicket) {
    const embedTicketHas = new MessageEmbed()
    .setColor('RED')
    .setDescription('Você já possui um ticket aberto!')

    return message.author.send(embedTicketHas);
  }

  if (!searchTicket) {

    const embedCreateTicket = new MessageEmbed()
    .setColor('GREEN')
    .setDescription(`Deixe-nos saber o que você precisa e nossa equipe de moderação irá responder a você aqui o mais rápido possível.`)

    message.author.send(embedCreateTicket);

    const userConvert = guild.members.cache.get(message.author.id)
    const role = guild.roles.cache.get(roleMailbox);
    let ch;

    ch = await guild.channels.create(`ticket-${userConvert.displayName}`, {
      type: 'text',
      parent: parentMailbox,
      topic: userConvert.id,
      permissionOverwrites: [
        {
            id: guild.id,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        },
        {
            id: role.id,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
        }
    ]
}).then(c => {

  const ticketCreateinfo = new MessageEmbed()
  .setColor(3553598)
  .setDescription(`**TICKET criada**
  
  👤 Usuário: ${message.author} (${message.author.tag})
  🆔 ID: ${message.author.id}
  
  ❗ **Comandos para o uso:**
  Utilize o comando **/r** para responder o usuário da **ticket**;
  Utilize o comando **/fechar** para fechar a **ticket**;`)
  .setThumbnail(message.author.displayAvatarURL({ dyanmic: true }))
  
  c.send(ticketCreateinfo);
})
}
  }
}

module.exports.config = {
  name: 'open',
  aliases: ['abrir'],
  description: 'Abrir o ticket via dm do  bot!'
}