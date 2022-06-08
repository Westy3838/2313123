
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
  const DModule = require('@top-gg/sdk');
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
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

 const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 
  var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    if (ekontrol == "en") {
 dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
    let mesaj = message.mentions.users.first();
   if (mesaj.length < 1) return message.reply('**:warning: You have to write an text!**');
    if(mesaj.length > 1024) return message.reply(':westy_x: **Message cannot exceed 1024 characters!**')
var büyü = ['You turned into a frog!','Your memory has been erased!','You turned to Trump!','You were sent back in time!','Can\'t be, you\'re cloned','He wears headphones in you ear and he plays Elanur Pat','He sent you to prison.','Her wand didn\'t work, you\'re lucky!']
    var büyü = büyü[Math.floor(Math.random(1) * büyü.length)]
message.delete()
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} Made A Magic!`,message.author.avatarURL())
    .setColor(ayarlar.renk)
    .setDescription(`**${mesaj}, ${büyü} :man_mage:**`)
    .setImage(`https://cdn.discordapp.com/attachments/553882883207462920/764479226920435722/Buyu.gif`)
	
    return message.channel.send(embed);
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
    let mesaj = message.mentions.users.first();
    if (!mesaj) return message.reply('**:warning: Birini Etiketlemelisin!**');
    if(mesaj.length > 1024) return message.reply('<:westy_x:750094591138463774> **Büyü Mesajın 1024 Karakteri Geçemez!**')
var büyü = ['Kurbağaya Çevirdi!','Hafızanı Sildi!','Seni Erdoğan\'a Çevirdi!','Seni Zamanda Geriye Yolladı!','Olamaz, Seni Klonladı!','Kulağına Kulaklık Takıp Elanur Pat Dinletiyor!','Seni Silivri Ceza Evi\'ne Gönderdi.\nUpss, Orası Soğuk Değil Mi?','Asası Çalışmadı Şanslısın!']
    var büyü = büyü[Math.floor(Math.random(1) * büyü.length)]
message.delete()
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} Bir Büyü Yaptı!`,message.author.avatarURL())
    .setColor(ayarlar.renk)
    .setDescription(`**${mesaj}, ${büyü} :man_mage:**`)
    .setImage(`https://cdn.discordapp.com/attachments/553882883207462920/764479226920435722/Buyu.gif`)
	
    return message.channel.send(embed);
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
  aliases: ['abrakadabra'],
  permLevel: 0
};

exports.help = {
  name: 'büyü',
  description: 'İstediğiniz Kişiye Çekiç Atarsınız.',
  usage: 'alkış'
};