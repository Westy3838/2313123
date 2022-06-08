  

const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ms = require('parse-ms')
const db = require('quick.db')

exports.run = async (client, message, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
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

if(!args[0]) {
const baslangic = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Sistemi`, ayarlar.clientlogo)
.setThumbnail(`https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png`)
.setTitle(`Maden Sistemine Hoş Geldin, Ne Yapmak İstersin?`)
.setDescription(`
:white_small_square: ${prefix}maden **aç**
:white_small_square: ${prefix}maden **yükselt**
:white_small_square: ${prefix}maden **topla** 
:white_small_square: ${prefix}maden **bilgi**
:white_small_square: ${prefix}maden **oranlar**

`)
.setFooter(`• Maden açma maliyeti 5000
• Yükseltme Maliyetleri sv2, 15000 | sv3, 25000, | sv4, 55000`)
return message.channel.send(baslangic)}

if (args[0] === 'aç') {
  
let kisipara = db.fetch(`para_${message.author.id}`) || 0
let toplammaden = db.fetch(`maden_${message.author.id}`) || 0

if(toplammaden >= 1)
return message.channel.send(`${ayarlar.wx} **Zaten Madenin Var!**\n*En fazla 1 maden açabilirsin.*`)
if(kisipara < 5000) 
return message.channel.send(`${ayarlar.wx} **Maden Açabilmek için 5.000 Akçeye Sahip Olman Gerekiyor!**\n*Akçen • **${kisipara}***`)
 if(kisipara >= 5000)
setTimeout(() => {db.add(`maden_${message.author.id}`, 1)},1000)
setTimeout(() => {db.add(`para_${message.author.id}`, - 5000)},1200)
const madenac = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Sistemi`, ayarlar.clientlogo)
.setThumbnail(`https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png`)
.setTitle(`Madenin Oluşturuldu!`)
.addField(`5000 Akçen Alındı, Mevcut Akçen • ${kisipara - 5000}`,
`» Madenler, 3 saatte 1 defa olmak üzere onu toplamana izin verir, maden toplamak için • **${prefix}maden topla**\n» Madenin hakkında bilgi almak için • **${prefix}maden bilgi**
`)
.setFooter(`Süreyi kısaltmak, stoku arttırmak gibi ekstra özellikler için madenini yükselt! ${prefix}maden yükselt`)
return message.channel.send(madenac)



}

  if (args[0] === 'yükselt') {
let maden = db.fetch(`maden_${message.author.id}`) || 0
let akçe = db.fetch(`para_${message.author.id}`)
if(maden === 0) return message.channel.send('Olmayan bir madeni yükseltemezsin')
if(maden === 1) {
if(akçe < 15000) {
return message.channel.send(`
${ayarlar.wx} **Yükseltmek için 15000 Akçeye İhtiyacın Var!**`)
}
if(akçe >= 15000) {
setTimeout(() => { db.add(`maden_${message.author.id}`, 1)},1000)
  setTimeout(() => { db.add(`para_${message.author.id}`, - 15000)},1100)
const yukseltmemesajı = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Yükseltme`, ayarlar.clientlogo)
.setTitle(`» Yeni Maden Seviyesi • 2`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/946720165498875914/madenyukseltme.png')
.setDescription(`**${message.author.username}, Madenin Yükseltildi!**`)
.addField(`• Yeni Maden Özellikleri`,
`
:white_small_square: Maden Toplama Süresi • **~~3 Saat~~** » **2 Saat 30 Dakika**
:white_small_square: Maden Toplama Sayısı • **~~5~~** » **6**
:white_small_square: Maden Stok • **~~7~~** » **17**
`)
return message.channel.send(yukseltmemesajı)
}
}

if(maden === 2) {
if(akçe < 25000) {
return message.channel.send(`
${ayarlar.wx} **Yükseltmek için 25000 Akçeye İhtiyacın Var!**`)
}
if(akçe >= 25000) {
setTimeout(() => { db.add(`maden_${message.author.id}`, 1)},1000)
  setTimeout(() => { db.add(`para_${message.author.id}`, - 25000)},1100)
const yukseltmemesajı = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Yükseltme`, ayarlar.clientlogo)
.setTitle(`» Yeni Maden Seviyesi • 3`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/946720165498875914/madenyukseltme.png')
.setDescription(`**${message.author.username}, Madenin Yükseltildi!**`)
.addField(`• Yeni Maden Özellikleri`,
`
:white_small_square: Maden Toplama Süresi • **~~2 Saat 30 Dakika~~** » **1 Saat 50 Dakika**
:white_small_square: Maden Stok • **~~17~~** » **32**

`)
return message.channel.send(yukseltmemesajı)
}
}

if(maden === 3) {

if(akçe < 55000) {
return message.channel.send(`
${ayarlar.wx} **Yükseltmek için 55000 Akçeye İhtiyacın Var!**`)
}
if(akçe >= 55000) {
setTimeout(() => { db.add(`maden_${message.author.id}`, 1)},1000)
  setTimeout(() => { db.add(`para_${message.author.id}`, - 55000)},1100)
const yukseltmemesajı = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Yükseltme`, ayarlar.clientlogo)
.setTitle(`» Yeni Maden Seviyesi • 4`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/946720165498875914/madenyukseltme.png')
.setDescription(`**${message.author.username}, Madenin Yükseltildi!**`)
.addField(`• Yeni Maden Özellikleri`,
`
:white_small_square: Maden Toplama Süresi • **~~1 Saat 50 Dakika~~** » **1 Saat 15 Dakika**
:white_small_square: Maden Toplama Sayısı • **~~6~~** » **7**
:white_small_square: Maden Stok • **~~32~~** » **56**
`)
return message.channel.send(yukseltmemesajı)
}
}
if(maden === 4){

  const yukseltmemesajı = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Yükseltme`, ayarlar.clientlogo)
.setTitle(`» Maksimum Yükseltme Sınırı 4`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/946720165498875914/madenyukseltme.png')
.setDescription(`**${message.author.username}, Daha fazla yükseltme yapamazsın!**`)
.addField(`• Yeni Maden Özellikleri`,
`
:white_small_square: Ölüler mezardan kalkıp çay içecek.
:white_small_square: Leylekler kargo taşımacılığı yapacak.
:white_small_square: Güneş sabah batıdan doğacak.
`)
return message.channel.send(yukseltmemesajı)
}
  }

if (args[0] === 'oranlar') {
const sansoranlari = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Çıkarma Olasılıkları`, ayarlar.clientlogo)
.setTitle(`» Madenler ve Çıkarma Olasılıkları`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setDescription(`Maden oranları, güncelleme yamaları arasında farklılık gösterebilir.
Güncellemelerden haberdar olup, en hızlı sen yararlanmak istiyorsan; destek sunucusuna katıl!`)
.addField(`• Madenler`,
`
:white_small_square: **Gümüş** (%50)
:white_small_square: **Altın** (%20)
:white_small_square: **Yakut** (%16)
:white_small_square: **Kuvars** (%6)
:white_small_square: **Ametist** (%4)
:white_small_square: **Mavi Safir** (%3)
:white_small_square: **Westy Safiri** (%1)
`)
.setFooter('• Tüm madenlerden tek seferde 1gr çıkarabilir ve stok sayısına göre depolayabilir')
.addField('» Güncellemelerden haberdar olmak için',`[Buraya Tıkla](https://discord.gg/QtSzCvmn7t)`)
message.channel.send(sansoranlari)
}

if (args[0] === 'bilgi') {


let mstok = db.fetch(`madenstok_${message.author.id}`) || 0
let gümüş = db.fetch(`madengümüş_${message.author.id}`) || 0
let altın = db.fetch(`madenaltın_${message.author.id}`) || 0
let yakut = db.fetch(`madenyakut_${message.author.id}`) || 0
let kuvars = db.fetch(`madenkuvars_${message.author.id}`) || 0
let ametist =db.fetch(`madenametist_${message.author.id}`) || 0
let msafir = db.fetch(`madenmsafir_${message.author.id}`) || 0
let wsafir = db.fetch(`madenwsafir_${message.author.id}`) || 0
var madensayı = db.fetch(`maden_${message.author.id}`) || 0


const madenbilgi = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setThumbnail(message.author.avatarURL({dynamic: true}))
.setAuthor(`Westy • Maden Bilgi`, ayarlar.clientlogo)
.setDescription(`
:white_small_square: Gümüş • **${gümüş}**
:white_small_square: Altın • **${altın}**
:white_small_square: Yakut • **${yakut}**
:white_small_square: Kuvars • **${kuvars}**
:white_small_square: Ametist • **${ametist}**
:white_small_square: Mavi Safir • **${msafir}**
:white_small_square: Westy Safiri • **${wsafir}**

» Madenlerini pazarda alıcıların vadettiği
takaslarla ticaret yapabilirsin. | **${prefix}pazar**`)
.setFooter(`${message.author.username}, Maden Bilgisini Sorguladı`,message.author.avatarURL({dynamic: true}))
if(madensayı === 1) {
let parapara = await db.fetch(`para_${message.author.id}`) || 0
  const seviye1bilgi = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Sistemi`, ayarlar.clientlogo)
.setTitle(`Maden Seviyesi • ${madensayı}`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.addField(`» Maden Bilgileri`,
`
:white_small_square: İmparator • **${message.author.username}**
:white_small_square: Mevcut Akçen • **${parapara}**
:white_small_square: Maksimum Stok • **7**
:white_small_square: Maden Doluluk Oranı • **${mstok}/7**
`)
message.channel.send(seviye1bilgi)
message.channel.send(madenbilgi)
}
if(madensayı === 2) {
let parapara = await db.fetch(`para_${message.author.id}`) || 0
  const seviye1bilgi = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Sistemi`, ayarlar.clientlogo)
.setTitle(`Maden Seviyesi • ${madensayı}`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.addField(`» Maden Bilgileri`,
`
:white_small_square: İmparator • **${message.author.username}**
:white_small_square: Mevcut Akçen • **${parapara}**
:white_small_square: Maksimum Stok • **17  **
:white_small_square: Maden Doluluk Oranı • **${mstok}/17**
`)
message.channel.send(seviye1bilgi)
message.channel.send(madenbilgi)
}
if(madensayı === 3) {
let parapara = await db.fetch(`para_${message.author.id}`) || 0
  const seviye1bilgi = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Sistemi`, ayarlar.clientlogo)
.setTitle(`Maden Seviyesi • ${madensayı}`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.addField(`» Maden Bilgileri`,
`
:white_small_square: İmparator • **${message.author.username}**
:white_small_square: Mevcut Akçen • **${parapara}**
:white_small_square: Maksimum Stok • **32**
:white_small_square: Maden Doluluk Oranı • **${mstok}/32**
`)
message.channel.send(seviye1bilgi)
message.channel.send(madenbilgi)
}
if(madensayı === 4) {
let parapara = await db.fetch(`para_${message.author.id}`) || 0
  const seviye1bilgi = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor(`Westy • Maden Sistemi`, ayarlar.clientlogo)
.setTitle(`Maden Seviyesi • ${madensayı}`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.addField(`» Maden Bilgileri`,
`
:white_small_square: İmparator • **${message.author.username}**
:white_small_square: Mevcut Akçen • **${parapara}**
:white_small_square: Maksimum Stok • **56**
:white_small_square: Maden Doluluk Oranı • **${mstok}/56**
`)
message.channel.send(seviye1bilgi)
message.channel.send(madenbilgi)
}
  }




if (args[0] === 'topla') {

let madenivarmı = db.fetch(`maden_${message.author.id}`) || 0

if(madenivarmı === 0){
return message.channel.send(`${ayarlar.wx} **Madenin Yok!**`)}

let belirteç;

  let madenseviyesi = db.fetch(`maden_${message.author.id}`)
if(madenseviyesi === 1) {
belirteç=+10800000
} else if (madenseviyesi === 2) {
belirteç=+9000000
} else if (madenseviyesi === 3) {
belirteç=+6600000
} else if (madenseviyesi === 4) {
belirteç=+4500000
}
  let yavaşmod = belirteç

    let alımkontrol = await db.fetch(`madensınır_${message.author.id}`);
    if (alımkontrol !== null && yavaşmod - (Date.now() - alımkontrol) > 0) {

        let timeObj = ms(yavaşmod - (Date.now()  - alımkontrol))
const saat = new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setTitle(`Maden Toplama Zamanın Gelmemiş`)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setColor(ayarlar.renk)
.setDescription(`**${timeObj.hours} Saat ${timeObj.minutes} Dakika ${timeObj.seconds} Saniye** Sonra Çıkarabilirsin`)  
.setFooter(`Maden toplama süresini düşürmek için madenini yükselt!`)
return message.channel.send(saat)

      

    } else {
let tüccar = await db.fetch(`tüccar_${message.author.id}`);


var madensayı = db.fetch(`maden_${message.author.id}`)

let gümüş = 0
let altın = 0
let yakut = 0
let kuvars = 0
let ametist = 0
let mavisafir = 0
let westysafiri = 0

let gümüş2 = 0
let altın2 = 0
let yakut2 = 0
let kuvars2 = 0
let ametist2 = 0
let mavisafir2 = 0
let westysafiri2 = 0

let gümüş3 = 0
let altın3 = 0
let yakut3 = 0
let kuvars3 = 0
let ametist3 = 0
let mavisafir3 = 0
let westysafiri3 = 0

let gümüş4 = 0
let altın4 = 0
let yakut4 = 0
let kuvars4 = 0
let ametist4 = 0
let mavisafir4 = 0
let westysafiri4 = 0

let gümüş5 = 0
let altın5 = 0
let yakut5 = 0
let kuvars5 = 0
let ametist5 = 0
let mavisafir5 = 0
let westysafiri5 = 0

let gümüş6 = 0
let altın6 = 0
let yakut6 = 0
let kuvars6 = 0
let ametist6 = 0
let mavisafir6 = 0
let westysafiri6 = 0

let gümüş7 = 0
let altın7 = 0
let yakut7 = 0
let kuvars7 = 0
let ametist7 = 0
let mavisafir7 = 0
let westysafiri7 = 0
//STOK DOLU EMBED


if(madensayı === 4){
let stokuyarı4 = 0 
 /// MADEN STOK MAX  == 56
  let mstok = db.fetch(`madenstok_${message.author.id}`) || 0

if(mstok === 56) {
const stok4 = new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`Stokun dolu, mevcut madenlerini harca ya da maden seviyeni yükselt!
📦 STOK(dolu)  -  56/**56**`)
.addField(`» Maden Seviyesi • 4`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Toplayamadı`,message.author.avatarURL({dynamic: true}))
return message.channel.send(stok4)

}
let sans1 = Math.ceil(Math.random()*103);
let sans2 = Math.ceil(Math.random()*103);
let sans3 = Math.ceil(Math.random()*103);
let sans4 = Math.ceil(Math.random()*103);
let sans5 = Math.ceil(Math.random()*103);
let sans6 = Math.ceil(Math.random()*103);
let sans7 = Math.ceil(Math.random()*103);
if(mstok < 56) {

//westysafiri
if(sans1 == 1) { 
westysafiri=+1
db.add(`madenstok_${message.author.id}`, 1)}

//mavisafir
else if(sans1 > 1 && sans1 <= 4) { 
mavisafir=+1
}

//ametist
else if(sans1 > 4 && sans1 <= 8) { 
ametist=+1
}

//kuvars
else if(sans1 > 8 && sans1 <= 14) { 
kuvars=+1
}

//yakut
else if(sans1 > 14 && sans1 <= 31) { 
yakut=+1
}

//altın
else if(sans1 > 31 && sans1 <= 52) { 
altın=+1
}

//gümüş
else if(sans1 > 52 && sans1 <= 102) { 
gümüş=+1
}
let toplam = gümüş + yakut + altın + ametist + kuvars + mavisafir + westysafiri

  db.add(`madenstok_${message.author.id}`, toplam)
}
  
let mstok1 = db.fetch(`madenstok_${message.author.id}`)


/// ŞANS 2
//westysafiri 
if(mstok1 === 56) {
stokuyarı4=+1
}
if(mstok1 < 56 && stokuyarı4 === 0) {
//westysafiri
if(sans2 == 1) { 
westysafiri2=+1
}

//mavisafir
else if(sans2 > 1 && sans2 <= 4) { 
mavisafir2=+1
}

//ametist
else if(sans2 > 4 && sans2 <= 8) { 
ametist2=+1
}

//kuvars
else if(sans2 > 8 && sans2 <= 14) { 
kuvars2=+1
}
//yakut

else if(sans2 > 14 && sans2 <= 31) { 
yakut2=+1
}

//altın
else if(sans2 > 31 && sans2 <= 52) { 
altın2=+1
}

//gümüş
else if(sans2 > 52 && sans2 <= 103) { 
gümüş2=+1
}
let toplam2 = gümüş2 + yakut2 + altın2 + ametist2 + kuvars2 + mavisafir2 + westysafiri2

  db.add(`madenstok_${message.author.id}`, toplam2)
}
  let mstok2 = db.fetch(`madenstok_${message.author.id}`)

//ŞANS3
//westysafiri 
if(mstok2 === 56) {
stokuyarı4=+1
}
if(mstok2 < 56 && stokuyarı4 === 0) {

//westysafiri
if(sans3 == 1) { 
westysafiri3=+1
}

//mavisafir
else if(sans3 > 1 && sans3 <= 4) { 
mavisafir3=+1
}

//ametist
else if(sans3 > 4 && sans3 <= 8) { 
ametist3=+1
}

//kuvars
else if(sans3 > 8 && sans3 <= 14) { 
kuvars3=+1
}

//yakut
else if(sans3 > 14 && sans3 <= 31) { 
yakut3=+1
}

//altın
else if(sans3 > 31 && sans3 <= 52) { 
altın3=+1
}

//gümüş
else if(sans3 > 52 && sans3 <= 103) { 
gümüş3=+1
}

let toplam3 = gümüş3 + yakut3 + altın3 + ametist3 + kuvars3 + mavisafir3 + westysafiri3

  db.add(`madenstok_${message.author.id}`, toplam3)
}
  let mstok3 = db.fetch(`madenstok_${message.author.id}`)

//ŞANS4
//westysafiri 
 if(mstok3 === 56) {
stokuyarı4=+1
}
if(mstok3 < 56 && stokuyarı4 === 0) {

//westysafiri
if(sans4 == 1) { 
westysafiri4=+1
}

//mavisafir
else if(sans4 > 1 && sans4 <= 4) { 
mavisafir4=+1
}

//ametist
else if(sans4 > 4 && sans4 <= 8) { 
ametist4=+1
}

//kuvars
else if(sans4 > 8 && sans4 <= 14) { 
kuvars4=+1
}

//yakut
else if(sans4 > 14 && sans4 <= 31) { 
yakut4=+1
}

//altın
else if(sans4 > 31 && sans4 <= 52) { 
altın4=+1
}

//gümüş
else if(sans4 > 52 && sans4 <= 103) { 
gümüş4=+1
}

let toplam4 = gümüş4 + yakut4 + altın4 + ametist4 + kuvars4 + mavisafir4 + westysafiri4

  db.add(`madenstok_${message.author.id}`, toplam4)
}  let mstok4 = db.fetch(`madenstok_${message.author.id}`)


//ŞANS 5
//westysafiri 
if(mstok4 === 56) {
stokuyarı4=+1
}
if(mstok4 < 56 && stokuyarı4 === 0) {

//westysafiri
if(sans5 == 1) { 
westysafiri5=+1
}

//maviafiri
else if(sans5 > 1 && sans5 <= 4) { 
mavisafir5=+1
}

//ametist
else if(sans5 > 4 && sans5 <= 8) { 
ametist5=+1
}

//kuvars
else if(sans5 > 8 && sans5 <= 14) { 
kuvars5=+1
}

//yakut
else if(sans5 > 14 && sans5 <= 31) { 
yakut5=+1
}

//altın
else if(sans5 > 31 && sans5 <= 52) { 
altın5=+1
}

//gümüş
else if(sans5 > 52 && sans5 <= 103) { 
gümüş5=+1
}

let toplam5 = gümüş5 + yakut5 + altın5 + ametist5 + kuvars5 + mavisafir5 + westysafiri5

  db.add(`madenstok_${message.author.id}`, toplam5)
}
let mstok5 = db.fetch(`madenstok_${message.author.id}`)


if(mstok5 === 56) {
stokuyarı4=+1
}
if(mstok5 < 56 && stokuyarı4 === 0) {
//westysafiri
if(sans6 == 1) { 
westysafiri6=+1
}

//maviafiri
else if(sans6 > 1 && sans6 <= 4) { 
mavisafir6=+1
}

//ametist
else if(sans6 > 4 && sans6 <= 8) { 
ametist6=+1
}

//kuvars
else if(sans6 > 8 && sans6 <= 14) { 
kuvars6=+1
}

//yakut
else if(sans6 > 14 && sans6 <= 31) { 
yakut6=+1
}

//altın
else if(sans6 > 31 && sans6 <= 52) { 
altın6=+1
}

//gümüş
else if(sans6 > 52 && sans6 <= 103) { 
gümüş6=+1
}

let toplam6 = gümüş6 + yakut6 + altın6 + ametist6 + kuvars6 + mavisafir6 + westysafiri6

  db.add(`madenstok_${message.author.id}`, toplam6)
}
let mstok6 = db.fetch(`madenstok_${message.author.id}`)


if(mstok6 === 56) {
stokuyarı4=+1
}
if(mstok6 < 56 && stokuyarı4 === 0) {
if(sans7 == 1) { 
westysafiri7=+1
}

//maviafiri
else if(sans7 > 1 && sans7 <= 4) { 
mavisafir7=+1
}

//ametist
else if(sans7 > 4 && sans7 <= 8) { 
ametist7=+1
}

//kuvars
else if(sans7 > 8 && sans7 <= 14) { 
kuvars7=+1
}

//yakut
else if(sans7 > 14 && sans7 <= 31) { 
yakut7=+1
}

//altın
else if(sans7 > 31 && sans7 <= 52) { 
altın7=+1
}

//gümüş
else if(sans7 > 52 && sans7 <= 103) { 
gümüş7=+1
}

let toplam6 = gümüş7 + yakut7 + altın7 + ametist7 + kuvars7 + mavisafir7 + westysafiri7

  db.add(`madenstok_${message.author.id}`, toplam6)
}
let mstok7 = db.fetch(`madenstok_${message.author.id}`)

let gwsafir = westysafiri + westysafiri2 + westysafiri3 + westysafiri4 + westysafiri5 + westysafiri6 + westysafiri7
let gmsafir = mavisafir + mavisafir2 + mavisafir3 + mavisafir4 + mavisafir5 + mavisafir6 + mavisafir7
let gametist = ametist + ametist2 + ametist3 + ametist4 + ametist5 + ametist6 + ametist7
let gkuvars = kuvars + kuvars2 + kuvars3 + kuvars4 + kuvars5 + kuvars6 + kuvars7
let gyakut = yakut + yakut2 + yakut3 + yakut4 + yakut5 + yakut6 + yakut7
let galtın = altın + altın2 + altın3 + altın4 + altın5 + altın6 + altın7
let ggümüş = gümüş + gümüş2 + gümüş3 + gümüş4 + gümüş5 + gümüş6 + gümüş7

let gerçekmaden = gwsafir + gmsafir + gametist + gkuvars + gyakut + galtın + ggümüş
let madenstok = db.fetch(`madenstok_${message.author.id}`)
  setTimeout(() => { db.add(`madengümüş_${message.author.id}`, ggümüş)},100)
  setTimeout(() => { db.add(`madenaltın_${message.author.id}`, galtın)},200)
  setTimeout(() => { db.add(`madenyakut_${message.author.id}`, gyakut)},300)
  setTimeout(() => { db.add(`madenkuvars_${message.author.id}`, gkuvars)},400)
  setTimeout(() => { db.add(`madenametist_${message.author.id}`, gametist)},500)
  setTimeout(() => { db.add(`madenmsafir_${message.author.id}`, gmsafir)},600)
  setTimeout(() => { db.add(`madenwsafir_${message.author.id}`, gwsafir)},700)
  

message.channel.send(new Discord.MessageEmbed().setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setImage('https://cdn.discordapp.com/attachments/855770218357456936/947206051739107336/madengif.gif')
.setTitle('Çıkarılmış Maden Toplanıyor')).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(
new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`
━━━━━━━━━━━━━━━━
${ggümüş} • Gümüş
${galtın} • Altın
${gyakut} • Yakut
${gkuvars} • Kuvars
${gametist} • Ametist
${gmsafir} • Mavi Safir
${gwsafir} • Westy Safiri

📦 STOK  -  ${madenstok}/**56**`)
.addField(`» Maden Seviyesi • 4`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Topladı`,message.author.avatarURL({dynamic: true})
))},5000))


       db.set(`madensınır_${message.author.id}`, Date.now());

 

}
if(madensayı === 3) { 
 /// MADEN STOK MAX  == 32
  let stokuyarı3 = 0
  let mstok = db.fetch(`madenstok_${message.author.id}`) || 0


if(mstok === 32) {

const stok3 = new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`Stokun dolu, mevcut madenlerini harca ya da maden seviyeni yükselt!
📦 STOK(dolu)  -  32/**32**`)
.addField(`» Maden Seviyesi • 3`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Toplayamadı`,message.author.avatarURL({dynamic: true}))
return message.channel.send(stok3)
}
let sans1 = Math.ceil(Math.random()*103);
let sans2 = Math.ceil(Math.random()*103);
let sans3 = Math.ceil(Math.random()*103);
let sans4 = Math.ceil(Math.random()*103);
let sans5 = Math.ceil(Math.random()*103);
let sans6 = Math.ceil(Math.random()*103);

if(mstok < 32) {

//westysafiri
if(sans1 == 1) { 
westysafiri=+1
}

//mavisafir
else if(sans1 > 1 && sans1 <= 4) { 
mavisafir=+1
}

//ametist
else if(sans1 > 4 && sans1 <= 8) { 
ametist=+1
}

//kuvars
else if(sans1 > 8 && sans1 <= 14) { 
kuvars=+1
}

//yakut
else if(sans1 > 14 && sans1 <= 31) { 
yakut=+1
}

//altın
else if(sans1 > 31 && sans1 <= 52) { 
altın=+1
}

//gümüş
else if(sans1 > 52 && sans1 <= 102) { 
gümüş=+1
}
let toplam = gümüş + yakut + altın + ametist + kuvars + mavisafir + westysafiri

  db.add(`madenstok_${message.author.id}`, toplam)
}
  
let mstok1 = db.fetch(`madenstok_${message.author.id}`)


/// ŞANS 2
//westysafiri 
if(mstok1 ===32) {
stokuyarı3=+1
}
if(mstok1 < 32 && stokuyarı3 === 0) {
//westysafiri
if(sans2 == 1) { 
westysafiri2=+1
}

//mavisafir
else if(sans2 > 1 && sans2 <= 4) { 
mavisafir2=+1
}

//ametist
else if(sans2 > 4 && sans2 <= 8) { 
ametist2=+1
}

//kuvars
else if(sans2 > 8 && sans2 <= 14) { 
kuvars2=+1
}
//yakut

else if(sans2 > 14 && sans2 <= 31) { 
yakut2=+1
}

//altın
else if(sans2 > 31 && sans2 <= 52) { 
altın2=+1
}

//gümüş
else if(sans2 > 52 && sans2 <= 103) { 
gümüş2=+1
}
let toplam2 = gümüş2 + yakut2 + altın2 + ametist2 + kuvars2 + mavisafir2 + westysafiri2

  db.add(`madenstok_${message.author.id}`, toplam2)
}
  let mstok2 = db.fetch(`madenstok_${message.author.id}`)

//ŞANS3
//westysafiri 
if(mstok2 === 32) {
stokuyarı3=+1
}
if(mstok2 < 32 && stokuyarı3 === 0) {

//westysafiri
if(sans3 == 1) { 
westysafiri3=+1
}

//mavisafir
else if(sans3 > 1 && sans3 <= 4) { 
mavisafir3=+1
}

//ametist
else if(sans3 > 4 && sans3 <= 8) { 
ametist3=+1
}

//kuvars
else if(sans3 > 8 && sans3 <= 14) { 
kuvars3=+1
}

//yakut
else if(sans3 > 14 && sans3 <= 31) { 
yakut3=+1
}

//altın
else if(sans3 > 31 && sans3 <= 52) { 
altın3=+1
}

//gümüş
else if(sans3 > 52 && sans3 <= 103) { 
gümüş3=+1
}

let toplam3 = gümüş3 + yakut3 + altın3 + ametist3 + kuvars3 + mavisafir3 + westysafiri3

  db.add(`madenstok_${message.author.id}`, toplam3)
}
  let mstok3 = db.fetch(`madenstok_${message.author.id}`)


//ŞANS4
//westysafiri 
 if(mstok3 === 32) {
stokuyarı3=+1
}
if(mstok3 < 32 && stokuyarı3 === 0) {

//westysafiri
if(sans4 == 1) { 
westysafiri4=+1
}

//mavisafir
else if(sans4 > 1 && sans4 <= 4) { 
mavisafir4=+1
}

//ametist
else if(sans4 > 4 && sans4 <= 8) { 
ametist4=+1
}

//kuvars
else if(sans4 > 8 && sans4 <= 14) { 
kuvars4=+1
}

//yakut
else if(sans4 > 14 && sans4 <= 31) { 
yakut4=+1
}

//altın
else if(sans4 > 31 && sans4 <= 52) { 
altın4=+1
}

//gümüş
else if(sans4 > 52 && sans4 <= 103) { 
gümüş4=+1
}

let toplam4 = gümüş4 + yakut4 + altın4 + ametist4 + kuvars4 + mavisafir4 + westysafiri4

  db.add(`madenstok_${message.author.id}`, toplam4)
}  let mstok4 = db.fetch(`madenstok_${message.author.id}`)

//ŞANS 5
//westysafiri 
if(mstok4 === 32) {
stokuyarı3=+1
}
if(mstok4 < 32 && stokuyarı3 === 0) {

//westysafiri
if(sans5 == 1) { 
westysafiri5=+1
}

//maviafiri
else if(sans5 > 1 && sans5 <= 4) { 
mavisafir5=+1
}

//ametist
else if(sans5 > 4 && sans5 <= 8) { 
ametist5=+1
}

//kuvars
else if(sans5 > 8 && sans5 <= 14) { 
kuvars5=+1
}

//yakut
else if(sans5 > 14 && sans5 <= 31) { 
yakut5=+1
}

//altın
else if(sans5 > 31 && sans5 <= 52) { 
altın5=+1
}

//gümüş
else if(sans5 > 52 && sans5 <= 103) { 
gümüş5=+1
}

let toplam5 = gümüş5 + yakut5 + altın5 + ametist5 + kuvars5 + mavisafir5 + westysafiri5

  db.add(`madenstok_${message.author.id}`, toplam5)
}
let mstok5 = db.fetch(`madenstok_${message.author.id}`)


if(mstok5 === 32) {
stokuyarı3=+1
}
if(mstok5 < 32 && stokuyarı3 === 0) {
//westysafiri
if(sans6 == 1) { 
westysafiri6=+1
}

//maviafiri
else if(sans6 > 1 && sans6 <= 4) { 
mavisafir6=+1
}

//ametist
else if(sans6 > 4 && sans6 <= 8) { 
ametist6=+1
}

//kuvars
else if(sans6 > 8 && sans6 <= 14) { 
kuvars6=+1
}

//yakut
else if(sans6 > 14 && sans6 <= 31) { 
yakut6=+1
}

//altın
else if(sans6 > 31 && sans6 <= 52) { 
altın6=+1
}

//gümüş
else if(sans6 > 52 && sans6 <= 103) { 
gümüş6=+1
}

let toplam6 = gümüş6 + yakut6 + altın6 + ametist6 + kuvars6 + mavisafir6 + westysafiri6

  db.add(`madenstok_${message.author.id}`, toplam6)
}
let mstok6 = db.fetch(`madenstok_${message.author.id}`)


let gwsafir = westysafiri + westysafiri2 + westysafiri3 + westysafiri4 + westysafiri5 + westysafiri6
let gmsafir = mavisafir + mavisafir2 + mavisafir3 + mavisafir4 + mavisafir5 + mavisafir6
let gametist = ametist + ametist2 + ametist3 + ametist4 + ametist5 + ametist6
let gkuvars = kuvars + kuvars2 + kuvars3 + kuvars4 + kuvars5 + kuvars6
let gyakut = yakut + yakut2 + yakut3 + yakut4 + yakut5 + yakut6
let galtın = altın + altın2 + altın3 + altın4 + altın5 + altın6
let ggümüş = gümüş + gümüş2 + gümüş3 + gümüş4 + gümüş5 + gümüş6

let gerçekmaden = gwsafir + gmsafir + gametist + gkuvars + gyakut + galtın + ggümüş
let madenstok = db.fetch(`madenstok_${message.author.id}`)
  setTimeout(() => { db.add(`madengümüş_${message.author.id}`, ggümüş)},100)
  setTimeout(() => { db.add(`madenaltın_${message.author.id}`, galtın)},200)
  setTimeout(() => { db.add(`madenyakut_${message.author.id}`, gyakut)},300)
  setTimeout(() => { db.add(`madenkuvars_${message.author.id}`, gkuvars)},400)
  setTimeout(() => { db.add(`madenametist_${message.author.id}`, gametist)},500)
  setTimeout(() => { db.add(`madenmsafir_${message.author.id}`, gmsafir)},600)
  setTimeout(() => { db.add(`madenwsafir_${message.author.id}`, gwsafir)},700)
  
message.channel.send(new Discord.MessageEmbed().setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setImage('https://cdn.discordapp.com/attachments/855770218357456936/947206051739107336/madengif.gif')
.setTitle('Çıkarılmış Maden Toplanıyor')).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(

new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`
━━━━━━━━━━━━━━━━
${ggümüş} • Gümüş
${galtın} • Altın
${gyakut} • Yakut
${gkuvars} • Kuvars
${gametist} • Ametist
${gmsafir} • Mavi Safir
${gwsafir} • Westy Safiri

📦 STOK  -  ${madenstok}/**32**`)
.addField(`» Maden Seviyesi • 3`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Topladı`,message.author.avatarURL({dynamic: true})
))},5000))


       db.set(`madensınır_${message.author.id}`, Date.now());

 

}
if(madensayı === 2) {
 /// MADEN STOK MAX  == 17
  let mstok = db.fetch(`madenstok_${message.author.id}`) || 0
let stokuyarı2 = 0
if(mstok === 17) {

const stok = new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`Stokun dolu, mevcut madenlerini harca ya da maden seviyeni yükselt!
📦 STOK(dolu)  -  17/**17**`)
.addField(`» Maden Seviyesi • 2`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Toplayamadı`,message.author.avatarURL({dynamic: true}))
return message.channel.send(stok)
}
let sans1 = Math.ceil(Math.random()*103);
let sans2 = Math.ceil(Math.random()*103);
let sans3 = Math.ceil(Math.random()*103);
let sans4 = Math.ceil(Math.random()*103);
let sans5 = Math.ceil(Math.random()*103);
let sans6 = Math.ceil(Math.random()*103);

if(mstok < 17) {

//westysafiri
if(sans1 == 1) { 
westysafiri=+1
db.add(`madenstok_${message.author.id}`, 1)}

//mavisafir
else if(sans1 > 1 && sans1 <= 4) { 
mavisafir=+1
}

//ametist
else if(sans1 > 4 && sans1 <= 8) { 
ametist=+1
}

//kuvars
else if(sans1 > 8 && sans1 <= 14) { 
kuvars=+1
}

//yakut
else if(sans1 > 14 && sans1 <= 31) { 
yakut=+1
}

//altın
else if(sans1 > 31 && sans1 <= 52) { 
altın=+1
}

//gümüş
else if(sans1 > 52 && sans1 <= 102) { 
gümüş=+1
}
let toplam = gümüş + yakut + altın + ametist + kuvars + mavisafir + westysafiri

  db.add(`madenstok_${message.author.id}`, toplam)
}
  
let mstok1 = db.fetch(`madenstok_${message.author.id}`)


/// ŞANS 2
//westysafiri 
if(mstok1 === 17) {
stokuyarı2=+1
}
if(mstok1 < 17 && stokuyarı2 === 0) {
//westysafiri
if(sans2 == 1) { 
westysafiri2=+1
}

//mavisafir
else if(sans2 > 1 && sans2 <= 4) { 
mavisafir2=+1
}

//ametist
else if(sans2 > 4 && sans2 <= 8) { 
ametist2=+1
}

//kuvars
else if(sans2 > 8 && sans2 <= 14) { 
kuvars2=+1
}
//yakut

else if(sans2 > 14 && sans2 <= 31) { 
yakut2=+1
}

//altın
else if(sans2 > 31 && sans2 <= 52) { 
altın2=+1
}

//gümüş
else if(sans2 > 52 && sans2 <= 103) { 
gümüş2=+1
}
let toplam2 = gümüş2 + yakut2 + altın2 + ametist2 + kuvars2 + mavisafir2 + westysafiri2

  db.add(`madenstok_${message.author.id}`, toplam2)
}
  let mstok2 = db.fetch(`madenstok_${message.author.id}`)

//ŞANS3
//westysafiri 
if(mstok2 === 17) {
stokuyarı2=+1
}
if(mstok2 < 17 && stokuyarı2 === 0) {

//westysafiri
if(sans3 == 1) { 
westysafiri3=+1
}

//mavisafir
else if(sans3 > 1 && sans3 <= 4) { 
mavisafir3=+1
}

//ametist
else if(sans3 > 4 && sans3 <= 8) { 
ametist3=+1
}

//kuvars
else if(sans3 > 8 && sans3 <= 14) { 
kuvars3=+1
}

//yakut
else if(sans3 > 14 && sans3 <= 31) { 
yakut3=+1
}

//altın
else if(sans3 > 31 && sans3 <= 52) { 
altın3=+1
}

//gümüş
else if(sans3 > 52 && sans3 <= 103) { 
gümüş3=+1
}

let toplam3 = gümüş3 + yakut3 + altın3 + ametist3 + kuvars3 + mavisafir3 + westysafiri3

  db.add(`madenstok_${message.author.id}`, toplam3)
}
  let mstok3 = db.fetch(`madenstok_${message.author.id}`)

//ŞANS4
//westysafiri 
 if(mstok3 === 17) {
stokuyarı2=+1
}
if(mstok3 < 17 && stokuyarı2 === 0) {

//westysafiri
if(sans4 == 1) { 
westysafiri4=+1
}

//mavisafir
else if(sans4 > 1 && sans4 <= 4) { 
mavisafir4=+1
}

//ametist
else if(sans4 > 4 && sans4 <= 8) { 
ametist4=+1
}

//kuvars
else if(sans4 > 8 && sans4 <= 14) { 
kuvars4=+1
}

//yakut
else if(sans4 > 14 && sans4 <= 31) { 
yakut4=+1
}

//altın
else if(sans4 > 31 && sans4 <= 52) { 
altın4=+1
}

//gümüş
else if(sans4 > 52 && sans4 <= 103) { 
gümüş4=+1
}

let toplam4 = gümüş4 + yakut4 + altın4 + ametist4 + kuvars4 + mavisafir4 + westysafiri4

  db.add(`madenstok_${message.author.id}`, toplam4)
}  let mstok4 = db.fetch(`madenstok_${message.author.id}`)


//ŞANS 5
//westysafiri 
if(mstok4 === 17) {
stokuyarı2=+1
}
if(mstok4 < 17 && stokuyarı2 === 0) {

//westysafiri
if(sans5 == 1) { 
westysafiri5=+1
}

//maviafiri
else if(sans5 > 1 && sans5 <= 4) { 
mavisafir5=+1
}

//ametist
else if(sans5 > 4 && sans5 <= 8) { 
ametist5=+1
}

//kuvars
else if(sans5 > 8 && sans5 <= 14) { 
kuvars5=+1
}

//yakut
else if(sans5 > 14 && sans5 <= 31) { 
yakut5=+1
}

//altın
else if(sans5 > 31 && sans5 <= 52) { 
altın5=+1
}

//gümüş
else if(sans5 > 52 && sans5 <= 103) { 
gümüş5=+1
}

let toplam5 = gümüş5 + yakut5 + altın5 + ametist5 + kuvars5 + mavisafir5 + westysafiri5

  db.add(`madenstok_${message.author.id}`, toplam5)
}
let mstok5 = db.fetch(`madenstok_${message.author.id}`)


if(mstok5 === 17) {
stokuyarı2=+1
}
if(mstok5 < 17 && stokuyarı2 === 0) {
//westysafiri
if(sans6 == 1) { 
westysafiri6=+1
}

//maviafiri
else if(sans6 > 1 && sans6 <= 4) { 
mavisafir6=+1
}

//ametist
else if(sans6 > 4 && sans6 <= 8) { 
ametist6=+1
}

//kuvars
else if(sans6 > 8 && sans6 <= 14) { 
kuvars6=+1
}

//yakut
else if(sans6 > 14 && sans6 <= 31) { 
yakut6=+1
}

//altın
else if(sans6 > 31 && sans6 <= 52) { 
altın6=+1
}

//gümüş
else if(sans6 > 52 && sans6 <= 103) { 
gümüş6=+1
}

let toplam6 = gümüş6 + yakut6 + altın6 + ametist6 + kuvars6 + mavisafir6 + westysafiri6

  db.add(`madenstok_${message.author.id}`, toplam6)
}
let mstok6 = db.fetch(`madenstok_${message.author.id}`)


let gwsafir = westysafiri + westysafiri2 + westysafiri3 + westysafiri4 + westysafiri5 + westysafiri6
let gmsafir = mavisafir + mavisafir2 + mavisafir3 + mavisafir4 + mavisafir5 + mavisafir6
let gametist = ametist + ametist2 + ametist3 + ametist4 + ametist5 + ametist6
let gkuvars = kuvars + kuvars2 + kuvars3 + kuvars4 + kuvars5 + kuvars6
let gyakut = yakut + yakut2 + yakut3 + yakut4 + yakut5 + yakut6
let galtın = altın + altın2 + altın3 + altın4 + altın5 + altın6
let ggümüş = gümüş + gümüş2 + gümüş3 + gümüş4 + gümüş5 + gümüş6

let gerçekmaden = gwsafir + gmsafir + gametist + gkuvars + gyakut + galtın + ggümüş
let madenstok = db.fetch(`madenstok_${message.author.id}`)
  setTimeout(() => { db.add(`madengümüş_${message.author.id}`, ggümüş)},100)
  setTimeout(() => { db.add(`madenaltın_${message.author.id}`, galtın)},200)
  setTimeout(() => { db.add(`madenyakut_${message.author.id}`, gyakut)},300)
  setTimeout(() => { db.add(`madenkuvars_${message.author.id}`, gkuvars)},400)
  setTimeout(() => { db.add(`madenametist_${message.author.id}`, gametist)},500)
  setTimeout(() => { db.add(`madenmsafir_${message.author.id}`, gmsafir)},600)
  setTimeout(() => { db.add(`madenwsafir_${message.author.id}`, gwsafir)},700)
  
message.channel.send(new Discord.MessageEmbed().setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setImage('https://cdn.discordapp.com/attachments/855770218357456936/947206051739107336/madengif.gif')
.setTitle('Çıkarılmış Maden Toplanıyor')).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(

new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`
━━━━━━━━━━━━━━━━
${ggümüş} • Gümüş
${galtın} • Altın
${gyakut} • Yakut
${gkuvars} • Kuvars
${gametist} • Ametist
${gmsafir} • Mavi Safir
${gwsafir} • Westy Safiri

📦 STOK  -  ${madenstok}/**17**`)
.addField(`» Maden Seviyesi • 2`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Topladı`,message.author.avatarURL({dynamic: true})
))},5000))


       db.set(`madensınır_${message.author.id}`, Date.now());

 

    }
if(madensayı === 1) {
  let stokuyarı1 = 0
  /// MADEN STOK MAX  == 7
  let mstok = db.fetch(`madenstok_${message.author.id}`) || 0
if(mstok === 7) {
const stok = new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`Stokun dolu, mevcut madenlerini harca ya da maden seviyeni yükselt!
📦 STOK(dolu)  -  7/**7**`)
.addField(`» Maden Seviyesi • 1`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Toplayamadı`,message.author.avatarURL({dynamic: true}))
return message.channel.send(stok)
}
let sans1 = Math.ceil(Math.random()*103);
let sans2 = Math.ceil(Math.random()*103);
let sans3 = Math.ceil(Math.random()*103);
let sans4 = Math.ceil(Math.random()*103);
let sans5 = Math.ceil(Math.random()*103);

if(mstok < 7) {

//westysafiri
if(sans1 == 1) { 
westysafiri=+1
}

//mavisafir
else if(sans1 > 1 && sans1 <= 4) { 
mavisafir=+1
}

//ametist
else if(sans1 > 4 && sans1 <= 8) { 
ametist=+1
}

//kuvars
else if(sans1 > 8 && sans1 <= 14) { 
kuvars=+1
}

//yakut
else if(sans1 > 14 && sans1 <= 31) { 
yakut=+1
}

//altın
else if(sans1 > 31 && sans1 <= 52) { 
altın=+1
}

//gümüş
else if(sans1 > 52 && sans1 <= 102) { 
gümüş=+1
}
let toplam = gümüş + yakut + altın + ametist + kuvars + mavisafir + westysafiri

  db.add(`madenstok_${message.author.id}`, toplam)
}
  
let mstok1 = db.fetch(`madenstok_${message.author.id}`)

/// ŞANS 2
//westysafiri 
if(mstok1 === 7) {
   stokuyarı1=+1
}
if(mstok1 < 7 && stokuyarı1 === 0) {
//westysafiri
if(sans2 == 1) { 
westysafiri2=+1
}

//mavisafir
else if(sans2 > 1 && sans2 <= 4) { 
mavisafir2=+1
}

//ametist
else if(sans2 > 4 && sans2 <= 8) { 
ametist2=+1
}

//kuvars
else if(sans2 > 8 && sans2 <= 14) { 
kuvars2=+1
}
//yakut

else if(sans2 > 14 && sans2 <= 31) { 
yakut2=+1
}

//altın
else if(sans2 > 31 && sans2 <= 52) { 
altın2=+1
}

//gümüş
else if(sans2 > 52 && sans2 <= 103) { 
gümüş2=+1
}
let toplam2 = gümüş2 + yakut2 + altın2 + ametist2 + kuvars2 + mavisafir2 + westysafiri2

  db.add(`madenstok_${message.author.id}`, toplam2)
}
  let mstok2 = db.fetch(`madenstok_${message.author.id}`)

//ŞANS3
//westysafiri 
if(mstok2 === 7) {

  stokuyarı1=+1
}
if(mstok2 < 7 && stokuyarı1 === 0) {

//westysafiri
if(sans3 == 1) { 
westysafiri3=+1
}

//mavisafir
else if(sans3 > 1 && sans3 <= 4) { 
mavisafir3=+1
}

//ametist
else if(sans3 > 4 && sans3 <= 8) { 
ametist3=+1
}

//kuvars
else if(sans3 > 8 && sans3 <= 14) { 
kuvars3=+1
}

//yakut
else if(sans3 > 14 && sans3 <= 31) { 
yakut3=+1
}

//altın
else if(sans3 > 31 && sans3 <= 52) { 
altın3=+1
}

//gümüş
else if(sans3 > 52 && sans3 <= 103) { 
gümüş3=+1
}
  stokuyarı1=+1
let toplam3 = gümüş3 + yakut3 + altın3 + ametist3 + kuvars3 + mavisafir3 + westysafiri3

  db.add(`madenstok_${message.author.id}`, toplam3)
}
  let mstok3 = db.fetch(`madenstok_${message.author.id}`)


//ŞANS4
//westysafiri 
 if(mstok3 === 7) {
stokuyarı1=+1
}
if(mstok3 < 7 && stokuyarı1 === 0) {

//westysafiri
if(sans4 == 1) { 
westysafiri4=+1
}

//mavisafir
else if(sans4 > 1 && sans4 <= 4) { 
mavisafir4=+1
}

//ametist
else if(sans4 > 4 && sans4 <= 8) { 
ametist4=+1
}

//kuvars
else if(sans4 > 8 && sans4 <= 14) { 
kuvars4=+1
}

//yakut
else if(sans4 > 14 && sans4 <= 31) { 
yakut4=+1
}

//altın
else if(sans4 > 31 && sans4 <= 52) { 
altın4=+1
}

//gümüş
else if(sans4 > 52 && sans4 <= 103) { 
gümüş4=+1
}

let toplam4 = gümüş4 + yakut4 + altın4 + ametist4 + kuvars4 + mavisafir4 + westysafiri4

  db.add(`madenstok_${message.author.id}`, toplam4)
}  let mstok4 = db.fetch(`madenstok_${message.author.id}`)


//ŞANS 5
//westysafiri 
if(mstok4 === 7) {
stokuyarı1=+1
}
if(mstok4 < 7 && stokuyarı1 === 0) {

//westysafiri
if(sans5 == 1) { 
westysafiri5=+1
}

//maviafiri
else if(sans5 > 1 && sans5 <= 4) { 
mavisafir5=+1
}

//ametist
else if(sans5 > 4 && sans5 <= 8) { 
ametist5=+1
}

//kuvars
else if(sans5 > 8 && sans5 <= 14) { 
kuvars5=+1
}

//yakut
else if(sans5 > 14 && sans5 <= 31) { 
yakut5=+1
}

//altın
else if(sans5 > 31 && sans5 <= 52) { 
altın5=+1
}

//gümüş
else if(sans5 > 52 && sans5 <= 103) { 
gümüş5=+1
}

let toplam5 = gümüş5 + yakut5 + altın5 + ametist5 + kuvars5 + mavisafir5 + westysafiri5

  db.add(`madenstok_${message.author.id}`, toplam5)
}
let mstok5 = db.fetch(`madenstok_${message.author.id}`)


let gwsafir = westysafiri + westysafiri2 + westysafiri3 + westysafiri4 + westysafiri5
let gmsafir = mavisafir + mavisafir2 + mavisafir3 + mavisafir4 + mavisafir5
let gametist = ametist + ametist2 + ametist3 + ametist4 + ametist5
let gkuvars = kuvars + kuvars2 + kuvars3 + kuvars4 + kuvars5
let gyakut = yakut + yakut2 + yakut3 + yakut4 + yakut5
let galtın = altın + altın2 + altın3 + altın4 + altın5
let ggümüş = gümüş + gümüş2 + gümüş3 + gümüş4 + gümüş5

let gerçekmaden = gwsafir + gmsafir + gametist + gkuvars + gyakut + galtın + ggümüş
let madenstok = db.fetch(`madenstok_${message.author.id}`)
  setTimeout(() => { db.add(`madengümüş_${message.author.id}`, ggümüş)},100)
  setTimeout(() => { db.add(`madenaltın_${message.author.id}`, galtın)},200)
  setTimeout(() => { db.add(`madenyakut_${message.author.id}`, gyakut)},300)
  setTimeout(() => { db.add(`madenkuvars_${message.author.id}`, gkuvars)},400)
  setTimeout(() => { db.add(`madenametist_${message.author.id}`, gametist)},500)
  setTimeout(() => { db.add(`madenmsafir_${message.author.id}`, gmsafir)},600)
  setTimeout(() => { db.add(`madenwsafir_${message.author.id}`, gwsafir)},700)
  
message.channel.send(new Discord.MessageEmbed().setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setImage('https://cdn.discordapp.com/attachments/855770218357456936/947206051739107336/madengif.gif')
.setTitle('Çıkarılmış Maden Toplanıyor')).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(

new Discord.MessageEmbed()
.setAuthor('Westy • Maden Toplama',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/947096501438537748/madenikonu.png')
.setTitle(`
━━━━━━━━━━━━━━━━
${ggümüş} • Gümüş
${galtın} • Altın
${gyakut} • Yakut
${gkuvars} • Kuvars
${gametist} • Ametist
${gmsafir} • Mavi Safir
${gwsafir} • Westy Safiri

📦 STOK  -  ${madenstok}/**7**`)
.addField(`» Maden Seviyesi • 1`,'Maden seviyeni yükselterek stokunu arttırabilirsin.')
.setFooter(`${message.author.username} Topladı`,message.author.avatarURL({dynamic: true})
))},5000))


       db.set(`madensınır_${message.author.id}`, Date.now());

 

}





}
}
};
exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'maden'
};


