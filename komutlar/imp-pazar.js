const disbut = require("discord-buttons")
const Discord = require("discord.js")
const ayarlar = require('../ayarlar.json')
const db = require(`quick.db`);
const talkedRecently = new Set();
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
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

let akçe = db.fetch(`para_${message.author.id}`)
let gümüş = db.fetch(`madengümüş_${message.author.id}`)
let altın = db.fetch(`madenaltın_${message.author.id}`)
let yakut = db.fetch(`madenyakut_${message.author.id}`)
let kuvars = db.fetch(`madenkuvars_${message.author.id}`)
let ametist = db.fetch(`madenametist_${message.author.id}`)
let mavisafir = db.fetch(`madenmsafir_${message.author.id}`)
let westysafir = db.fetch(`madenwsafir_${message.author.id}`)
let asker = db.fetch(`asker_${message.author.id}`)
let okçu = db.fetch(`okçu_${message.author.id}`)
let süvari = db.fetch(`süvari_${message.author.id}`)
let ejderha = db.fetch(`ejderha_${message.author.id}`)


//KODLAR
if(args[0] === "AGP30-15"){
  if(gümüş < 15) return message.channel.send(`${ayarlar.wx} 15 Gümüşün Yok!`)
  message.channel.send(`${ayarlar.wt} **AGP30-15 Pazar Kodu Kullanıldı**
Verilen • 15 Gümüş
Alınan • 30 Asker`)
db.add(`asker_${message.author.id}`, 30)
db.add(`madengümüş_${message.author.id}`, - 15)
db.add(`madenstok_${message.author.id}`, - 15)
  return;
}

if(args[0] === "OGP5-8"){
  if(gümüş < 8) return message.channel.send(`${ayarlar.wx} 8 Gümüşün Yok!`)
  message.channel.send(`${ayarlar.wt} **OGP5-8 Pazar Kodu Kullanıldı**
Verilen • 8 Gümüş
Alınan • 5 Okçu`)
db.add(`okçu_${message.author.id}`, 5)
db.add(`madengümüş_${message.author.id}`, - 8)
  db.add(`madenstok_${message.author.id}`, - 8)
   return;
}

if(args[0] === "AAP1-2"){
  if(altın < 2) return message.channel.send(`${ayarlar.wx} 2 Altının Yok!`)
 message.channel.send(`${ayarlar.wt} **AAP1-2 Pazar Kodu Kullanıldı**
Verilen • 2 Altın
Alınan • 1000 Akçe`)
db.add(`para_${message.author.id}`, 1000)
db.add(`madenaltın_${message.author.id}`, - 2)
  db.add(`madenstok_${message.author.id}`, - 2)
   return;
}

if(args[0] === "SAP5-3"){
  if(altın < 3) return message.channel.send(`${ayarlar.wx} 3 Altının Yok!`)
  message.channel.send(`${ayarlar.wt} **SAP5-3 Pazar Kodu Kullanıldı**
Verilen • 3 Altın
Alınan • 5 Süvari`)
db.add(`süvari_${message.author.id}`, 5)
db.add(`madenaltın_${message.author.id}`, - 3)
  db.add(`madenstok_${message.author.id}`, - 3)
   return;
}

if(args[0] === "AYP12-1"){
  if(yakut < 1) return message.channel.send(`${ayarlar.wx} 1 Yakutun Yok!`)
  message.channel.send(`${ayarlar.wt} **AYP12-1 Pazar Kodu Kullanıldı**
Verilen • 1 Yakut
Alınan • 1200 Akçe`)
db.add(`para_${message.author.id}`, 1200)
db.add(`madenyakut_${message.author.id}`, - 1)
  db.add(`madenstok_${message.author.id}`, - 1)
   return;
}

if(args[0] === "AYP10-2"){
  if(yakut < 2) return message.channel.send(`${ayarlar.wx} 2 Yakutun Yok!`)
  message.channel.send(`${ayarlar.wt} **AYP10-1 Pazar Kodu Kullanıldı**
Verilen • 2 Yakut
Alınan • 10 Okçu`)
db.add(`okçu_${message.author.id}`, 10)
db.add(`madenyakut_${message.author.id}`, - 2)
  db.add(`madenstok_${message.author.id}`, - 2)
   return;
}

