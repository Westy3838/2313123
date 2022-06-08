const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
let botid = ('636202587648950303')
const db = require('quick.db')
exports.run = async (client, message, args) => {
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
      var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") {

const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    
    .setURL('https://top.gg/bot/636202587648950303/vote')
    
    .setTitle('**Click To Vote The Bot**')
    .setAuthor('Westy • Vote', ayarlar.clientlogo)
    .setThumbnail(ayarlar.clientlogo)
    message.channel.send(embed);

}
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
   
    if (ekontrol == "en") return;
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    
    .setURL('https://top.gg/bot/636202587648950303/vote')
    
    .setTitle('**Botu Oylamak İçin Tıkla**')
    .setAuthor('Westy • Vote', ayarlar.clientlogo)
    .setThumbnail(ayarlar.clientlogo)
    message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'vote',
  description: '',
  usage: 'vote'
};