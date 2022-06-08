  const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
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

  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
let data3 = await db.fetch(`mutekanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`:warning: **Mute Kanalını Bulamadım!** \`${prefix}mutesistemi\``)
let data2 = await db.fetch(`muteyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`:warning: **Mute Yetkilisi Rolü Ayarlı Değil!** \`${prefix}mute-yetkili ayarla/sıfırla\``)
let yetkili = message.guild.roles.cache.get(data2)
if(!yetkili) return message.channel.send(`:warning: **Mute Yetkilisi Ayarlı Değil!** \`${prefix}mute-yetkili ayarla/sıfırla\``)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`:warning: **Mute Kanalı Ayarlı Değil!** \`${prefix}mutesistemi\``)
       if (!message.member.roles.cache.has(`${yetkili.id}`)) return message.channel.send(`:warning: **Komutu Kullanabilmek için Ayarlanan Yetkili Rolüne Sahip Olman Gerekiyor!**`)
       if (!message.guild.members.cache.get('636202587648950303').hasPermission("MANAGE_ROLES")) return message.reply(`<:westy_x:750094591138463774> **Bu İşlemi Gerçekleştirebilmek İçin Rolleri Yönet İznine İhtiyacım Var!**`);
       const mod = message.author;
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(`:warning: **Birini Etiketlemelisin!**`)
    let reason = message.content.split(" ").slice(2).join(" ");


    if (!reason) reason = 'Sebep Belirtilmemiş'
    if(reason.length > 500) return message.reply('<:westy_x:750094591138463774> **Unmute Sebebi 500 Karakteri Geçemez!**')
  if (db.has(`muterole_${message.guild.id}`) == false) {
return message.channel.send(`**${ayarlar.wx} Mute Rolü Ayarlı Değil!**`)
}


 if (db.has(`muterole_${message.guild.id}`) == true) {
var rolid = db.fetch(`muterole_${message.guild.id}`)
let ekmuterol = message.guild.roles.cache.find(x => x.name === rolid.name)

    await member.roles.remove(ekmuterol);
}
    const muteembed = new Discord.MessageEmbed()
    .setDescription(`<@${member.id}> Kullanıcısının Susturulması, ${mod} Tarafından **${reason}** Sebebiyle Kaldırıldı <:westy_tik:750093746997166180>`)
    .setColor(ayarlar.renk)
    .setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/756208516469096509/giphy.gif')
        message.channel.send(muteembed)
  
   const mutelendi = new Discord.MessageEmbed()
  .setAuthor(message.author.tag,message.author.avatarURL({dynamic: true}))
  .setTitle(`${member.user.username} Kişisinin Susturması Kaldırıldı!\nKaldırılma Sebebi • ${reason}`)
.setDescription(`Komut **${message.channel.name}** Kanalında Kullanıldı`)
.setColor(ayarlar.renk)

.setFooter(`Susturması Kaldırılan Kişinin ID • ${member.id}`,member.user.avatarURL({dynamic: true}))
    .setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/747791390741627050/carklar.png')
 
kanal.send(mutelendi)
  
}


exports.conf = {
    aliases: [],
    permLevel: 0
};

module.exports.help = {
    name: "unmute",
    description: "Etiketlenen Kişiye Mute Atar",
    usage: "mute [kullanıcı] [sebep]"
}