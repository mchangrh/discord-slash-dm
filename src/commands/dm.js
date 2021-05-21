const { InteractionResponseType } = require('discord-interactions');
const { ApplicationCommandOptionType } = require('slash-commands');

module.exports = {
  name: 'dm',
  description: 'Sends a DM to the dev.',
  options: [
    {
      name: 'message',
      description: 'Your message',
      type: ApplicationCommandOptionType.STRING,
      required: true,
    }
  ],
  execute: async ({ interaction, response }) => {
    // Get the raw values from Discord
    const rawText = ((interaction.data.options.find(opt => opt.name === 'message') || {}).value || '').trim()
    const user = ((user) => `${user.username}#${user.discriminator}`)
    const avatar = ((user) => `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`)
    const newreq = {
      body: `{
        "content": "${rawText}",
        "username": "${user(interaction.member.user)}",
        "avatar_url": "${avatar(interaction.member.user)}"
      }`,
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    }
    console.log(`avatar: ${interaction.member.user.avatar}`)
    // send data to webhook
    await fetch(WEBHOOK_URL, newreq)
    return response({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Sent message \`${rawText}\``,
        flags: 64
      },
    });
  }
};
