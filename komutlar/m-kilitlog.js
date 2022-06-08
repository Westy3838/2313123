
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
    if (!args[0]) return message.reply(`:warning: **Sanırım Birşeyleri Yanlış Yaptın!**\n**Doğru Kullanım; ${prefix}kilit-kanal ayarla/sıfırla #kanal`)
    if (args[0] == 'ayarla') {
 let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args.join(' '))
  if (!kanal) return message.channel.send(`:warning: **Bir Kanal Etiketlemelisin!**`)
    db.set(`kilitkanal_${message.guild.id}`, kanal.id)
  let kilitkanal = await db.set(`kilitkanal_${message.guild.id}`, kanal.id)
  
    const embed = new Discord.MessageEmbed()
  .setAuthor('Westy •  Kilit Sistemi'  ,ayarlar.clientlogo)
  .setDescription(`**» Kilit Kanalı Başarılı Bir Şekilde Ayarlandı <a:basarili:647509263199240213>**\nAyarlanan Kanal • ${kanal}`)
  .setColor(ayarlar.renk)   
    .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic:true}))
     .setTimestamp()
  message.channel.send(embed)
  } 
  

  if (args[0] == 'sıfırla') {
    

    
    
    db.delete(`kilitkanal_${message.guild.id}`)

    message.channel.send(`**Ayarlanan Ban Logu Başarıyla Sıfırlandı! <a:basarili:647509263199240213>**\n**Ayarlamak için;** ${prefix}kilit-kanal ayarla`)
  }
};
  
  
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['kilitkanal', 'kilitlog', 'kilit-log'],
 permLevel: 0
};

exports.help = {
 name: 'kilit-kanal',
 description: 'Birisi banulunca hangi kanala mesaj gideceğini ayarlarsınız.',
 usage: 'ban-kanal ayarla/sıfırla #kanal',

};