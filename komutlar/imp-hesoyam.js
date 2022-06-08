
const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json');


const db = new require("quick.db");


const ms = require('ms')

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
    if(message.author.id !== '473070737851285515') return message.reply(`${ayarlar.wx} **Bu Komut Yapımcıya Özeldir!**`) 


  


 db.add(`para_${message.author.id}`, 100000)
    let paraq = db.has(`para_${message.author.id}`) ? db.fetch(`para_${message.author.id}`) : '0'
const para = new Discord.MessageEmbed()
.setAuthor('Westy • Günlük Akçe',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/781123411204112387/781145197064224798/akce.png')
.setTitle(`1000000 Akçe Topladın!`)
.addField('Akçe Durum',`Toplam Akçen **10000** Artarak **${paraq}** Oldu`);
message.channel.send(para)

}
    

 




exports.conf = {
  aliases: ['baguvix'],
  permLevel: 0
};

exports.help = {
  name: 'hesoyam'
};

