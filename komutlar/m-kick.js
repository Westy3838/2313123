const Discord = require('discord.js');
const { RichEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db');
module.exports.run = async (bot, message, args, client) => {
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
let data3 = await db.fetch(`kickkanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`:warning: **Kick Kanalını Bulamadım!** \`w!kickistemi\``)
let data2 = await db.fetch(`kickyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`:warning: **Kick Yetkilisi Rolü Ayarlı Değil!** \`w!kick-yetkili ayarla/sıfırla\``)
let yetkili = message.guild.roles.cache.get(data2)
if(!yetkili) return message.channel.send(`:warning: **Kick Yetkilisi Ayarlı Değil!** \`w!kick-yetkili ayarla/sıfırla\``)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`:warning: **Kick Kanalı Ayarlı Değil!** \`w!kicksistemi\``)
       if (!message.member.roles.cache.has(`${yetkili.id}`)) return message.channel.send(`:warning: **Komutu Kullanabilmek için Ayarlanan Yetkili Rolüne Sahip Olman Gerekiyor!**`)
       if(!message.guild.me.permissions.has('KİCK_MEMBERS')) return message.channel.send('**Üyeleri kickleme iznimin olması gerekiyor.**')
       const mod = message.author;
      
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    let member = message.guild.member(user)
    if (user.id == message.author.id) return message.channel.send(`:warning: **Kendini Kickleyemezsin!**`)
    if (user.id == message.guild.owner.id) return message.channel.send(`:warning: **Sunucu Sahibini Kickleyemem!**`)
    if (!user) return message.channel.send(`:warning: **Birini Etiketlemelisin!**`)
    if (user.roles.cache.has(`${yetkili.id}`)) return message.channel.send(`:warning: **Yetkili Rolü Olan Birini Kickleyemem!**`)
    let reason = message.content.split(" ").slice(2).join(" ");
  if (!reason) reason = 'Sebep Belirtilmemiş'
  if(reason.length > 500) return message.reply('<:westy_x:750094591138463774> **Kick Sebebi 500 Karakteri Geçemez!**')

  
  

  


  
  
  message.guild.member(user).kick();
 const kick = new Discord.MessageEmbed()
    .setDescription(`<@${user.id}> Kullanıcısı, ${mod} Tarafından **${reason}** Sebebiyle Tekmelendi <:westy_tik:750093746997166180>`)
    .setColor(ayarlar.renk)
    .setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/756206864760569996/Westy_Kick.gif')
        message.channel.send(kick)
   const yasaklandı = new Discord.MessageEmbed()
.setAuthor(message.author.tag,message.author.avatarURL({dynamic: true}))
  .setTitle(`${user.user.username} Kişisi Kicklendi!\nKicklennme Sebebi • ${reason}`)
.setDescription(`Komut **${message.channel.name}** Kanalında Kullanıldı`)
.setColor(ayarlar.renk)

.setFooter(`Kicklenen Kişinin ID • ${user.id}`,user.user.avatarURL({dynamic: true}))
    .setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/747791390741627050/carklar.png')
 
kanal.send(yasaklandı)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick [kullanıcı] [sebep]'
};  