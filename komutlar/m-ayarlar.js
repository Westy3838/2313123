const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (bot, message, args, client) => {
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
let syc = await db.fetch(`sayac_${message.guild.id}`)
let sk = await db.fetch(`sKanal_${message.guild.id}`)
let tag = await db.fetch(`ototag_${message.guild.id}`)
let tagk = await db.fetch(`ototagKanal_${message.guild.id}`)
let arol = await db.fetch(`${message.guild.id}_otorol`)
let otok = await db.fetch(`${message.guild.id}_otokanal`)
let sorgk = await db.fetch(`sKanalay_${message.guild.id}`)
let kayk = await db.fetch(`kkanal_${message.guild.id}`)
let kr = await db.fetch(`krol_${message.guild.id}`)
let duyuru = await db.fetch(`duyuruyetkilisi_${message.guild.id}`)
const bans = db.has(`banyetkilisi_${message.guild.id}`)
const mutes = db.has(`muteyetkilisi_${message.guild.id}`)
const warns = db.has(`warnyetkilisi_${message.guild.id}`)
const kicks = db.has(`kickyetkilisi_${message.guild.id}`)
const softbans = db.has(`softbanyetkilisi_${message.guild.id}`)
const banl = db.has(`bankanal_${message.guild.id}`)
const mutel = db.has(`mutekanal_${message.guild.id}`)
const warnl = db.has(`warnkanal_${message.guild.id}`)
const kickl = db.has(`kickkanal_${message.guild.id}`)
const softbanl = db.has(`softbankanal_${message.guild.id}`)
const kilitl = db.has(`kilitkanal_${message.guild.id}`)
var on = bot.emojis.cache.get('765578629295898635')
var off = bot.emojis.cache.get('706990406868402296')
let duyuruyetkilisi = await db.fetch(`duyuruyetkilisi_${message.guild.id}`)
let sayac = await db.fetch(`sayac_${message.guild.id}`)
let sKanal = await db.fetch(`sKanal_${message.guild.id}`)
let ototag = await db.fetch(`ototag_${message.guild.id}`)
let ototagKanal = await db.fetch(`ototagKanal_${message.guild.id}`)
let otorol = await db.fetch(`${message.guild.id}_otorol`)
let otokanal = await db.fetch(`${message.guild.id}_otokanal`)
let sKanalay = await db.fetch(`sKanalay_${message.guild.id}`)
let kkanal = await db.fetch(`kkanal_${message.guild.id}`)
let krol = await db.fetch(`krol_${message.guild.id}`)
let softbancıkg = await db.fetch(`softbankanal_${message.guild.id}`)
let bancıkg = await db.fetch(`bankanal_${message.guild.id}`)
let mutecikg = await db.fetch(`mutekanal_${message.guild.id}`)
let kicqg = await db.fetch(`kickkanal_${message.guild.id}`)
let warnqg = await db.fetch(`warnkanal_${message.guild.id}`)
let softbancıky = await db.fetch(`softbanyetkilisi_${message.guild.id}`)
let bancıky = await db.fetch(`banyetkilisi_${message.guild.id}`)
let muteciky = await db.fetch(`muteyetkilisi_${message.guild.id}`)
let kicqy = await db.fetch(`kickyetkilisi_${message.guild.id}`)
let warnqy = await db.fetch(`warnyetkilisi_${message.guild.id}`)
let kilitq = db.fetch(`kilitkanal_${message.guild.id}`)
        const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} • Ayarlar`,message.guild.iconURL({dynamic:true}))  
    .addField(`<:ayarlarsembol:778579074183725076> • Log Ayarları`,'━━━━━━━━━━━━━━━━━━━  ')
    .addField(`📂 Ban Log`,`${banl ? ` ${on} <#${bancıkg}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Soft Ban Log`,`${softbanl ? ` ${on}  <#${softbancıkg}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Mute Log`,`${mutel ? ` ${on} <#${mutecikg}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Kick Log`,`${kickl ? ` ${on} <#${kicqg}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Warn Log`,`${warnl ? ` ${on} <#${warnqg}>`:`${off} \`Ayarlanmamış\``}`,true) 
    .addField(`<:ayarlarsembol:778579074183725076> • Giriş Çıkış Ayarları`,'━━━━━━━━━━━━━━━━━━━')
    .addField(`📂 Giriş Çıkış Kanal`,`${sk ? `${on} <#${sKanal}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Giriş Çıkış Hedef`,`${syc ? `${on} \`${sayac}\``:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`<:ayarlarsembol:778579074183725076> • Oto Tag Ayarları`,'━━━━━━━━━━━━━━━━━━━')
    .addField(`📂 Oto Tag`,`${tag ? `${on}  \`${ototag}\``:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Oto Tag Kanal`,`${tagk ? `${on} <#${ototagKanal}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`<:ayarlarsembol:778579074183725076> • Oto Rol Ayarları`,'━━━━━━━━━━━━━━━━━━━')
    .addField(`📂 Oto Rol`,`${arol ? `${on} <@&${otorol}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Oto Rol Kanal`,`${otok ? `${on} <#${otokanal}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`<:ayarlarsembol:778579074183725076> • Kayıt Sistemi Ayarları`,'━━━━━━━━━━━━━━━━━━━')
    .addField(`📂 Kayıt Kanal`,`${kayk ? `${on} ${kkanal}`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Kayıt Rol`,`${kr ? `${on} <@&${krol}>`:`${off} \`Ayarlanmamış\``}`,true)
   
   

    .addField(`<:ayarlarsembol:778579074183725076> • Diğer Ayarlar`,'━━━━━━━━━━━━━━━━━━━')
    .addField(`📂 Sorgulama Kanal`,`${sorgk ? `${on} <#${sKanalay}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Duyuru Yetkilisi`,`${duyuru ? `${on} <@&${duyuruyetkilisi}>`:`${off} \`Ayarlanmamış\``}`,true)
    .addField(`📂 Kilit Kanal`,`${kilitl ? `${on} <#${kilitq}>`:`${off} \`Ayarlanmamış\``}`,true)
    .setDescription(`<:ayarlarsembol:778579074183725076> **• Yetkili Ayarları**\n**━━━━━━━━━━━━━━━━━━━**\n**📂 Ban Yetkili**\n${bans ? `${on} <@&${bancıky}>`:`${off} \`Ayarlanmamış\``}\n📂 **Soft Ban Yetkili**\n${softbans ? `${on} <@&${softbancıky}>`:`${off} \`Ayarlanmamış\``}\n📂 **Mute Yetkili**\n${mutes ? `${on} <@&${muteciky}>`:`${off} \`Ayarlanmamış\``}\n📂 **Kick Yetkili**\n${kicks ? `${on} <@&${kicqy}>`:`${off} \`Ayarlanmamış\``}\n📂 **Warn Yetkili**\n${warns ? `${on} <@&${warnqy}>`:`${off} \`Ayarlanmamış\``}`)
    .setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/747791390741627050/carklar.png')
    .setColor(ayarlar.renk)
    message.channel.send(embed)


      


  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['settings','set'],
  permLevel: 0,

};

exports.help = {
  name: 'ayarlar',
  description: 'Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.',
  usage: 'yetkilerim'
};