module.exports = async (event, context) => {
  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

  const userID = `${context.params.event.author.id}`;

  const username = `${context.params.event.author.username}`;

  const BANNED_WORDS = ['furry', 'uyu', ':3', 'úwú', 'ówó', 'ÜwÜ', 'ÛwÛ', `uwu`, `owo`, 'uvu', 'uw  u', 'u w u', 'u  wu', 'ow  o', 'o w o', 'Ū', 'uv  u', 'u v u', 'u  vu', 'wuw', 'wu  w', 'w u w', 'ŪwŪ', 'ówó', 'uwwu', 'uw wu', 'u__w__u'];
  const BANNED_WORDS2 = ['u wu', 'uw u', 'o wo', 'ow o', 'uv u', 'u vu', 'ŪwŪ', '(uwu)', '(owo)', '(uvu)'];
  const regEx = new RegExp(BANNED_WORDS.join('|'), 'gi');
  const regEx2 = new RegExp(BANNED_WORDS2.join('|'), 'gi');


  let messageContent = event.content;

  if (messageContent.match(regEx || regEx2)) {
    await lib.discord.channels['@0.0.3'].messages.destroy({
      message_id: event.id,
      channel_id: event.channel_id,
    }),
      await lib.discord.users['@0.0.3'].dms.create({
        recipient_id: `${context.params.event.author.id}`,
        content: `Un-uwu-ify\n
        Filtered message: \`${messageContent}\``, //Message you want users to see when bot DMs them
      });

    await lib.discord.channels['@0.0.3'].messages.create({
      channel_id: ``, // Log channel of your server where you'll be notified when someone swears'
      content: '', // Message header
      tts: false,
      embed: {
        type: 'rich',
        author: {
          name: `${username}`,
          icon_url: '', //author user icon link
        },
        title: '', // Embed title
        description: `no.`, // This is changeable
        fields: [
          {
            name: 'User',
            value: `<@!${userID}> | \`${userID}\``,
          },
          {
            name: 'Filtered Message',
            value: `*${messageContent}*`,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: '',
        },
      },
    });
  }
};
