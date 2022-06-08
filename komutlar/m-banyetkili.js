const Discord = require('discord.js')
const db = require('quick.db');
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
  
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`:warning: **Komutu Kullanabilmek için** \`SUNUCUYU YÖNET\` **Yetkisine Sahip Olman Gerekiyor!**`)
    if (!args[0]) return message.reply(`:warning: **Sanırım Birşeyleri Yanlış Yaptın!**\n**Doğru Kullanım; ${prefix}ban-yetkili ayarla/sıfırla #kanal**`)
    if (args[0] == 'ayarla') {
 let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.join(' '))
  let newRole;
  let tworole;
  if (!rol) return message.channel.send(`:warning: **Bir Rol Etiketlemelisin!**`)
  else newRole = message.mentions.roles.first().id
  let id = message.mentions.roles.first().id  
    db.set(`banyetkilisi_${message.guild.id}`, id)
  let banrol = await db.set(`banyetkilisi_${message.guild.id}`, newRole)
  if (!message.guild.roles.cache.get(newRole)) return message.channel.send(`:warning: **Etiketlediğin Rolü Bulamadım!**`)
      
    const embed = new Discord.MessageEmbed()
  .setAuthor('Westy •  Ban Sistemi'  ,ayarlar.clientlogo)
  .setDescription(`**» Ban Yetkili Rolü Başarılı Bir Şekilde Ayarlandı <a:basarili:647509263199240213>**\nAyarlanan Yetkili Rolü • <@&${newRole}>`)
  .setColor(ayarlar.renk)   
    .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic:true}))
     .setTimestamp()
  message.channel.send(embed)
  } 

  if (args[0] == 'sıfırla') {
    
    
    db.delete(`banyetkilisi_${message.guild.id}`)

    message.channel.send(`**Ban Yetkili Rolü Başarıyla Sıfırlandı! <a:basarili:647509263199240213>**\n**Ayarlamak için;** ${prefix}ban-yetkili ayarla`)
  }
};
  
  
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['banyetkilisi','ban-yetkilisi'],
 permLevel: 0
};

exports.help = {
 name: 'ban-yetkili',
 description: '+ban komutunu hangi role sahip olanların kullanacağını ayarlarsınız.',
 usage: 'ban-yetkilisi ayarla @rol',

};