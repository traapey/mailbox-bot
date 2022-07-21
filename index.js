const Discord = require('discord.js');
const client = new Discord.Client();

const { config } = require('dotenv');
const { readdirSync } = require('fs');

config({path: __dirname + '/.env'}); 

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const commands = readdirSync('./commands/').filter(file => file.endsWith('.js'));

commands.forEach(f => {
    const props = require(`./commands/${f}`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props);
    })
})

const eventsFiles = readdirSync('./events/').filter(file => file.endsWith('.js'));

eventsFiles.forEach(f => {
    const eventName = f.split('.')[0];
    const event = require(`./events/${f}`);

    client.on(eventName, event.bind(null, client));
});

client.on("message", message => {
  
  if(message.channel.id === '977970031793152002'){ // ID DO CANAL
   message.react('977968727402364999') // ID DO EMOJI 
   message.react('979895632636567592') // ID DO EMOJI
  }
  if(message.channel.id === '977968014500704297'){
                
                  message.react("979895632636567592")  
          } // FUNÇÃO (ADD EMOJI AUTOMÁTICA AO ENVIAR UMA MENSAGEM NO CANAL DEFINIDO)
  
    if (message.content.includes("https://discord.gg/")) { // BLOQUEADOR DE CONVITES, liberado apenas para cargos que tem permissão ADMINISTRADOR
          if (!message.member.hasPermission("ADMINISTRATOR")) {
              message.delete();
              message.reply("❌ **Você não tem permissão ao enviar link de (Discord) aqui.**");
          }
  
      }
  
  });

process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {


client.login(process.env.TOKEN);
