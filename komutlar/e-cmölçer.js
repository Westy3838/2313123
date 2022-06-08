const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const DModule = require('@top-gg/sdk');
exports.run = (client, message) => {
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

  const dbl = new DModule.Api(ayarlar.dbltoken)
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
      const random = Math.floor(Math.random() * 30) + 1
         var gem = ['Baya Uzun','Reis Naptın Ya','Kısa Be','Dağları Deler','Vay Be, Uzunmuş']
     var gem = gem[Math.floor(Math.random(1) * gem.length)]
      const embed = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setAuthor(`Malafatınız ${random}cm `)
      .setDescription(`**${gem}  :straight_ruler: **`)
        
      message.channel.send({embed})
      } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor("Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (\w!vote\)",client.user.avatarURL)
        message.channel.send(Mesaj)
      }
  })
   } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['cm-ölçer'],
 permLevel: 0
}
exports.help = {
 name: 'cmölçer',
 description: 'EfkarÄ±nÄ±zÄ± Ã–lÃ§er ',
 usage: 'efkarölçer'
};
