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
let askerkat = await qb.fetch(`asker_${message.author.id}`) || 0
let okçukat = await qb.fetch(`okçu_${message.author.id}`) || 0
let süvarikat = await qb.fetch(`süvari_${message.author.id}`) || 0
let ejderkat = await qb.fetch(`ejderha_${message.author.id}`) || 0

let mkata = askerkat*1
let mkato = okçukat*3
let mkats = süvarikat*5
let mkate = ejderkat*100

let mtoplamkat = mkata + mkats + mkate + mkato
  if (!args[0])  message.channel.send(new Discord.MessageEmbed()
.setAuthor('Westy • Sefer Listesi',ayarlar.clientlogo)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781496357235327026/ksla.png')
.setColor(ayarlar.renk)
.setTitle(`Mevcut Hasar • ${mtoplamkat}`)
.addField(`:trophy: Komutan Ares(${prefix}sefer ares)`,'Komutan Ares, çok başarılı bir komutandır. Saldırış şekli ve teknikleri çok gelişmiş bir saygıdeğer savaş komutanıdır.\n**Sefer Sonucu Verdiği Birlikler •** \`2 Süvari\`\nSefer için en az **50** hasarın olmalı.')
.addField(`:man_detective: General Prepior(${prefix}sefer prepior)`,'General Prepior, savaştaki hamleleriyle kendini öne çıkaran bir generaldir. Teknikleri çok iyi bir saygıdeğer savaş generalidir.\n**Sefer Sonucu Verdiği Birlikler •** \`20 Okçu\` \nSefer için en az **100** hasarın olmalı.')
.addField(`:man_guard: Üstat Aphin(${prefix}sefer aphin)`,'Üstat Aphin, yıllarca bir sürü askere eğitim verdi. Ama askerleri ona karşı gelmeye başlayınca kendi ordusunu kurup onlara savaş açmıştır.\n**Sefer Sonucu Verdiği Birlikler •** \`80 Asker\` \nSefer için en az **200** hasarın olmalı.')
.addField(`:ninja: Usta Ninjou(${prefix}sefer ninjou)`,'Usta Ninjou, Tapınağında kendine özgü savaş sanatlarını planlayıp acımasızca bunları düşmanları üzerinde uyguluyor. Aman dikkat!\n**Sefer Sonucu Verdiği Birlikler •** \`20 Okçu, 5 Süvari, 5 Tüccar\` \nSefer için en az **300** hasarın olmalı.')
.addField(`:santa: Senatör Kravsy(${prefix}sefer kravsy)`,'Atlı Senatör Kravsy, İmparatorluğunda Senatörlüğünü ilan etti, çok cüretkâr bir yönetim şekliyle halkına zulüm ediyor.\n**Sefer Sonucu Verdiği Birlikler •** \`2 Ejderha, 5 Tüccar\` \nSefer için en az **500** hasarın olmalı.'))

  
  if (args[0] === 'ares') {
  

var durum = await qb.fetch(`ares_${message.author.id}`)       
        if (durum == "acik") return message.channel.send(`${ayarlar.wx} **Zaten Ares\'e Karşı Sefer Yapmışsın!**`);
let para = await qb.fetch(`para_${message.author.id}`) 
let askerkat = await qb.fetch(`asker_${message.author.id}`) || 0
let okçukat = await qb.fetch(`okçu_${message.author.id}`) || 0
let süvarikat = await qb.fetch(`süvari_${message.author.id}`) || 0
let ejderkat = await qb.fetch(`ejderha_${message.author.id}`) || 0

let mkata = askerkat*1
let mkato = okçukat*3
let mkats = süvarikat*5
let mkate = ejderkat*100

let mtoplamkat = mkata + mkats + mkate + mkato

if(mtoplamkat < 50) return message.channel.send(`${ayarlar.wx} **Yeterli Hasarın Yok, Toplam Hasarın 50 Olmalı!**`)
message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle('Sefer Başladı!')
    
    .setImage('https://cdn.discordapp.com/attachments/781123411204112387/785975900461727794/0jRhFD.gif')
    .setDescription(`Komutan Ares :vs: ${message.author.username} İmparatorluğu`)).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Seferi Kazandı!`)
    .setDescription('Ares, **2 süvarisini** sana verdi.'))},5000))
setTimeout(() => { qb.add(`süvari_${message.author.id}`, 2) },5100)
 qb.set(`ares_${message.author.id}`,'acik');
const ap = new Discord.MessageEmbed()

  }

  if (args[0] === 'prepior') {
   var durum = await qb.fetch(`prepior_${message.author.id}`)       
        if (durum == "acik") return message.channel.send(`${ayarlar.wx} **Zaten General Prepior\'a Karşı Sefer Yapmışsın!**`);
 let para = await qb.fetch(`para_${message.author.id}`) 
