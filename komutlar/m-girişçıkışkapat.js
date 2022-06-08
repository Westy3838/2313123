const Discord = require("discord.js");
const fs = require("fs");
const ayarlar = require("../ayarlar.json");
 
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
  const db = require("quick.db"); 
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<:westy_x:750094591138463774> Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
    if (db.has(`sKanal_${message.guild.id}`) === true) {
      db.delete(`sKanal_${message.guild.id}`);
 
      if (db.has(`sayac_${message.guild.id}`) === true) {
        db.delete(`sayac_${message.guild.id}`);
        message.channel.send("**<:westy_tik:750093746997166180> Giriş Çıkış Sistemi Başarıyla Kapatıldı**");
        return;
      }
 
    }
    message.channel.send(`<:westy_x:750094591138463774> **Ayarlanmayan Birşeyi Kapatamam!**`);
    return;
  
};
 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["giriş-çıkış-kapat","girişçıkışkapat"],
  permLevel: 0
};
 
exports.help = {
  name: "girişçıkış-kapat",
  description: "Sayacı ayarlar.",
  usage: "saya-çayarla <sayı>"
};