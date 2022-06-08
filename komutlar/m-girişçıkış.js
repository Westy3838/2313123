const Discord = require("discord.js");
const fs = require("fs");
var ayarlar = require('../ayarlar.json');
 
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
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<:westy_x:750094591138463774> Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  const db = require("quick.db");
 let hedef = args[1]
  let channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args.slice(0).join(" "));
 let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
 
  if (!channel) {
    return message.reply("<:westy_x:750094591138463774> **Bir Kanal Belirtmelisin!**");
  }
 
if (!hedef) {
    return message.reply("<:westy_x:750094591138463774> **Lütfen Bir Hedef Gir!**");
  }
 
 
  if (isNaN(hedef)) {
    return message.reply("<:westy_x:750094591138463774> **Sayı Yazmalısın!**");
  }
 
  if (hedef <= message.guild.memberCount) {
   
    return message.reply("<:westy_x:750094591138463774> Sunucu Sayından Yüksek Bir Hedef Olmalı!" );
  }
 
  db.set(`sKanal_${message.guild.id}`, channel.id);
 db.set(`sayac_${message.guild.id}`,hedef);
   const embed = new Discord.MessageEmbed()
        .setAuthor('Westy • Giriş Çıkış Sistemi',ayarlar.clientlogo)
                .setDescription(`**• Giriş Çıkış Kanalı ve Hedefi Başarılı Bir Şekilde Ayarlandı ${ayarlar.wt}**\nGiriş Çıkış Kanal • ${channel}\nGiriş Çıkış Hedef • \`${hedef}\``)
                .setColor(ayarlar.renk)
                .setThumbnail(ayarlar.clientlogo)
                .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
      message.channel.send(embed)
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["giriş-çıkış", "girişçıkış"],
  permLevel: 0
};
 
exports.help = {
  name: "girişçıkış",
  description: "Sayaç kanalını ayarlar.",
  usage: "sayaç-kanal-ayarla <#kanal>"
};