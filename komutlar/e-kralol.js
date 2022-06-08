const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
 const DModule = require('@top-gg/sdk');
exports.run = async (bot, message, args, client, params) => {
  const perms  = [
    "SEND_MESSAGES"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme"
  };
  
  const notHavedPerms = perms.filter(perm => !message.channel.permissionsFor(message.guild.me).has(perm))
  
  if (notHavedPerms.length) {  
  const yetkimesaj = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setAuthor('Westy • Yetki İzni',ayarlar.clientlogo)
  .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
  .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
  .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
  return message.author.send(yetkimesaj)
     .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
  }
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

 const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
  var gem = ['Kralımız Çok Yaşa!','K-Kralım Ne Buyurursunuz?','Mrtolun Tez Kellesi Alına','Kralım Tacınıza Göz Dikmişler!','Kralımıza Tapın!']
     var gem = gem[Math.floor(Math.random(1) * gem.length)]
      const kral = new Discord.MessageEmbed()
    .setAuthor('Westy • Kral Ol',ayarlar.clientlogo)
.setTitle(`${message.author.username}, ${gem}`)
    .setColor(ayarlar.renk)
  
    
        .setImage(`https://cdn.discordapp.com/attachments/711338188861603940/773251618173878303/tenor.gif`)
    return message.channel.send(kral);
    }
              } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'kralol',
  description: 'kralol',
  usage: 'kralol'
};
