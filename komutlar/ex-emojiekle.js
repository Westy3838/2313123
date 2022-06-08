const Discord = require('discord.js');
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
 if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(":no_entry: Bu komutu kullanabilmek için `Emojileri yönet` yetkisine sahip olmalısınız")
    let link = args[0]
    let isim = args[1];
    let guild = message.guild;
 
    if (!link) return message.channel.send('<:westy_x:750094591138463774> **Doğru Kullanım; w!emojiekle <link> <isim>**')
    if (!isim) return message.channel.send('<:westy_x:750094591138463774> **Doğru Kullanım; w!emojiekle <link> <isim>**')
    if(isim.length < 2) return message.channel.send('<:westy_x:750094591138463774> **Emoji En Az 2 Karakter Olmalı!**')
    if(isim.length > 32) return message.channel.send('**<:westy_x:750094591138463774> Emoji En Fazla 32 Karakter İçerebilir!**')

      

  const embed = new Discord.MessageEmbed()
 .setColor(ayarlar.renk)
  .setThumbnail(link)
.setAuthor(`${message.author.username} Bir Emoji Oluşturdu`,message.author.avatarURL({dynamic: true}))
.setDescription(`**Oluşturulan Emojinin Adı • ${isim}**`)
message.channel.send(embed) 
                                                                
await guild.emojis.create(`${link}`, `${isim}`).catch(error => {return message.channel.send(new Discord.MessageEmbed()
 .setColor(ayarlar.renk)
.setAuthor(`${message.author.username} Emoji Oluşturulamadı`,message.author.avatarURL())
.setDescription(`${ayarlar.wx} **GEÇERSİZ İŞLEM!**\nOlabilecek sorunlar;\nLink geçersiz, fotoğraf boyutu çok büyük, emoji slotları dolu.`))

                                   }  )
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['addemoji', 'emojioluştur','emoji-ekle'],
    permLevel: 0
}
exports.help = {
    name: 'emojiekle',
    description: 'Sunucuya emoji eklersiniz',
    usage: 'emojiekle <link> <isim>',
}  