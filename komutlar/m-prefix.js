const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
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
    let p = args[0];
    
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${ayarlar.wx} Bu Komutu Kullanabilmek İçin **Sunucuyu Yönet** Yetkisine Sahip Olmalısın!`) 
    if(!p) return message.reply(`${ayarlar.wx} **Yeni Bir Prefix Yaz!**`)
    if (args[0] === 'sıfırla') {
        
        if (db.has(`prefix_${message.guild.id}`) === false) return message.reply(`${ayarlar.wx} **Prefix Ayarlanmamış, Sıfırlayamazsın!**`)
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${ayarlar.wx} Bu Komutu Kullanabilmek İçin **Sunucuyu Yönet** Yetkisine Sahip Olmalısın!`) 
        db.delete(`prefix_${message.guild.id}`)
      
        message.channel.send(`${ayarlar.wt} **Prefix Başarıyla Sıfırlandı!**`)
  
    } else {
        
         if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${ayarlar.wx} Bu Komutu Kullanabilmek İçin **Sunuuyu Yönet** Yetkisine Sahip Olmalısın!`) 
           if(!p) return message.reply(`${ayarlar.wx} **Yeni Bir Prefix Yaz!**`)
        if (p.length > 4) return message.reply(`${ayarlar.wx} **Prefix 4 Karakterden Fazla Uzun Olamaz!**`)
         
        db.delete(`prefix_${message.guild.id}`)
        db.set(`prefix_${message.guild.id}`, p)
        message.channel.send(`**Yeni Prefix ${args[0]} Olarak Ayarlandı!** ${ayarlar.wt}`)

  }

};

exports.conf = {
  aliases: ['set-prefix']
};

exports.help = {
  name: 'prefix'
};
