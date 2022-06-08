const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
 const DModule = require('@top-gg/sdk');
exports.run = async (bot, message, args, client, params) => {
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

 const dbl = new DModule.Api(ayarlar.dbltoken) 
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      message.delete().catch(error => { console.log('Bir hata var')})

var mesaj = ['Koca Yürekli','Zengin Abimiz','Kafe Sahibi','Çay Açık Olmuş Ama Olsun','Çay Bok Gibi Ama Olsun','Omaygad','Çay Demli Olmuş Ama Olsun']
    var mesaj = mesaj[Math.floor(Math.random(1) * mesaj.length)]
      const sunucubilgi = new Discord.MessageEmbed()
    .setAuthor(`${mesaj} ` + message.author.username + ', Herkese Çay Ismarladı!',message.author.avatarURL())
    .setColor(ayarlar.renk)
  
		.setImage(`https://i.sozcu.com.tr/wp-content/uploads/2018/08/iecrop/cay_16_9_1533630396.jpg`)
    return message.channel.send(sunucubilgi);
    }
              } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'herkesebendençay',
  description: 'Herkeze Çay Verir',
  usage: 'herkesebendençay'
};
