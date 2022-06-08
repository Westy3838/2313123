const Discord = require('discord.js')
 const a = require('../ayarlar.json')
const db = require('quick.db')
exports.run = async (client ,message, args) =>{

  const perms  = [
    "SEND_MESSAGES"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme"
  };
  
  const notHavedPerms = perms.filter(perm => !message.channel.permissionsFor(message.guild.me).has(perm))
  
  if (notHavedPerms.length) {  
  const yetkimesaj = new Discord.MessageEmbed()
  .setColor(a.renk)
  .setAuthor('Westy • Yetki İzni',a.clientlogo)
  .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
  .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
  .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
  return message.author.send(yetkimesaj)
     .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
  }

      var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") {


let embed = new Discord.MessageEmbed()
  .setTitle(`:bell: Ping`)
    .setDescription(`Bot Delay **• ${client.ws.ping}ms**`)
    .setColor(a.renk)
   .setThumbnail('https://cdn.discordapp.com/emojis/773234698284433470.gif')
   
   message.channel.send(embed); 
}
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") return;
    let embed = new Discord.MessageEmbed()
  .setTitle(`:bell: Ping`)
    .setDescription(`Bot Gecikmesi **• ${client.ws.ping}ms**`)
    .setColor(a.renk)
   .setThumbnail('https://cdn.discordapp.com/emojis/773234698284433470.gif')
   
   message.channel.send(embed); 
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['ping'],
 permLevel: 0
};
 
exports.help = {
 name: 'ping',
 description: 'Botun Pingine Bakarsın',
 usage: '!ping'
};
 