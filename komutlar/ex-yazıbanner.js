const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
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
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`${ayarlar.wx} **Bir Yazı Yazmalısın!**`)
  const linqo = `https://dummyimage.com/2000x500/33363c/ffffff&text=${yazi}`
  .replace(' ', '+')
if(yazi.length > 20) return message.channel.send(`${ayarlar.wx} Karakter sayısı 20'yi geçmemeli!`)
  const embed = new Discord.MessageEmbed()
  
  .setColor(ayarlar.renk)
  .setImage(linqo)
  
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'yazıbanner',
    description: 'Yazdığınız yazıyı bannera çevirir.',
    usage: 'yazıbanner <yazı>'
};