const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args, member) => {
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
     if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':warning: **Bu Komutu Kullanabilmek İçin** ``SUNUCUYU YÖNET`` İznine Sahip Olmalısın!**') 
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
  let otorol = db.fetch(`ototag_${message.guild.id}`)
  
  if(!otorol) {
      message.channel.send(`:question: **Ayarlanmayan Birşeyi Neden Kapatmaya Çalışıyorsun**`)
      return
    } 
    db.delete(`ototag_${message.guild.id}`)
    db.delete(`ototagKanal_${message.guild.id}`)
    message.channel.send(`**Ototag Sistemi Başarıyla Kapatıldı!** <a:basarili:647509263199240213>`)
		  	  
}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ototag kapat'],
  permLevel: 0
};

exports.help = {
  name: 'ototagkapat',
  description: 'nblm',
  usage: 'ototag'
};