const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, params, args) => {
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
     if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':warning: **Bu Komutu Kullanabilmek İçin** ``SUNUCUYU YÖNET`` **İznine Sahip Olmalısın!**')
     let otoTagkanal = message.mentions.channels.first();
     if (!otoTagkanal) return message.channel.send(':warning: **Bir Kanal Etiketlemelisin!**')
     db.set(`ototagKanal_${message.guild.id}`, message.mentions.channels.first().id)
     let i = await db.fetch(`ototagKanal_${message.guild.id}`)
            	  	  const embed = new Discord.MessageEmbed()
.setAuthor('Westy • Tag Ayarlama Sistemi',ayarlar.clientlogo)
                .setDescription(`**» Tag Kanalı Başarılı Bir Şekilde Ayarlandı <a:basarili:647509263199240213>**\nAyarlanan Tag Kanalı • <#${i}>`)
                .setColor(ayarlar.renk)
                .setThumbnail(ayarlar.clientlogo)
                .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
      message.channel.send(embed)
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'ototagkanal',
 description: 'neblm',
 usage: 'ototagkanal'
};