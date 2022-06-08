const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
 const DModule = require('@top-gg/sdk');
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
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

 const dbl = new DModule.Api(ayarlar.dbltoken) 
  var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    if (ekontrol == "en") {
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
      const random = Math.floor(Math.random() * 100) + 1
      
        const enembed = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setAuthor(`Anxiety Rate %${random}`)
      .setDescription('**Dude, Who upset you like that. :smoking: :wine_glass:**')
      .setThumbnail('https://cdn.discordapp.com/attachments/637566911558713356/637956703362482176/giphy.gif')
      message.channel.send(enembed)
      } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`You Must Vote To Use This Command (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
    }
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") return;
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
  const random = Math.floor(Math.random() * 100) + 1
const trembed = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setAuthor(`Efkarlık Oranınız %${random}`)
      .setDescription('**Aga Be Kim Üzdü Seni Böyle :smoking: :wine_glass:**')
      .setThumbnail('https://cdn.discordapp.com/attachments/637566911558713356/637956703362482176/giphy.gif')
      message.channel.send(trembed)
      } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
          }
  })
   } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['anxiety','anksiyete','anxiety-meter','efkar-ölçer'],
 permLevel: 0
}
exports.help = {
 name: 'efkarölçer',
 description: 'Efkar',
 usage: 'efkarölçer'
};
