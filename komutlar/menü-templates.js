const Discord = require(`discord.js`)
const ayarlar = require(`../ayarlar.json`)
const DModule = require('@top-gg/sdk');
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

const dbl = new DModule.Api(ayarlar.dbltoken) 
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
  const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
  

    .setAuthor(`Westy • Hazır Şablonlar`,client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
.setURL('https://www.youtube.com/watch?v=uLArDymEzFk')
.setTitle('Tanıtım Videosu için Tıkla')
.addField('🚀 Classic Template','[Şablonu Kurmak İçin Tıkla](https://discord.new/yzSb4EsKVAKH)')
.addField('🎮 Gaming Template','[Şablonu Kurmak İçin Tıkla](https://discord.new/nnYMK7jDAujH)')
.addField('🎲 Classic Gaming Template','[Şablonu Kurmak İçin Tıkla](https://discord.new/ZJ7F5pncq9Y3)')
.addField('🤖 Support Template','[Şablonu Kurmak İçin Tıkla](https://discord.new/XKcZMYHc8tvu)')

.setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
.addField(`━━━━━━━━━━━━━━━━━━━━`,`[Destek](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `) 

   
  message.channel.send(Mesaj)
           } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [`templates`,`şablon`,`şablonlar`],
  permLevel: 0,
}

exports.help = {
  name: `template`
}