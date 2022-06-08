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
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`:warning: **Bu Komutu Kullanabilmek için** \`Sunucuyu Yönet\` **Yetkisine Sahip Olmalısın!**`)
    if (!args[0]) return message.reply(`:warning: **Sanırım Birşeyleri Yanlış Yaptın!**\n**Doğru Kullanım; ${prefix}!mute-log ayarla/sıfırla #kanal**`)
    if (args[0] == 'ayarla') {
 let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args.join(' '))
  if (!kanal) return message.channel.send(`:warning: **Bir Kanal Etiketlemelisin!**`)
    db.set(`mutekanal_${message.guild.id}`, kanal.id)
  let mutekanal = await db.set(`mutekanal_${message.guild.id}`, kanal.id)
  
    const embed = new Discord.MessageEmbed()
  .setAuthor('Westy •  Mute Sistemi'  ,client.user.avatarURL({dynamic: true}))
  .setDescription(`**» Mute Logu Başarılı Bir Şekilde Ayarlandı <a:basarili:647509263199240213>**\nAyarlanan Log • ${kanal}`)
  .setColor(ayarlar.renk)   
    .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic: true}))
     .setTimestamp()
  message.channel.send(embed)
  } 
  

  if (args[0] == 'sıfırla') {
    

    
    
    db.delete(`mutekanal_${message.guild.id}`)

    message.channel.send(`**Ayarlanan Mute Logu Başarıyla Sıfırlandı! <a:basarili:647509263199240213>**\n**Ayarlamak için;** w!mute-log ayarla`)
  }
};
  
  
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['mutelog'
          ],
 permLevel: 0
};

exports.help = {
 name: 'mute-log',
 description: 'Birisi mutelenince hangi kanala mesaj gideceğini ayarlarsınız.',
 usage: 'mutelog ayarla/sıfırla #kanal',
};