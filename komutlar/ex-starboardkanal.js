const Discord = require('discord.js')
const db = require('quick.db');
const { RichEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
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
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**Bu Komutu Kullanabilmek için** \`Sunucuyu Yönet\` **Yetkisine Sahip Olmalısın!**`)
    if (!args[0]) return message.reply(`${ayarlar.wx} **Sanırım Birşeyleri Yanlış Yaptın!**\n**Doğru Kullanım; w!starboardkanal ayarla/sıfırla #kanal**`)
    if (args[0] == 'ayarla') {
 let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args.join(' '))
  if (!kanal) return message.channel.send(`${ayarlar.wx} **Bir Kanal Etiketlemelisin!**`)
    db.set(`starboardkanal_${message.guild.id}`, kanal.id)
  let starboardkanal = await db.set(`starboardkanal_${message.guild.id}`, kanal.id)
  
    const embed = new Discord.MessageEmbed()
  .setAuthor('Westy •  Starboard Sistemi'  ,'https://cdn.discordapp.com/avatars/636202587648950303/e634aa7a8dc92156ae2684812fd960fd.png?size=2048')
  .setDescription(`**» Starboard Kanalı Başarılı Bir Şekilde Ayarlandı <a:basarili:647509263199240213>**\nAyarlanan Log • ${kanal}`)
  .setColor(ayarlar.renk)   
    .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL())
     .setTimestamp()
  message.channel.send(embed)
  } 
  

  if (args[0] == 'sıfırla') {
    

    
    
    db.delete(`starboardkanal_${message.guild.id}`)

    message.channel.send(`${ayarlar.wt}**Ayarlanan Starboard Kanalı Başarıyla Sıfırlandı! <a:basarili:647509263199240213>**\n**Ayarlamak için;** w!starboardkanal ayarla`)
  }
};
  
  
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['starboardkanal'],
 permLevel: 0
};

exports.help = {
 name: 'starboard-kanal',
 description: '',
 usage: '',
};