const Discord = require('discord.js')




const qb = require('quick.db');
const ayarlar = require('../ayarlar.json');

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
let para = await qb.fetch(`para_${message.author.id}`) 
  if (!args[0])  message.channel.send(new Discord.MessageEmbed()
.setAuthor('Westy • Kışla',ayarlar.clientlogo)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781496357235327026/ksla.png')
.setColor(ayarlar.renk)
.setTitle(`» Mevcut Akçen • ${para}`)


.addFields(
{ name: ':crossed_swords: Asker', value: 'Savaş müsabakalarının **en az güç veren** birliğidir.\nSavaş Puan • 2\nHasar • 1x<birim sayısı>\n**» 100 Akçe  <:westyakce:781831733971910666>**', inline: true },
{ name: ':bow_and_arrow: Okçu', value: 'Savaş müsabakalarının **orta az güç veren** birliğidir.\nSavaş Puan • 3\nHasar • 2x<birim sayısı>\n**» 300 Akçe  <:westyakce:781831733971910666>**', inline: true },
{ name: '━━━━━━━━━━━━━━━━━━', value: '━━━━━━'},
{ name: ':horse_racing: Süvari', value: 'Savaş müsabakalarının **orta güç veren** birliğidir.\nSavaş Puan • 5\nHasar • 5x<birim sayısı>\n**» 500 Akçe  <:westyakce:781831733971910666>**', inline: true },
{ name: ':dragon_face: Ejderha',value: '**Ejderha,** Savaş müsabakalarının **en fazla güç veren** birliğidir.\nSavaş Puan • 10\nHasar • 100x<birim sayısı>\n**» 10000 Akçe  <:westyakce:781831733971910666>**', inline: true },
{ name: '━━━━━━━━━━━━━━━━━━', value: '━━━━━━' },
{ name: ':moneybag: Tüccar', value: `**Tüccar,** günlük aldığın **akçe miktarına** akçe ekler.\nYatırım için Harikadır.\n**» Savaşa dahil edilmez**\n**» ~~1000 Akçe~~ **600 Akçe**  <:westyakce:781831733971910666>**`},
{ name: '━━━━━━━━━━━━━━━━━━', value: '━━━━━━' },
{ name: ':question: Çoklu Alım Bilgi', value: `**Asker, Okçu, Süvari, Ejderha, Tüccar** alımlarında **1'den fazla** alım yapılacak olursa **${prefix}kışla <birim> <sayı>** komutuyla çoklu alım yapabilirsiniz.`},
    

	)



  )
  if (args[0] === 'asker'  ) {
    let sayı = Number(args[1]) || 1
 if (isNaN(sayı)) return message.reply(`${ayarlar.wx} **Alım Sayısı Sadece Sayı İçerebilir!**`)
if(!sayı) return message.reply(`${ayarlar.wx} **Bir Sayı Yazmalısın!**`)
if(sayı < 0) return message.reply(`${ayarlar.wx} **0'dan Küçük Bir Sayı Belirtemezsin!**`)
 let para = await qb.fetch(`para_${message.author.id}`) 
let asker = 100 
let verilenpara = sayı*asker
if(verilenpara > para) return message.channel.send(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
if (para < asker) return message.reply(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
qb.add(`asker_${message.author.id}`,sayı)
qb.add(`para_${message.author.id}`, - verilenpara)
const ap = new Discord.MessageEmbed()
.setAuthor('Westy • Kışla',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setTitle(`Alınan • Asker\nAlım Sayısı • ${sayı}`)
.setDescription(`**Akçe Durumu • ** **\`${para - verilenpara}\`**\nKışladan **${sayı} tane Asker** alındı ve **imparatorluğuna eklendi.**`)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781489554602459166/Ksla_png.png')
return message.channel.send(ap)
  }

  if (args[0] === 'okçu'  ) {
    let sayı = Number(args[1]) || 1
 if (isNaN(sayı)) return message.reply(`${ayarlar.wx} **Alım Sayısı Sadece Sayı İçerebilir!**`)
if(sayı <= 0) return message.reply(`${ayarlar.wx} **0'dan Küçük Bir Sayı Belirtemezsin!**`)
if(!sayı) return message.reply(`${ayarlar.wx} **Bir Sayı Yazmalısın!**`)
 let para = await qb.fetch(`para_${message.author.id}`)  
let okçu = 300 
let verilenpara = sayı*okçu
if(verilenpara > para) return message.channel.send(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
if (para < okçu) return message.reply(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
qb.add(`okçu_${message.author.id}`,sayı)
qb.add(`para_${message.author.id}`, - verilenpara)
const ap = new Discord.MessageEmbed()
.setAuthor('Westy • Kışla',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setTitle(`Alınan • Okçu\nAlım Sayısı • ${sayı}`)
.setDescription(`**Akçe Durumu • ** **\`${para - verilenpara}\`**\nKışladan **${sayı} tane Okçu** alındı ve **imparatorluğuna eklendi.**`)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781489554602459166/Ksla_png.png')
return message.channel.send(ap)
  }


  if (args[0] === 'süvari') {
    let sayı = Number(args[1]) || 1
 if (isNaN(sayı)) return message.reply(`${ayarlar.wx} **Alım Sayısı Sadece Sayı İçerebilir!**`)
if(sayı <= 0) return message.reply(`${ayarlar.wx} **0'dan Küçük Bir Sayı Belirtemezsin!**`)
if(!sayı) return message.reply(`${ayarlar.wx} **Bir Sayı Yazmalısın!**`)
 let para = await qb.fetch(`para_${message.author.id}`) 
let süvari = 500 
let verilenpara = sayı*süvari
if(verilenpara > para) return message.channel.send(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
if (para < süvari) return message.reply(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
qb.add(`süvari_${message.author.id}`,sayı)
qb.add(`para_${message.author.id}`, - verilenpara)
    const ap = new Discord.MessageEmbed()
.setAuthor('Westy • Kışla',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setTitle(`Alınan • Süvari\nAlım Sayısı • ${sayı}`)
.setDescription(`**Akçe Durumu • ** **\`${para - verilenpara}\`**\nKışladan **${sayı} tane Süvari** alındı ve **imparatorluğuna eklendi.**`)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781496357235327026/ksla.png')
return message.channel.send(ap)
    }


  if (args[0] === 'tüccar') {
    let sayı = Number(args[1]) || 1
 if (isNaN(sayı)) return message.reply(`${ayarlar.wx} **Alım Sayısı Sadece Sayı İçerebilir!**`)
if(sayı <= 0) return message.reply(`${ayarlar.wx} **0'dan Küçük Bir Sayı Belirtemezsin!**`)
if(!sayı) return message.reply(`${ayarlar.wx} **Bir Sayı Yazmalısın!**`)

 let tüccars = await qb.fetch(`tüccar_${message.author.id}`) 
if (tüccars >= 50) return message.reply(`${ayarlar.wx} **Tüccarların 50'den Fazla Veya Alacağın Tüccar Sayısı 50 Üstünü Geçiyor!**`)
if(tüccars + sayı > 50) return message.reply(`${ayarlar.wx} **Tüccarların 50'den Fazla Veya Alacağın Tüccar Sayısı 50 Üstünü Geçiyor!**`)

 let para = await qb.fetch(`para_${message.author.id}`) 
let tüccar = 600

let verilenpara = sayı*tüccar
if(verilenpara > para) return message.channel.send(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
if (para < tüccar) return message.reply(`${ayarlar.wx} **Yeterli Akçen Yok!**`)

qb.add(`tüccar_${message.author.id}`,sayı)
qb.add(`para_${message.author.id}`, - verilenpara)
const ap = new Discord.MessageEmbed()
.setAuthor('Westy • Kışla',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setTitle(`Alınan • Tüccar\nAlım Sayısı • ${sayı}`)
.setDescription(`**Akçe Durumu • ** **\`${para - verilenpara}\`**\nKışladan **${sayı} tane Tüccar** alındı ve **imparatorluğuna eklendi.**\n\n**Bilgi •** Tüccarlar, günlük sandıktan **+55**, günlük-vote sandığından **+30** akçe verirler. Ne kadar tüccarınız varsa o kadar tüccar sayısıyla çarpılır.`)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781496357235327026/ksla.png')
return message.channel.send(ap)
  }
  

  if (args[0] === 'ejderha') {
  let sayı = Number(args[1]) || 1
 if (isNaN(sayı)) return message.reply(`${ayarlar.wx} **Alım Sayısı Sadece Sayı İçerebilir!**`)
if(sayı <= 0) return message.reply(`${ayarlar.wx} **0'dan Küçük Bir Sayı Belirtemezsin!**`)
if(!sayı) return message.reply(`${ayarlar.wx} **Bir Sayı Yazmalısın!**`)
  let para = await qb.fetch(`para_${message.author.id}`) 
let ejderha = 10000
let verilenpara = sayı*ejderha
if(verilenpara > para) return message.channel.send(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
if (para < ejderha) return message.reply(`${ayarlar.wx} **Yeterli Akçen Yok!**`)
qb.add(`ejderha_${message.author.id}`,sayı)
qb.add(`para_${message.author.id}`, - verilenpara)
const ap = new Discord.MessageEmbed()
.setAuthor('Westy • Kışla',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setTitle(`Alınan • Ejderha\nAlım Sayısı • ${sayı}`)
.setDescription(`**Akçe Durumu • ** **\`${para - verilenpara}\`**\nKışladan **${sayı} tane Ejderha** alındı ve **imparatorluğuna eklendi.**`)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781496357235327026/ksla.png')
return message.channel.send(ap)
  }


  
}
exports.conf = {
  
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'kışla'
}