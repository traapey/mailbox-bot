module.exports = async (client) => {
    client.user.setActivity('Pronto para ajuda-los!',  {type: 'WATCHING'});
    console.log(`${client.user.username} acaba de iniciar!`)
}