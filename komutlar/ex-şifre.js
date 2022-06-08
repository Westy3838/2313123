  const Discord = require('discord.js');
const generator = require('generate-password');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
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
    var uzunluk = args.slice(0).join(' ');

    if (!uzunluk) return message.reply(`${ayarlar.wx} **Doğru Kullanım**: w!şifre <karakter>`)

  if (isNaN(uzunluk)) return message.channel.send('<:westy_x:750094591138463774> **Bir Sayı Yazmalısın!**');
    var password = generator.generate({
        length: uzunluk,
        numbers: true,
    })
if(password.length > 32) return message.reply(`${ayarlar.wx} **Şifre Maksimum 32 Karakter Olabilir!**`)
    message.channel.send(`**Şifren Hazır!**\n\`${password}\``);
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'şifre', 
  description: 'Rastgele bir şifre oluşturur.',
  usage: 'şifre <uzunluk>'
};
