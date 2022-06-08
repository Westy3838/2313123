const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const DModule = require('@top-gg/sdk');
const db = require('quick.db')
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
  
const dbl = new DModule.Api(ayarlar.dbltoken) 
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    if (ekontrol == "en") {

  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('**:warning: You have to write an text!**');
    if(mesaj.length > 1024) return message.reply(':westy_x: **Message cannot exceed 1024 characters!**')
message.delete()
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`,message.author.avatarURL())
    .setColor(ayarlar.renk)
    .setDescription(`** ${mesaj} ` +' Bravo, Clap :clap: **')
    .setImage(`https://thumbs.gfycat.com/WarpedAdmiredCormorant-size_restricted.gif`)
	
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
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('** :warning: Bir Yazı Yazmalısın!**');
    if(mesaj.length > 1024) return message.reply('<:westy_x:750094591138463774> **Alkış Mesajın 1024 Karakteri Geçemez!**')
message.delete()
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`,message.author.avatarURL())
    .setColor(ayarlar.renk)
    .setDescription(`** ${mesaj} ` +' Bravo, Alkış :clap: **')
    .setImage(`https://thumbs.gfycat.com/WarpedAdmiredCormorant-size_restricted.gif`)
	
    return message.channel.send(embed);
             } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['clap'],
  permLevel: 0
};

exports.help = {
  name: 'alkış',
  description: 'İstediğiniz Kişiye Çekiç Atarsınız.',
  usage: 'alkış'
};