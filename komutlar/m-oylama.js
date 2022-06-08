const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
 exports.run = (client, message, args) => {
  const perms  = [
    "SEND_MESSAGES",
    "ADD_REACTIONS"
   
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme",
    ADD_REACTIONS: "• Tepki Ekleme"
    
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
   if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`Bu Komutu Kullanabilmek İçin **Sunucuyu Yönet** İznine Sahip Olmalısın!`)
   const no = "719220904130904145"
   const tik = "719220886053584896"
   
   message.delete();

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.send(

     new Discord.MessageEmbed()
      .setColor('#07afe3')
      .setTitle(`:warning: **Bir Yazı Yazman Gerekli!**`))
     if(question.length > 1024) return message.reply(":warning: **Yazma Sınırı 1024 Karakterdir.**")
     message.channel.send(

       new Discord.MessageEmbed()
       .setAuthor('Westy • Oylama Sistemi',message.guild.iconURL())
       .setColor(ayarlar.renk)
       .setThumbnail('https://cdn.discordapp.com/attachments/640287918623162449/644956122905706497/SecondhandSilverBinturong-size_restricted.gif')
       .setTimestamp()
       .setFooter(message.author.username + '#' + message.author.discriminator,message.author.avatarURL())

       .addField(`**Tepkimeleri Kullanarak Oyla!**\n━━━━━━━━━━━━━━━━━`, `${question}`)).then(function(message) {
         
         message.react(`${tik}`);
         message.react(`${no}`);
         
         

       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: [],
       permLevel: 0
};

exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.',
  usage: 'w!oylama <oylamaismi>'
};