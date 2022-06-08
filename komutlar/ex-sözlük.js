const Discord = require('discord.js');
const modül = require('sozluk-api');
const a = require('../ayarlar.json')
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
  .setColor(a.renk)
  .setAuthor('Westy • Yetki İzni',a.clientlogo)
  .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
  .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
  .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
  return message.author.send(yetkimesaj)
     .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
  }

if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/798122529016512542/lg.searching-for-loading-icon.gif')
.setAuthor('Westy • Sözlük',client.user.avatarURL())
.setTitle(`Hiçbir şey Aranıyor...`)
.setColor(a.renk))
.then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
  
.setAuthor('Westy • Sözlük',client.user.avatarURL())
.setTitle(`Ben Olmayan Bir Kelimeyi Nasıl Bulayım Arkadaşım?`)
.setThumbnail(client.user.avatarURL())
.setColor(a.renk)
)},3000))
let kelime = await modül.tdk(args[0]).catch(error => { return message.channel.send(new Discord.MessageEmbed()
.setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/798122529016512542/lg.searching-for-loading-icon.gif')
.setAuthor('Westy • Sözlük',client.user.avatarURL())
.setTitle(`${args[0]} Kelimesi Aranıyor...`)
.setColor(a.renk))
.then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
  
.setAuthor('Westy • Sözlük',client.user.avatarURL())
.setTitle(`Kelime Bulunamadı`)
.setThumbnail(client.user.avatarURL())
.setColor(a.renk)
)},3000))
}
  ) 

// EMBED

message.channel.send(new Discord.MessageEmbed()
.setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/798122529016512542/lg.searching-for-loading-icon.gif')
.setAuthor('Westy • Sözlük',client.user.avatarURL())
.setTitle(`${args[0]} Kelimesi Aranıyor...`)
.setColor(a.renk))
.then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(new Discord.MessageEmbed()
    .setThumbnail(client.user.avatarURL())
.setAuthor('Westy • Sözlük',client.user.avatarURL())
.setTitle(`Kelime • ${args[0]}`)
.addField('<:ayarlarsembol:778579074183725076> Anlam', kelime.anlam || 'Kelimenin Anlamı Bulunamadı')
.addField('<:ayarlarsembol:778579074183725076> Lisan', kelime.lisan || 'Kelimenin Lisanı Bulunamadı')
.setColor(a.renk)
.addField('<:ayarlarsembol:778579074183725076> Örnek', `${kelime.örnek || 'Örnek Bulunamadı'} -**${kelime.yazar || 'Yazar Bulunamadı'}**`)
.addField('<:ayarlarsembol:778579074183725076> Atasözü', kelime.atasozu || 'Kelimeyle İlgili Atasözü Bulunamadı'))},3000))


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sözlük','westysözlük'],
    permLevel: 0
}

exports.help = {
    name: 'westy-sözlük',
    description: "tdk'den kelime ararsınız",
    usage: 'tdk'
}
 