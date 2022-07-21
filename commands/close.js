const { MessageEmbed } = require('discord.js');
const { roleMailbox } = require('../config.json');
const ms = require('ms');
const db = require('quick.db')

exports.run = async (client, message, args, guild) => {
  
  if (!message.member.roles.cache.has(roleMailbox)) return;
  
  const channelName = message.channel.topic;
  const id = message.guild.members.cache.get(channelName);
  
  if (!id) return;
  
  const embedClose = new MessageEmbed()
  .setColor('AQUA')
  .setDescription(`O seu ticket em nosso servidor foi encerrado, caso ainda precise de ajuda basta digitar **/abrir** aqui mesmo em meu privado.`)
  
  if (!args[0]) {
    message.channel.send('Esse ticket será fechado em 5 segundos!')
    setTimeout(() => {

      function ms(ms) {
        const seconds = ~~(ms/1000)
        const minutes = ~~(seconds/60)
        const hours = ~~(minutes/60) 
        const days = ~~(hours/24)
        return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }}

        let save_timer_daily = db.fetch(`delayTicket_${message.guild.id}_${id}`)
    
        let tempoMs = 3600000;
        let saveDbMS = save_timer_daily
        let tempo = ms(tempoMs - (Date.now() - saveDbMS))

      db.set(`delayTicket_${guild}_${id}`, Date.now())

      id.send(embedClose);
      message.channel.delete();
    },5000)
  
  } else {
    const time = ms(args[0]);

    if (time) {
      message.channel.send(`Esse ticket será fechado no tempo de ${args[0]}!`)
      setTimeout(() => {
        id.send(embedClose);
        db.set(`delayTicket_${guild}_${id}`, Date.now())
        message.channel.delete();
      }, time);

    }
  }
}

module.exports.config = {
  name: 'close',
  aliases: ['fechar'],
  description: 'Fechar um ticket!'
}