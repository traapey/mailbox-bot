// COMANDO DE PAGAMENTOS ACEITO NO DISCORD, ELE É ENVIADO PARA O CRIADOR DO TICKET NO PRIVADO

const { roleMailbox, prefix } = require('../config.json');
const { MessageEmbed } = require('discord.js')

exports.run = async (bot, message, args) => {

  if (!message.member.roles.cache.has(roleMailbox)) return;

  const channelName = message.channel.topic;
  const id = message.guild.members.cache.get(channelName);
  let argumento = args[0];

  if (argumento == 'enviar') {

    message.channel.send(`Enviei nossa lista de pagamentos para o usuário **${id.user.username}**!`)

    const embed = new MessageEmbed()
    .setTitle(`NOME DO BOT | Pagamentos aceitos`)
    .setDescription(`Caso o meio de pagamento que você irá utilizar não se encontra aqui, entre em contato com algum membro da equipe e avise-o.
    
    <:pix:977968666324926534> **PIX** Faça o pagamento utilizando a chave pix **e-mail**.
     Chave: \`traapxy@gmail.com\``)
     .setColor('AQUA')
  
     id.send(embed)

  } else {

  const embed = new MessageEmbed()
  .setTitle(`NOME DO BOT | Pagamentos aceitos`)
  .setDescription(`Olá **${message.author.username}**, envie uma dessas chaves para nosso cliente, ou digite **${prefix}pagamentos enviar** que irei enviar para nosso cliente automaticamente.
  
  <:pix:977968666324926534> **PIX** Faça o pagamento utilizando a chave pix **e-mail**.
   Chave: \`traapxy@gmail.com\``)
   .setColor('AQUA')

   message.channel.send(embed)
  }

}

module.exports.config = {
  name: 'pix',
  aliases: ['paypal', 'pagamentos', 'chaves', 'contas'],
  description: 'Mostra nossas contas de pagamentos'
}