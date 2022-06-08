const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args, member) => {
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
  if(!message.guild.me.permissions.has('MANAGE_NICKNAMES')) return message.channel.send(`${ayarlar.wx} Kulalnıcı İsimlerini Yönet Yetkisine İhtiyacım Var!`)
     if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':warning:** Bu komutu kullanabilmek için** `Sunucuyu Yönet` **yetkisine sahip olmalısın!**') 
     let mesaj = args.join(' ');
     if(mesaj.length > 4) return message.channel.send('<:westy_x:750094591138463774> **Tag 4 Karakteri Geçemez!**')
     if (!mesaj) return message.channel.send(":warning: **Bir Tag Belirtmelisin!**"); 
  

db.set(`ototag_${message.guild.id}`, mesaj)
	  	  const embed = new Discord.MessageEmbed()
        
         .setAuthor('Westy • Tag Ayarlama Sistemi',ayarlar.clientlogo)
  .setDescription(`**» Tag Başarılı Bir Şekilde Ayarlandı <a:basarili:647509263199240213>**\nAyarlanan Tag • \`${mesaj}\``)
       .setColor(ayarlar.renk)
                .setThumbnail(ayarlar.clientlogo)
                .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
      message.channel.send(embed)

}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ototag',
  description: 'nblm',
  usage: 'ototag'
};