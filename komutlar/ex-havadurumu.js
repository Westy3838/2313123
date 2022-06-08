const Discord = require('discord.js');
const weather = require('weather-js');
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
 
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
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
 message.channel.send(new Discord.MessageEmbed().setDescription('<:westy_x:750094591138463774> **Bir Şehir Girmelisin!**').setColor(ayarlar.renk));
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
   
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${current.skytext}**`) 
      .setTimestamp()
      .setAuthor(`${current.observationpoint || 'Bilinmiyor'} • Hava Durumu`,ayarlar.clientlogo)
      .setThumbnail(current.imageUrl || 'Bilinmiyor')
      .setColor(ayarlar.renk) 
      .addField(':sunny: Sıcaklık',`${current.temperature || 'Bilinmiyor'} Derece`)
     
      .addField(':cloud_tornado: Rüzgar',current.winddisplay)
      .addField(':timer: Rüzgar Hızı',current.windspeed)
      .addField(':cyclone: Nem', `${current.humidity}%`)
      message.channel.send(embed);
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hava', 'Havadurumu'],
  permLevel: "0"
};

exports.help = {
  name: "havadurumu",
  description: "hava durumunu gösterir",
  usage: "havadurumu"
};