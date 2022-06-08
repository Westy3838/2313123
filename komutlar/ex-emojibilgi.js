const Discord = require('discord.js');
const a = require('../ayarlar.json')
exports.run = (client, message, args) => {
    const perms  = [
        "SEND_MESSAGES"
      ];
      
      const names = {
        SEND_MESSAGES: "• Mesaj Gönderme"
      };
      
      const notHavedPerms = perms.filter(perm => !message.channel.permissionsFor(message.guild.me).has(perm))
      
      if (notHavedPerms.length) {  
      const yetkimesaj = new Discord.MessageEmbed()
      .setColor(a.renk)
      .setAuthor('Westy • Yetki İzni',ayarlar.clientlogo)
      .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
      .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
      .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
      return message.author.send(yetkimesaj)
         .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
      }
      if(!message.guild.me.permissions.has('MANAGE_EMOJIS')) return message.channel.send('Emojileri yönet iznimin olması gerekiyor.')
 let emojiname = args[0];
 if(!emojiname) return message.channel.send(`${a.wx} **Bir Emoji İsmi Belirtmelisin!**`)
 const emoji = (message.guild.emojis.cache.find(x => x.name === emojiname))
    if (!emoji) return message.channel.send(`${a.wx} **Bir Emoji İsmi Belirtmelisin!**`)



    const embed = new Discord.MessageEmbed()
    .setAuthor('Westy • Emoji Bilgi',a.clientlogo)
    .setColor(a.renk)
    .setThumbnail(`${emoji.url}`)
    .addField(":pencil: **•** Emoji Adı", `${emojiname}`)
    .addField(":id: **•** Emoji ID", `${emoji.id}`)
    .addField(":infinity: **•** Link", `${emoji.url}`)
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojiinfo'],
    permLevel: 0
}
exports.help = {
    name: 'emojibilgi',
    description: 'İsmini yazdığınız emoji hakkında bilgi verir',
    usage: 'emojibilgi'
}