if(args[0] === "SKP10-2"){
  if(kuvars < 2) return message.channel.send(`${ayarlar.wx} 2 Kuvarsın Yok!`)
  message.channel.send(`${ayarlar.wt} **SKP10-2 Pazar Kodu Kullanıldı**
Verilen • 2 Kuvars
Alınan • 10 Süvari`)
db.add(`süvari_${message.author.id}`, 10)
db.add(`madenkuvars_${message.author.id}`, - 2)
  db.add(`madenstok_${message.author.id}`, - 2)
   return;
}

if(args[0] === "SAMP7-1"){
  if(ametist < 1) return message.channel.send(`${ayarlar.wx} 1 Ametistin Yok!`)
 message.channel.send(`${ayarlar.wt} **SAMP7-1 Pazar Kodu Kullanıldı**
Verilen • 1 Ametist
Alınan • 6 Süvari`)
db.add(`süvari_${message.author.id}`, 6)
db.add(`madenametist_${message.author.id}`, - 1)
  db.add(`madenstok_${message.author.id}`, - 1)
   return;
}

if(args[0] === "EMS1-3"){
  if(mavisafir < 3) return message.channel.send(`${ayarlar.wx} 3 Mavi Safirin Yok!`)
 message.channel.send(`${ayarlar.wt} **EMS1-3 Pazar Kodu Kullanıldı**
Verilen • 3 Mavi Safir
Alınan • 1 Ejderha`)
db.add(`ejderha_${message.author.id}`, 1)
db.add(`madenmsafir_${message.author.id}`, - 3)
  db.add(`madenstok_${message.author.id}`, - 3)
   return;
}

if(args[0] === "AMS3-1"){
  if(mavisafir < 1) return message.channel.send(`${ayarlar.wx} 1 Mavi Safirin Yok!`)
 message.channel.send(`${ayarlar.wt} **AMS3-1 Pazar Kodu Kullanıldı**
Verilen • 1 Mavi Safir
Alınan • 3000 Akçe`)
db.add(`para_${message.author.id}`, 3000)
db.add(`madenmsafir_${message.author.id}`, - 1)
  db.add(`madenstok_${message.author.id}`, - 1)
   return;
}

if(args[0] === "EWS1-1"){
  if(westysafir < 1) return message.channel.send(`${ayarlar.wx} 1 Westy Safirin Yok!`)
  message.channel.send(`${ayarlar.wt} **EWS1-1 Pazar Kodu Kullanıldı**
Verilen • 1 Westy Safiri
Alınan • 1 Ejderha`)
db.add(`ejderha_${message.author.id}`, 1)
db.add(`madenwsafir_${message.author.id}`, - 1)
  db.add(`madenstok_${message.author.id}`, - 1)
   return;
}

if(args[0] === "ESOWWS0"){
  if(westysafir < 2) return message.channel.send(`${ayarlar.wx} 2 Westy Safirin Yok!`)
  message.channel.send(`${ayarlar.wt} **ESOWWS0 Pazar Kodu Kullanıldı**
Verilen • 2 Westy Safiri
Alınan • 1 Ejderha, 10 Süvari, 10 Okçu, 3000 Westy Akçesi`)
db.add(`ejderha_${message.author.id}`, 1)
db.add(`süvari_${message.author.id}`, 10)
db.add(`okçu_${message.author.id}`, 10)
db.add(`para_${message.author.id}`, 3000)
db.add(`madenwsafir_${message.author.id}`, - 2)
  db.add(`madenstok_${message.author.id}`, - 2)
 return;
}

