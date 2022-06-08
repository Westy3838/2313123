const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");


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
let kişi = message.mentions.members.first() 
if (!kişi) return message.reply(`${ayarlar.wx} **Bir Kişi Belirtmelisin!**`)

  let parası = await db.fetch(`para_${message.author.id}`) 
  
  
  if (kişi.bot) return message.channel.send(`${ayarlar.wx} **Botlara akçe yollanamaz!**`)
    if (kişi.id === message.author.id) return message.channel.send(`${ayarlar.wx} **Kendine nasıl akçe göndereceksin acaba?**`)

let paragönderme = Number(args[1])
if(paragönderme < 0) return message.reply(`${ayarlar.wx} **0'dan Küçük Bir Sayı Belirtemezsin!**`)
if (!paragönderme) return message.channel.send(`${ayarlar.wx} **Bir Sayı Belirtmelisin!**`)
  
  ///yenı komut yerı acıyorum tamam
  if (isNaN(paragönderme)) return message.channel.send(`${ayarlar.wx} **Akçe miktarı sadece sayı olabilir!**`)
  
  if (parası < paragönderme) return message.channel.send(`${ayarlar.wx} **Kendi parandan yüksek miktar bir meblağ bağışlayamazsın!**`)

  
  db.add(`para_${kişi.id}`, paragönderme)
  db.add(`para_${message.author.id}`, - paragönderme)
let gerikalan = db.fetch(`para_${message.author.id}`) || 0
const işlem = new Discord.MessageEmbed()
.setAuthor('Westy • Akçe Bağışla',ayarlar.clientlogo)
.setTitle('Akçe Başarıyla Bağışlandı')
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781494145244069908/westy_akce.png')
.setColor(ayarlar.renk)
.setDescription(`**Güncel Akçe Durumun** • ${gerikalan}\n**${kişi.user.username}** İmparatorluğuna **${paragönderme}** kadar akçe bağışlandı. Akçenden **${paragönderme}** kadar düştü.`)
return message.channel.send(işlem)
  
};
exports.conf = {
  aliases: ['akçebağışla'],
  permLevel: 0
};
exports.help = {

  name: 'akçe-bağışla'
};
