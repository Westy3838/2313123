const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
  const perms  = [
    "SEND_MESSAGES",
    "MANAGE_CHANNELS"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme",
    MANAGE_CHANNELS: "• Kanalı Yönet"
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
let data3 = await db.fetch(`kilitkanal_${message.guild.id}`)
if(!data3) return message.channel.send(`:warning: **Kilit Log'unu Bulamadım!**`)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`:warning: **Kilit Log'u Ayarlı Değil!**`)
  let every = message.guild.roles.cache.find(r => r.name === '@everyone')
   if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`**Bu Komutu Kullanabilmek için** \`Kanalları Yönet\` **Yetkisine Sahip Olmalısın!**`)
message.channel.updateOverwrite(every, {
  'SEND_MESSAGES': null,
 
})
 

   const embed = new Discord.MessageEmbed()
        .setAuthor('Westy • Kanal Kilitleme Sistemi',ayarlar.clientlogo)
                .setDescription(`Kanal Durumu **• Yazılabilir** :unlock:`)
                .setColor(ayarlar.renk)
                .setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/780771281359994900/1f513.png')
                .setFooter(`${message.author.username}`, message.author.avatarURL())
                .setTimestamp()
      message.channel.send(embed)
const yasaklandı = new Discord.MessageEmbed()
.setAuthor(message.author.tag,message.author.avatarURL({dynamic: true}))
.setTitle(`${message.author.username} Kanal Kilidini Açtı`)
.setDescription(` **${message.channel.name}** Kanalının Kilidi Açıldı`)
.setColor(ayarlar.renk)

.setFooter(`Kilidi Açan Kişinin ID • ${message.author.id}`,message.author.avatarURL({dynamic: true}))
    .setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/747791390741627050/carklar.png')
 
kanal.send(yasaklandı)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k-aç','kilitaç','unlock'],
  permLevel: 0
};

exports.help = {
  name: 'kilit-aç',
  description: 'Sohbetinizi açmaya yarar.',
  usage: 'w!kilit-aç'
};