const Discord = require('discord.js');
const client = new Discord.Client();
const a = require('../ayarlar.json');
const db = require('quick.db');
exports.run = async (bot, message, args, client) => {
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
  .setAuthor('Westy • Yetki İzni',a.clientlogo)
  .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
  .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
  .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
  return message.author.send(yetkimesaj)
     .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
  }
      var ekontrol = await db.fetch(`dil_${message.guild.id}`)   

    if (ekontrol == "en") {


 const invitelink = new Discord.MessageEmbed()
    .setColor(a.renk)
    
    .setAuthor(`Westy • Invite`,a.clientlogo)
    .setTitle('**Click To Access The Invitation Link**')
   .setThumbnail(a.clientlogo)
    .setURL(`https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8`)
message.channel.send(invitelink)
}
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") return;
const invitelink = new Discord.MessageEmbed()
    .setColor(a.renk)
    
    .setAuthor(`Westy • Davet`,a.clientlogo)
    .setTitle('**Davet Linkine Ulaşmak İçin Tıkla**')
   .setThumbnail(a.clientlogo)
    .setURL(`https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8`)
message.channel.send(invitelink)
};  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['invitelink', 'invite-link', 'davetlink', 'davetkod', 'davetkodu', 'davetlinki', 'davet-kod', 'davet-link', 'davet-kodu', 'davet-linki', 'davet','invite'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: '0',
  usage: 'davet'
 };