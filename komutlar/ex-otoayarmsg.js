
const Discord = require('discord.js')
const a = require('../ayarlar.json')
const db = require('quick.db')
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
  .setColor(a.renk)
  .setAuthor('Westy • Yetki İzni',a.clientlogo)
  .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
  .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
  .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
  return message.author.send(yetkimesaj)
     .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
  }
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || a.prefix;
  let yazıİçeriği = args.slice().join(' ')

  const Mesaj = new Discord.MessageEmbed()
    .setColor(a.renk)
  

    .setAuthor('Westy • Oto Ayarlamalı Cevaplar',a.clientlogo)
  .setDescription(`**Klasik Ayar Cevapları (${prefix}klasik-cevaplar aç)**\nSelamun Aleyküm\nsea\nnaber\nHoşbulduk\niyi geceler\nGünaydın\nNasılsınız\niyiyim\nkötüyüm\n**Fun Ayar Cevapları (${prefix}fun-cevaplar aç)**\nwesty saldır\nwesty\nyazık\nçok ayıp\nban ban ban\ninteresting\nbarış ab\nsilivri soğuktur\n**Troll Ayar Cevapları (${prefix}troll-cevaplar aç) Zümrüt Üyelere Özeldir**\nsen kimsin ya\nalçak puşt\nkahkaha tufanı\noldu mu knk\nharam bro\nama bu sahtekarlık\nöyle istemişim öyle olmuş\ngo brrr\noneminute,bir dakika\nbot kendine gelsin, bekle kendine gelsin`)



   
   
    .setTimestamp()
  message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['otoayarlamalıcevaplar','otoayarlımesajlar','otoayarlamalımesajlar'],
  permLevel: 0,
}

exports.help = {
  name: 'otoayarlıcevaplar'
}