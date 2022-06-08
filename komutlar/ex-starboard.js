const Discord = require('discord.js');
const db = require('quick.db');
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
   let data3 = await db.fetch(`starboardkanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`${ayarlar.wx} **Starboard Kanalını Bulamadım!** \`w!starboard-kanal ayarla\``)
   let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`${ayarlar.wx} **Starboard Ayarlı Değil!** \`w!starboard-kanal ayarla\``)
 

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.send(`${ayarlar.wx} **Bir Yazı Yazmalısın!**`)

   const asd = new Discord.MessageEmbed()
   .setTitle('Starboard Sistemi')
   .setDescription('Yıldız puanlaman başarıyla kanala iletildi.')
   .setColor(ayarlar.renk)
   message.channel.send(asd)
     kanal.send(

       new Discord.MessageEmbed()

       .setColor(ayarlar.renk)
       .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      
       .setTimestamp()
       .setFooter('Westy • Starboard Sistemi')
        .setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/781791792387325962/yildiz.png')
       .setDescription
(`${question}`)).then(function(message) {

         message.react('⭐');


       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['starboard','st','yt','yıldızt','ytahtası','yıldız'],

  permLevel: 0
};

exports.help = {
  name: 'yıldıztahtası',
  description: 'Yıldız tahtası oluşturur.',
  usage: 'w!yıldıztahtası <yazı>'
};