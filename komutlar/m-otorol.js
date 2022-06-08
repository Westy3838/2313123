
const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')
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
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('**:warning: Rolleri Yönetme İznine Sahip Değilsin!**')
  if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send(`${ayarlar.wx} **Rolleri Yönetme Yetkim Yok!**`)
    if(!args[0]) return message.channel.send(`${ayarlar.wx} **Birşeyleri Yanlış Yaptın!**\nDoğru Kullanım;\`${prefix}otorol kanal-ayarla/kanal-sıfırla/rol-ayarla/rol-sıfırla\``)
    if(args[0] === 'rol-ayarla') {
        var rol = message.mentions.roles.first()
        if(!rol) return message.channel.send(`${ayarlar.wx} **Bir Rol Etiketlemelisin!**`)
        db.set(`${message.guild.id}_otorol`, rol.id)
                const embed = new Discord.MessageEmbed()
        .setAuthor('Westy • Otorol Ayarlama',ayarlar.clientlogo)
                .setDescription(`**» Otorol Başarılı Bir Şekilde Ayarlandı ${ayarlar.wt}**\nAyarlanan Rol • ${rol}`)
                .setColor(ayarlar.renk)
                .setThumbnail(ayarlar.clientlogo)
                .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
      message.channel.send({embed})
    } else if(args[0] == 'rol-sıfırla') {
        if(!db.has(`${message.guild.id}_otorol`)) return message.channel.send(''); else {
            db.delete(`${message.guild.id}_otorol`)
            message.channel.send(`**Otorol Başarıyla Sıfırlandı!** ${ayarlar.wt}`)
        }
    } else if(args[0] === 'kanal-ayarla') {
        var kanal = message.mentions.channels.first()
        if(!kanal) return message.channel.send(`${ayarlar.wx} **Bir Kanal Etiketlemlisin!**`); else {
            db.set(`${message.guild.id}_otokanal`, kanal.id)
          
        const embed = new Discord.MessageEmbed()
        .setAuthor('Westy • Otorol Kanal Ayarlama',ayarlar.clientlogo)
                .setDescription(`**» Otorol Kanalı Başarılı Bir Şekilde Ayarlandı ${ayarlar.wt}**\nAyarlanan Kanal • ${kanal}`)
                .setColor(ayarlar.renk)
                .setThumbnail(ayarlar.clientlogo)
                .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
      message.channel.send({embed})
          
        }
    } else if(args[0] === 'kanal-sıfırla') {
        if(!db.has(`${message.guild.id}_otokanal`)) return message.channel.send(''); else {
            db.delete(`${message.guild.id}_otokanal`)
            message.channel.send(`**Otorol Kanalı Başarıyla Sıfırlandı!** ${ayarlar.wt}`)
        }
    }
}
exports.conf = {
    aliases: ['oto-rol']
}
exports.help = {
    name: "otorol"
}