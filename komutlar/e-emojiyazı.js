const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
 const DModule = require('@top-gg/sdk');
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
const { RichEmbed } = require('discord.js')
const db = require('quick.db')
exports.run = async (bot, message, args, client) => {
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




const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    'İ': ':regional_indicator_i:',
    'Ö': ':regional_indicator_o:',
    'ö': ':regional_indicator_o:',
    'Ş': ':regional_indicator_s:',
    'Ü': ':regional_indicator_u:',
    'Ç': ':regional_indicator_c:', 
    'ı': ':regional_indicator_i:', 
    'o': ':regional_indicator_o:',
    'ş': ':regional_indicator_s:',
    'ğ': ':regional_indicator_g:',
    'Ğ': ':regional_indicator_g:',
    'ü': ':regional_indicator_u:',
    'ç': ':regional_indicator_c:', 
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});



 const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 
 var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    if (ekontrol == "en") {  
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
if (!args[0]) return message.channel.send(`${ayarlar.wx} **You must specify a message!**`)


  		if (args[0].length > 50) return message.channel.send(`${ayarlar.wx} **You can use up to 50 letters!***`);
  const yazı = new Discord.MessageEmbed()
  .setAuthor('Westy • Emoji Text',ayarlar.clientlogo)
    .setDescription(` ${args.join(' ')
            .split('')
            .map(c => mapping[c] || c)
            .join('')}`)
  .setColor('#ffc21c')
       message.channel.send(yazı)
  
    
                  } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`You Must Vote To Use This Command (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
      }
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") return;
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
    if (!args[0]) return message.channel.send(`${ayarlar.wx} **Bir Mesaj Belirtmelisin!**`)

  		if (args[0].length > 50) return message.channel.send(`${ayarlar.wx} **En fazla 50 Harf Kullanabilirsiniz!**`);
  const yazı = new Discord.MessageEmbed()
  .setAuthor('Westy • Emoji Yazı',ayarlar.clientlogo)
    .setDescription(` ${args.join(' ')
            .split('')
            .map(c => mapping[c] || c)
            .join('')}`)
  .setColor('#ffc21c')
       message.channel.send(yazı)
  
    
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
  aliases: ['emojiyazısı', 'emojiyaz', 'emoji-yazı','emojitext','emoji-text'],
  permLevel: 0
};

exports.help = {
  name: 'emojiyazı',
  description: 'Mesajınızı emojiye çevirir.',
  usage: 'emojiyazı <mesaj>'
};
