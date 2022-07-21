module.exports = async (client, member) => {
    const channel = client.channels.cache.find(ch => ch.name.includes(member.username))
    if (!channel) return;

    if (channel) {
        channel.send(`Esse membro saiu do servidor, para evitar erros não utilize mais comandos aqui, feche manualmente o canal!`)
    }
}