//TALKED RECENTLY
if (talkedRecently.has(message.author.id)) {
    return message.channel.send(`${ayarlar.wx} **Zaten aktif bir pazar menüsü var, daha sonra tekrar deneyin.**\n*Menüyü isteme süresi 1 dakikadır.*`);
} else {
  //TANIMLAR

  if (message.author.bot) return;
        message.channel.send(`Menü yükleniyor...`).then(async msj => {
            const botPing = (msj.createdTimestamp - message.createdTimestamp);
            msj.delete();
        const btn1 = new disbut.MessageMenuOption()
            .setLabel('Pazar Bilgi')
            .setDescription("Pazar bilgilendirme sayfası")
            .setValue('1').setEmoji("📚")
//
        const btn2 = new disbut.MessageMenuOption()
            .setLabel('Gümüş Pazarı')
            .setValue('2').setEmoji("⚪")
//
        const btn3 = new disbut.MessageMenuOption()
            .setLabel('Altın Pazarı')
            .setValue('3').setEmoji("🟡")
//
        const btn4 = new disbut.MessageMenuOption()
            .setLabel('Yakut Pazarı')
            .setEmoji(`🔴`)
            .setValue(`4`)
//
        const btn5 = new disbut.MessageMenuOption()
            .setLabel('Kuvars Pazarı')
            .setEmoji(`🔺`)
            .setValue(`5`)
//
        const btn6 = new disbut.MessageMenuOption()
        .setLabel(`Ametist Pazarı`)
        .setEmoji("🟣")
        .setValue("6")
//
const btn7 = new disbut.MessageMenuOption()
     .setLabel(`Mavi Safir Pazarı`)
      .setEmoji("🔵")
      .setValue("7")
//
      const btn8 = new disbut.MessageMenuOption()
        .setLabel(`Westy Safiri Pazarı`)
        .setEmoji("🏵️")
        .setValue("8")
//


        const menu = new disbut.MessageMenu()
        .addOptions(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8)
        .setMaxValues(1)
        .setMinValues(1)
        .setID("menu")
///////////////////////////////////////
        const anasayfa = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
       .setAuthor('Westy • Pazar Menüsü',ayarlar.clientlogo)
       .setThumbnail(ayarlar.clientlogo)
       .setTitle('📚  Pazar • Anasayfa')
       .setDescription(`» Şu an **Pazar Ana Sayfasındasın.**\nAşağıdaki **Seçim yap**\'a tıkla, istediğin menüyü seçerek pazarlar arasında geçiş yapabilirsin.\n
⚪ • Gümüş Pazarı
🟡 • Altın Pazarı
🔴 • Yakut Pazarı
🔺 • Kuvars Pazarı
🟣 • Ametist Pazarı
🔵 • Mavi Safir Pazarı
🏵️ • Westy Safiri Pazarı

Pazar kodlarını kullanmak için;
${prefix}pazar pazarkodu
`)
       .addField(`${prefix}sponsor • sourcebilisim.com`,`[**Yeniliklerden Haberdar Olmak için Buraya Tıkla**](https://discord.gg/QtSzCvmn7t)`)  
// [Davet Et](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Oyla](https://top.gg/bot/636202587648950303/vote) • [Tanıtım Videoları](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi)
       .setFooter(`• Her hakkı saklıdır Westy Bot © 2022 | w!gizlilik-politikası `)
       .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////////////////
        const mods = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Pazar',ayarlar.clientlogo)
            .setTitle('⚪ Gümüş Pazarı')
            .addField(`⚔️ » 30 Asker\nDeğer • 15 Gümüş`,`Pazar Kodu • AGP30-15`, true)
            .addField(`🏹 » 5 Okçu\nDeğer • 8 Gümüş`,`Pazar Kodu • OGP5-8`, true)
       //     .addField(`🏇 » 1 Süvari\nDeğer • 5 Gümüş`,`Pazar Kodu • SGP1-5`,true)
      //    .addField(`🏇 » 2 Süvari\nDeğer • 8 Gümüş`,`Pazar Kodu • SGP2-8`)
            .setFooter(`• ${prefix}pazar pazarkodu | Menüyü oluşturan kullanabilir.`)
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////////////////
const imp = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Pazar',ayarlar.clientlogo)
            .setTitle('🟡 • Altın Pazarı')
            .addField(`<:westyakce:781831733971910666> » 1000 Akçe\nDeğer • 2 Altın`,`Pazar Kodu • AAP1-2`, true)
            .addField(`🏇 » 5 Süvari\nDeğer • 3 Altın`,`Pazar Kodu • SAP5-3`, true)
            .setFooter('• w!pazar pazarkodu | Menüyü oluşturan kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////
////////////////
const yet = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Pazar',ayarlar.clientlogo)
            .setTitle('🔴 • Yakut Pazarı')
            .addField(`<:westyakce:781831733971910666> » 1200 Akçe\nDeğer • 1 Yakut`,`Pazar Kodu • AYP12-1`, true)
            .addField(`🏹 » 10 Okçu\nDeğer • 2 Yakut`,`Pazar Kodu • AYP10-2`, true)
            .setFooter(`• ${prefix}pazar pazarkodu | Menüyü oluşturan kullanabilir.`)
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////
////////////////
const ex = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Pazar',ayarlar.clientlogo)
            .setTitle('🔺 • Kuvars Pazarı')
            .addField(`🏇 » 10 Süvari\nDeğer • 2 Kuvars`,`Pazar Kodu • SKP10-2`, true)
           .setFooter(`• ${prefix}pazar pazarkodu | Menüyü oluşturan kullanabilir.`)
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////
////////////////
const fun = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Pazar',ayarlar.clientlogo)
            .setTitle('🟣 • Ametist Pazarı')
            .addField(`🏇 » 6 Süvari\nDeğer • 1 Ametist`,`Pazar Kodu • SAMP7-1`, true)
           .setFooter(`• ${prefix}pazar pazarkodu | Menüyü oluşturan kullanabilir.`)
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////
////////////////
const game = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Pazar',ayarlar.clientlogo)
            .setTitle('🔵 • Mavi Safir Pazarı')
            .addField(`🐉 » 1 Ejderha\nDeğer • 3 Mavi Safir`,`Pazar Kodu • EMS1-3`, true)
            .addField(`<:westyakce:781831733971910666> » 3000 Akçe\nDeğer • 1 Mavi Safir`,`Pazar Kodu • AMS3-1`, true) 
            .setFooter(`• ${prefix}pazar pazarkodu | Menüyü oluşturan kullanabilir.`)
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////
////////////////
const bot = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Pazar',ayarlar.clientlogo)
            .setTitle('🏵️ • Westy Safiri Pazarı')
             .addField(`🐉 » 1 Ejderha\nDeğer • 1 Westy Safiri`,`Pazar Kodu • EWS1-1`, true)
            .addField(`🐉 » 1 Ejderha & 10 Süvari & 10 Okçu & 3000 Westy Akçesi\nDeğer • 2 Westy Safiri`,`Pazar Kodu • ESOWWS0`, true)
            .setFooter(`• ${prefix}pazar pazarkodu | Menüyü oluşturan kullanabilir.`)
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
           .setImage('https://cdn.discordapp.com/attachments/748252221224910899/965355259365064714/pazarmenuthumbnail.png')
////
////////////////

            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            

        let msg = await message.channel.send({ embed: anasayfa, component: menu })
        talkedRecently.add(message.author.id);
  
        msg.delete({timeout: 178000, reason: "süre bitti"}).catch(error => { console.log('Menü silme| HATA')})
        const filter = (menu) => menu.clicker.user.id === message.author.id;
      //user filter (author only)
        const collector = message.createMenuCollector(filter, { time: 180000 })
        client.on("clickMenu", menu => {
            if(menu.clicker.id !== message.author.id) return;
            menu.reply.defer().catch(error => { console.log('PAZAR | EDİT')})
            if (menu.values[0] === '1') {
                msg.edit({
                    embed: anasayfa
                }).catch(error => { console.log('PAZAR  | EDİT')})
            }
            if (menu.values[0] === '2') {
                msg.edit({
                    embed: mods
                }).catch(error => { console.log('PAZAR | EDİT')})
           
            }
            if(menu.values[0] === "3"){
                msg.edit({
                    embed: imp
                }).catch(error => { console.log('PAZAR | EDİT')})
            }
            if(menu.values[0] === "4"){
                msg.edit({
                    embed: yet
       
                }).catch(error => { console.log('PAZAR | EDİT')})
         
            }
 if(menu.values[0] === "5"){
                msg.edit({
                    embed: ex
                }).catch(error => { console.log('PAZAR | EDİT')})
 }
if(menu.values[0] === "6"){
                msg.edit({
                    embed: fun
               
 }).catch(error => { console.log('PAZAR | EDİT')})
 }
if(menu.values[0] === "7"){
                msg.edit({
                    embed: game
               
 }).catch(error => { console.log('PAZAR | EDİT')})
 }
if(menu.values[0] === "8"){
                msg.edit({
                    embed: bot
                }).catch(error => { console.log('PAZAR | EDİT')})
 }


   
        })

        })
        setTimeout(() => {
        talkedRecently.delete(message.author.id);
}, 60000) }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pazar"],
  permLevel: 0
};

exports.help = {
  name: "pazar",
  description: "Pazar menüsü",
  usage: "pazar"
};