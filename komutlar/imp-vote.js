
const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json');

const qb = require('quick.db')
const ms = require('parse-ms')
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
  
    let prefix = await qb.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
 
  const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
const vote = Math.floor(Math.random() * 100) + 3000  
let espri = vote
  let yavaşmod = 36000000, // 10 Saat

        amount = Math.floor(Math.random() * 1000) + 4000;      


    let lastDaily =  qb.fetch(`günlükvote_${message.author.id}`);

    if (lastDaily !== null && yavaşmod - (Date.now() - lastDaily) > 0) {

        let timeObj = ms(yavaşmod - (Date.now() - lastDaily))

const saat = new Discord.MessageEmbed()
.setAuthor('Westy • Günlük Akçe',ayarlar.clientlogo)
.setTitle('Akçe Toplama Zamanın Gelmemiş')
.setThumbnail('https://cdn.discordapp.com/attachments/781123411204112387/781150874764443648/231b.png')
.setColor(ayarlar.renk)
.setDescription(`**${timeObj.hours} Saat ${timeObj.minutes} Dakika ${timeObj.seconds} Saniye** Sonra Alabilirsin`)
return message.channel.send(saat)

      

    } else {
let tüccar = qb.fetch(`tüccar_${message.author.id}`) 
const tparasi = 30*tüccar

qb.add(`para_${message.author.id}`, espri)
qb.add(`para_${message.author.id}`, tparasi)
    let paraq = qb.has(`para_${message.author.id}`) ? qb.fetch(`para_${message.author.id}`) : '0'
message.channel.send(new Discord.MessageEmbed().setAuthor('Westy • Günlük Vote',ayarlar.clientlogo).setColor(ayarlar.renk).setImage('https://cdn.discordapp.com/attachments/781270847796412426/782713640628518982/20c0271883ddbbeda8aaa106b9c57066.gif').setTitle('Verilecek Akçe Hesaplanıyor')).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(
new Discord.MessageEmbed()
.setAuthor('Westy • Günlük Vote',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781494145244069908/westy_akce.png')
.setTitle(`${espri + tparasi} Akçe Topladın!`)
.addField('Akçe Durum',`Toplam Akçen **${espri} + ${tparasi}** Artarak **${paraq}** Oldu`)
.setFooter('+ Olarak eklenen miktar yatırım yapılan tüccar sayısına göre verilen paradır.'))},1500))

}
       qb.set(`günlükvote_${message.author.id}`, Date.now());

    } else {
const yar = new Discord.MessageEmbed()
.setAuthor('Westy • Günlük Vote',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781494145244069908/westy_akce.png')
.setTitle(`Bu Komutu Kullanman İçin Vote Atman Gerek (${prefix}vote)`)

message.channel.send(yar)
}
})
  }



exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'günlük-vote'
};

