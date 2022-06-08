const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
exports.run = (bot, message, params) => {
let bilgi = message.guild.createdAt.toLocaleString()
.replace('PM',`(Öğleden Sonra)`)
.replace('AM',`(Öğleden Önce)`)


let güvenlik = message.guild.verificationLevel
.replace('LOW','Düşük')
.replace('MEDIUM','Orta')
.replace('VERY_HIGH','Çok Yüksek')
.replace('HIGH','Yüksek')

  if(message.guild.roles.cache.map(r => r).join(' • ').length > 4096) {
const embed = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
   .setThumbnail(message.guild.iconURL({dynamic: true}))

   .addField(':id: Sunucu ID', message.guild.id)
   .addField(':busts_in_silhouette: Toplam Üye', `${message.guild.memberCount} Üye`)
   .addField(':police_officer: Doğrulama Seviyesi', güvenlik) 
   .addField(':date: Oluşturulma Tarihi', bilgi)  

message.channel.send(embed) 

const embed2 = new Discord.MessageEmbed()
  .setTitle(':pencil: Roller')
  .setColor(ayarlar.renk)
  .setDescription('Rollerin Kapladığı Toplam Karakter Sayısı 4096\'ü Geçiyor')
 return message.channel.send(embed2)                                                              
 }
  
   const embed = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
   .setThumbnail(message.guild.iconURL({dynamic: true}))

   .addField(':id: Sunucu ID', message.guild.id)

   .addField(':busts_in_silhouette: Toplam Üye', `${message.guild.memberCount} Üye`)
   .addField(':police_officer: Doğrulama Seviyesi', güvenlik) 
   .addField(':date: Oluşturulma Tarihi', bilgi) 
   
 
   message.channel.send(embed)
  const embed2 = new Discord.MessageEmbed()
  .setTitle(':pencil: Roller')
  .setColor(ayarlar.renk)
  .setDescription(message.guild.roles.cache.map(r => r).join(' • '))
 message.channel.send(embed2)
 };

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['sbilgi','sb'],
   permLevel: 0
 };

 exports.help = {
   name: 'sunucubilgi',
   description: 'Kullanılan Yerdeki Sunucu Bilgilerini Gösterir.',
   usage: 'sunucubilgi'
 };


