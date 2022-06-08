const Discord = require(`discord.js`)
const ayarlar = require(`../ayarlar.json`)
const db = require(`quick.db`);
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
  let yazıİçeriği = args.slice().join(` `)

  const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
  

    .setAuthor(`Westy • Kick Sistemi`,ayarlar.clientlogo)
    
  
  .setDescription(`\`${prefix}kick-yetkili ayarla <@rol>  |  ${prefix}kick-yetkili sıfırla\`\nKick komutunu kullanabilmeleri için kick yetkili rolü ayarlamanız gerekmektedir, rolü moderatörlerinize vereceğiniz rolü ayarlayınız. Başka bir rol ayarlamak için ise önce sıfırlayıp sonra tekrardan ayarlayabilirsiniz.\n\n\`${prefix}kick-log ayarla #kanal  |  ${prefix}kick-log sıfırla\`\nKick log ayarlama komutu birine kick atıldığında belirtilen kanala kick\'in detaylarını atar, başka bir kanalı ayarlamak istiyorsanız önce sıfırlayın sonra tekrar ayarlama yapın.\n\n\`${prefix}kick @kişi <sebep>\`\nAyarları yapmazsanız komut çalışmaz, kullanıcıları sunucudan atmanıza yarar.`)
  



.addField(`━━━━━━━━━━━━━━━━━━━━`,`[Destek](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `) 
 .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
    
  message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [`kick-sistemi`,`kicksistem`,`kick-sistem`],
  permLevel: 0,
}

exports.help = {
  name: `kicksistemi`
}