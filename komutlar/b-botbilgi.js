const  Discord = require("discord.js"); 
const client = new Discord.Client();
const moment = require("moment");
const a = require('../ayarlar.json')
require("moment-duration-format");
const db = require('quick.db');
module.exports.run = async(client, message, args) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

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

   

  var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") {
      const uptime = moment
      .duration(client.uptime)
      .format(" D [day], H [hour], m [min]");
 const embed = new Discord.MessageEmbed()
    .setColor(a.renk)
   .setAuthor('Westy#8208',a.clientlogo)
   .setTitle('Bot Information System')
    .addField(`${a.dev} Producer`,`Yigit Palaur#7072`,true)
    .addField("👥 **Users**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),true)
    .addField('<:sunucular:938660375312887858> **Servers**', client.guilds.cache.size,true)
    .addField(':chart_with_upwards_trend: n**Memory Usage**',`${(process.memoryUsage().heapUsedprocess.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)
    .addField(":bell: **Ping**", client.ws.ping + 'ms',true)
    .addField('🕒 Uptime',uptime,true)
   .setThumbnail(a.clientlogo)
    .setTimestamp()
    .setFooter('Westy • Statics',a.clientlogo)
.addField(`━━━━━━━━━━━━━━━━━━━━`,`[Support](https://discord.gg/uFuW6pF) • [Invite](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Promotion](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `) 

    message.channel.send(embed);
}
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") return;
  
      const uptime = moment
      .duration(client.uptime)
      .format(" D [gün], H [saat], m [dk]");

 const embed = new Discord.MessageEmbed()
    .setColor(a.renk)
   .setAuthor('Westy#8208',a.clientlogo)
   .setTitle('Bot Bilgi Sistemi')
    .addField(`${a.dev} Yapımcı`,`Yigit Palaur#7072`,true)
    .addField("👥 **Kullanıcılar**" , client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),true)
    .addField('<:sunucular:938660375312887858> **Sunucular**', client.guilds.cache.size,true)
    .addField(':chart_with_upwards_trend: **Bellek kullanımı**',`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)
   .addField(":bell: **Ping**", client.ws.ping + 'ms',true)
    .addField('🕒 Çalışma Süresi', uptime,true)
   .setThumbnail(a.clientlogo)
    .setTimestamp()
    .setFooter('Westy • İstatistikler',a.clientlogo)
.addField(`━━━━━━━━━━━━━━━━━━━━`,`[Destek](https://discord.gg/uFuW6pF) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `) 

    await message.channel.send(embed);
}
exports.conf = {
  enabled: true,
    guildOnly: true,
  aliases: ['istatistik', 'botbilgi', 'bot-bilgi','i','botinfo'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi-bot',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'istatistik [bot durumunu yazar]'
};