let askerkat = await qb.fetch(`asker_${message.author.id}`) || 0
let okçukat = await qb.fetch(`okçu_${message.author.id}`) || 0
let süvarikat = await qb.fetch(`süvari_${message.author.id}`) || 0
let ejderkat = await qb.fetch(`ejderha_${message.author.id}`) || 0

let mkata = askerkat*1
let mkato = okçukat*3
let mkats = süvarikat*5
let mkate = ejderkat*100

let mtoplamkat = mkata + mkats + mkate + mkato

if(mtoplamkat < 100) return message.channel.send(`${ayarlar.wx} **Yeterli Hasarın Yok, Toplam Hasarın 100 Olmalı!**`)
message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle('Sefer Başladı!')
    
    .setImage('https://cdn.discordapp.com/attachments/781123411204112387/785975900461727794/0jRhFD.gif')
    .setDescription(`General Prepior :vs: ${message.author.username} İmparatorluğu`)).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Seferi Kazandı!`)
    .setDescription('General Prepior, **20 okçusunu** sana verdi.'))},5000))
setTimeout(() => { qb.add(`okçu_${message.author.id}`, 20) },5100)

 qb.set(`prepior_${message.author.id}`,'acik');
  }
  

  

  if (args[0] === 'aphin') {
   var durum = await qb.fetch(`aphin_${message.author.id}`)       
        if (durum == "acik") return message.channel.send(`${ayarlar.wx} **Zaten Üstat Aphin\'e Karşı Sefer Yapmışsın!**`);
let para = await qb.fetch(`para_${message.author.id}`) 
let askerkat = await qb.fetch(`asker_${message.author.id}`) || 0
let okçukat = await qb.fetch(`okçu_${message.author.id}`) || 0
let süvarikat = await qb.fetch(`süvari_${message.author.id}`) || 0
let ejderkat = await qb.fetch(`ejderha_${message.author.id}`) || 0

let mkata = askerkat*1
let mkato = okçukat*3
let mkats = süvarikat*5
let mkate = ejderkat*100

let mtoplamkat = mkata + mkats + mkate + mkato

if(mtoplamkat < 200) return message.channel.send(`${ayarlar.wx} **Yeterli Hasarın Yok, Toplam Hasarın 200 Olmalı!**`)
message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle('Sefer Başladı!')
    
    .setImage('https://cdn.discordapp.com/attachments/781123411204112387/785975900461727794/0jRhFD.gif')
    .setDescription(`Üstat Aphin :vs: ${message.author.username} İmparatorluğu`)).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Seferi Kazandı!`)
    .setDescription('Üstat Aphin, **80 askerini** sana verdi.'))},5000))
setTimeout(() => { qb.add(`asker_${message.author.id}`, 80) },5100)

 qb.set(`aphin_${message.author.id}`,'acik');
  }
  if (args[0] === 'ninjou') {
   var durum = await qb.fetch(`ninjou_${message.author.id}`)       
        if (durum == "acik") return message.channel.send(`${ayarlar.wx} **Zaten Usta Ninjou\'ya Karşı Sefer Yapmışsın!**`);
let para = await qb.fetch(`para_${message.author.id}`) 
let askerkat = await qb.fetch(`asker_${message.author.id}`) || 0
let okçukat = await qb.fetch(`okçu_${message.author.id}`) || 0
let süvarikat = await qb.fetch(`süvari_${message.author.id}`) || 0
let ejderkat = await qb.fetch(`ejderha_${message.author.id}`) || 0

let mkata = askerkat*1
let mkato = okçukat*3
let mkats = süvarikat*5
let mkate = ejderkat*100

let mtoplamkat = mkata + mkats + mkate + mkato

