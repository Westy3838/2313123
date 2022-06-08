const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db');
exports.run = async (client, message, args) => {
  const perms  = [
    "SEND_MESSAGES",
    "MANAGE_CHANNELS"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme",
    MANAGE_CHANNELS: "• Kanalı Yönet"
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
  let reason = message.content.split(" ").slice(1).join(" ");
  if(reason.length > 100) return message.channel.send(`${ayarlar.wx} **Sebep Mesajı 100 Karakteri Geçemez!**`)
let data3 = await db.fetch(`kilitkanal_${message.guild.id}`)
if(!data3) return message.channel.send(`:warning: **Kilit Log'unu Bulamadım! ${prefix}kilit-log ayarla #kanal**`)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`:warning: **Kilit Log'u Ayarlı Değil! ${prefix}kilit-log ayarla #kanal**`)
if (!reason) reason = 'Sebep Belirtilmemiş'
  let every = message.guild.roles.cache.find(r => r.name === '@everyone')
   if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(`**Bu Komutu Kullanabilmek için** \`Kanalları Yönet\` **Yetkisine Sahip Olmalısın!**`)
message.channel.updateOverwrite(every, {
  SEND_MESSAGES: false
 
})
 

   const embed = new Discord.MessageEmbed()
        .setAuthor('Westy • Kanal Kilitleme Sistemi',ayarlar.clientlogo)
                .setDescription(`Kanal Durumu **• Yazılamaz** :lock:\nKilitlenme Sebebi **• ${reason}**`)
                .setColor(ayarlar.renk)
                .setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/780771279849652244/1f512.png')
                .setFooter(`${message.author.username}`, message.author.avatarURL())
                .setTimestamp()
      message.channel.send(embed)
const yasaklandı = new Discord.MessageEmbed()
.setAuthor(message.author.tag,message.author.avatarURL({dynamic: true}))
.setTitle(`${message.author.username} Kanalı Kilitledi\nKilitlenme Sebebi • ${reason}`)
.setDescription(` **${message.channel.name}** Kanalı Kilitlendi`)
.setColor(ayarlar.renk)
  
.setFooter(`Kilitleyen Kişinin ID • ${message.author.id}`,message.author.avatarURL({dynamic: true}))
    .setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/747791390741627050/carklar.png')
 
kanal.send(yasaklandı)

}




 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kilit','lock'],
  permLevel: 0
};

exports.help = {
  name: 'kilitle',
  description: 'Sohbetinizi kapatmaya yarar.',
  usage: 'w!kilitle'
};