const Discord = require('discord.js');
const client = new Discord.Client();
const a = require('../ayarlar.json');
const DModule = require('@top-gg/sdk');





const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';

const OFFSET = '!'.charCodeAt(0);

const db = require('quick.db')
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
  .setColor(a.renk)
  .setAuthor('Westy • Yetki İzni',a.clientlogo)
  .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
  .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
  .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
  return message.author.send(yetkimesaj)
     .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
  }
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || a.prefix;
 
 const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
        if(args.length > 2000) return message.reply('<:westy_x:750094591138463774> **Mesaj 2000 Karakteri Geçemez!**')
    if (args.length < 1) {
        message.reply('**Döndürmem İçin Bir Mesaj Yazman Gerekiyor!**');
    }
const Mesaj = new Discord.MessageEmbed()
.setColor(a.renk)
.setAuthor('Westy • Mesaj Döndür',a.clientlogo)
.setTitle(`  ${args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')}`) 
message.channel.send(Mesaj);
} else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(a.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,a.clientlogo)
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
  name: 'mesajdöndür',
  description: 'Mesajınızı tersten yazar.',
  usage: 'mesajdöndür <mesaj>'
};
