const Discord = require('discord.js');
const moment = require('moment')
const talkedRecently = new Set();
const ayarlar = require('../ayarlar.json');



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
  if (!message.guild.members.cache.get('636202587648950303').hasPermission("BAN_MEMBERS")) return message.reply(`<:westy_x:750094591138463774> **Bu İşlemi Gerçekleştirebilmek İçin Üyeleri Yasakla İznine İhtiyacım Var!**`);
let db = require('quick.db')
 let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
let data2 = await db.fetch(`banyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`:warning: **Ban Yetkilisi Rolü Ayarlı Değil!** \`${prefix}ban-yetkili ayarla/sıfırla\``)
let data3 = await db.fetch(`bankanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`:warning: **Ban Kanalı Ayarlı Değil!** \`${prefix}ban-log ayarla/sıfırla\``)
let yetkili = message.guild.roles.cache.get(data2)
if(!yetkili) return message.channel.send(`:warning: **Ban Yetkilisi Ayarlı Değil!** \`${prefix}ban-yetkili ayarla/sıfırla\``)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`:warning: **Ban Kanalı Ayarlı Değil!** \`${prefix}ban-log ayarla/sıfırla\``)
  

   if (!message.member.roles.cache.has(`${yetkili.id}`)) return message.channel.send(`:warning: **Komutu Kullanabilmek için Ayarlanan Yetkili Rolüne Sahip Olman Gerekiyor!**`)
   let reason = args.slice(1).join(' ')
    
    if (!args[0]) return message.channel.send(`:warning: **Birini Etiketlemelisin!**`)
    let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.guild.members.cache.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
    if (!user.id) return message.channel.send(`:warning: **Aradığın Kişi Bu Sunucuda Bulunmuyor!**`)
    if (!user) return message.channel.send(`:warning: **Aradığın Kişi Bu Sunucuda Bulunmuyor!**`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`:warning: **Aradığın Kişi Bu Sunucuda Bulunmuyor!**`)
    if (member.id == message.author.id) return message.channel.send(`:warning: **Kendini Banlayamazsın!**`)
    if (member.id == message.guild.owner.id) return message.channel.send(`:warning: **Sunucu Sahibini Banlayamam!**`)
    if (member.roles.cache.has(`${yetkili.id}`)) return message.channel.send(`:warning: **Yetkili Rolü Olan Birini Banlayamam!**`)
    if (!reason) reason = 'Sebep Belirtilmemiş'
    if(reason.length > 500) return message.reply('<:westy_x:750094591138463774> **Ban Sebebi 500 Karakteri Geçemez!**')
let guild = message.guild
        guild.members.ban(user, { reason: reason });
               const muteembed = new Discord.MessageEmbed()
    .setDescription(`**${user.tag}** Kullanıcısı, **${message.author.tag}** Tarafından **${reason}** Sebebiyle Başarıyla Ban Çekiciyle Banlandı! <:westy_tik:750093746997166180>`)
    .setColor(ayarlar.renk)
    .setImage('https://cdn.discordapp.com/attachments/711338188861603940/756204419191799948/Westy_-_Banned.gif')
        message.channel.send(muteembed)
   const yasaklandı = new Discord.MessageEmbed()
.setAuthor(message.author.tag,message.author.avatarURL({dynamic: true}))
  .setTitle(`${user.username} Kişisi Banlandı!\nBanlanma Sebebi • ${reason}`)
.setDescription(`Komut **${message.channel.name}** Kanalında Kullanıldı`)
.setColor(ayarlar.renk)

.setFooter(`Banlanan Kişinin ID • ${user.id}`,user.avatarURL({dynamic: true}))
    .setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/747791390741627050/carklar.png')
 
kanal.send(yasaklandı)
   }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla', 'uçur'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Etiketlediğiniz kişiyi sebebi ile sunucudan banlar.',
	usage: 'ban kişi sebep',

};