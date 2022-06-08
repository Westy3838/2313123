const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const client = new Discord.Client();
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
 
 const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
  
      var espriler = ['**Kırmızı •** :heart:','**Mavi •**:blue_heart:','**Beyaz •** :white_heart:','**Siyah •** :black_heart:','**Sarı •** :yellow_heart:','**Mor •** :purple_heart:','**Yeşil •** :green_heart:','**Turuncu •** :orange_heart:','**Kahverengi •** :brown_heart:']; 
      var espri = espriler[Math.floor(Math.random() * espriler.length)];
const renk = new Discord.MessageEmbed()
.setTitle('Sağlam Kaynaktan Aldığım Bilgilere Göre')
.setDescription(`**Şanslı Rengin** ${espri}`)
.setColor(ayarlar.renk)
message.channel.send(renk)
 
              } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rastgele-renk', 'renk-seç', 'seç-renk', 'seçbi-renk'],
  permLevel: 0
};

exports.help = {
  name: 'şanslırengim',
  description: 'Espri yapar.',
  usage: 'rastgele-renk'
}; 