if(mtoplamkat < 300) return message.channel.send(`${ayarlar.wx} **Yeterli Hasarın Yok, Toplam Hasarın 300 Olmalı!**`)

    let tüccarsınır = qb.fetch(`tüccar_${message.author.id}`)
    if(tüccarsınır >= 50 && tüccarsınır + 5 > 50) {
message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle('Sefer Başladı!')
    
    .setImage('https://cdn.discordapp.com/attachments/781123411204112387/785975900461727794/0jRhFD.gif')
    .setDescription(`Usta Ninjou :vs: ${message.author.username} İmparatorluğu`)).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Seferi Kazandı!`)
    .setDescription('Usta Ninjou, **20 Okçusunu, 10 Süvarisini** sana verdi.(Tüccar sayın 50 veya 50\'den fazla, tüccar yerine süvari verildi)'))},5000))
setTimeout(() => { qb.add(`okçu_${message.author.id}`, 20) },5100)
setTimeout(() => { qb.add(`süvari_${message.author.id}`, 10) },5100)
qb.set(`ninjou_${message.author.id}`,'acik');
} 

 if(tüccarsınır < 50 && tüccarsınır + 5 < 50) {message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle('Sefer Başladı!')
    
    .setImage('https://cdn.discordapp.com/attachments/781123411204112387/785975900461727794/0jRhFD.gif')
    .setDescription(`Usta Ninjou :vs: ${message.author.username} İmparatorluğu`)).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Seferi Kazandı!`)
    .setDescription('Usta Ninjou, **20 Okçusunu, 5 Süvarisini ve 5 Tüccarını** sana verdi.'))},5000))
setTimeout(() => { qb.add(`okçu_${message.author.id}`, 20) },5100)
setTimeout(() => { qb.add(`süvari_${message.author.id}`, 5) },5100)
setTimeout(() => { qb.add(`tüccar_${message.author.id}`, 5) },5100)
 qb.set(`ninjou_${message.author.id}`,'acik');
                  }
  }
    
  if (args[0] === 'kravsy') {
   var durum = await qb.fetch(`kravsy_${message.author.id}`)       
        if (durum == "acik") return message.channel.send(`${ayarlar.wx} **Zaten Senatör Kravsy\'e Karşı Sefer Yapmışsın!**`);
let para = await qb.fetch(`para_${message.author.id}`) 
let askerkat = await qb.fetch(`asker_${message.author.id}`) || 0
let okçukat = await qb.fetch(`okçu_${message.author.id}`) || 0
let süvarikat = await qb.fetch(`süvari_${message.author.id}`) || 0
let ejderkat = await qb.fetch(`ejderha_${message.author.id}`) || 0

let mkata = askerkat*1
let mkato = okçukat*3
let mkats = süvarikat*5
let mkate = ejderkat*100

let mtoplamkat = mkata + mkats + mkate + mkato

if(mtoplamkat < 500) return message.channel.send(`${ayarlar.wx} **Yeterli Hasarın Yok, Toplam Hasarın 500 Olmalı!**`)
let tüccarsınır = qb.fetch(`tüccar_${message.author.id}`)
if(tüccarsınır >= 50 && tüccarsınır + 5 > 50) {
message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle('Sefer Başladı!')
    
    .setImage('https://cdn.discordapp.com/attachments/781123411204112387/785975900461727794/0jRhFD.gif')
    .setDescription(`Senatör Kravsy :vs: ${message.author.username} İmparatorluğu`)).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Seferi Kazandı!`)
    .setDescription('Senatör Kravsy, **2 Ejderhasını ve 5 Süvarisini** sana verdi. (Tüccar sayın 50 veya 50\'den fazla, tüccar yerine süvari verildi) '))},5000))
setTimeout(() => { qb.add(`ejderha_${message.author.id}`, 2) },5100)
setTimeout(() => { qb.add(`tüccar_${message.author.id}`, 5) },5100)
 qb.set(`kravsy_${message.author.id}`,'acik');
}
if(tüccarsınır < 50 && tüccarsınır + 5 < 50) {message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle('Sefer Başladı!')
    
    .setImage('https://cdn.discordapp.com/attachments/781123411204112387/785975900461727794/0jRhFD.gif')
    .setDescription(`Senatör Kravsy :vs: ${message.author.username} İmparatorluğu`)).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Sefer',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Seferi Kazandı!`)
    .setDescription('Senatör Kravsy, **2 Ejderhasını ve 5 Tüccarını** sana verdi.'))},5000))
setTimeout(() => { qb.add(`ejderha_${message.author.id}`, 2) },5100)
setTimeout(() => { qb.add(`tüccar_${message.author.id}`, 5) },5100)
  qb.set(`kravsy_${message.author.id}`,'acik');
                       }
  }
}
exports.conf = {
  
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'sefer'
}