const Discord = require('discord.js');
const fs = require('fs');

var ayarlar = require('../ayarlar.json');

exports.run = async (client, message) => {
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
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);

  const db = require('quick.db');
  

  
    let args = message.content.split(' ').slice(1);
    const secenekler = args.slice(0).join(' ');

    if(secenekler.length < 1)  return message.reply(":warning: **aç ya da kapat yazmalısın!**");
    //if(secenekler === "aç" || "kapat") return message.channel.send(errembed);

  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off")  return message.reply()

    if (secenekler === "aç" || secenekler === "on") {
        
    var i = db.set(`ksistem_${message.guild.id}`, "acik")
    
        message.channel.send(("!", "") + `${i.replace("acik", "**Kayıt Sistemi Komutları Artık Kullanılabilir!**")}`)
    
 
    };

    if (secenekler === "kapat") {
    
    db.delete(`ksistem_${message.guild.id}`)
    
        message.channel.send("**Kayıt Sistemi Kapatıldı Artık Komutlarıda Kullanılamaz!**")
    

  }
    };

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['kayıt-sistemi'],
        permLevel: 0
      };
      
    exports.help = {
        name: 'kayıtsistemi',
        description: 'kayıt sistemi işte.',
        usage: 'kayıtsistemi <aç/kapat>',
    };