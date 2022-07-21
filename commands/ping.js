const { roleMailbox } = require('../config.json');

exports.run = async (bot, message, args) => {

    message.channel.send({ content: `Meu ping atual é **${bot.ws.ping}ms**!` })

}

module.exports.config = {
  name: 'ping',
  aliases: ['latencia'],
  description: 'Mostrar o meu ping'
}