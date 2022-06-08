const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
let db = require('quick.db')
exports.run = async (bot, message, args, client) => {
  const perms  = [
    "SEND_MESSAGES",
    "MENTION_EVERYONE"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme",
    MENTION_EVERYONE: "• Everyone Etiketi Atma"
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
let data2 = await db.fetch(`duyuruyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`:warning: **Duyuru Yetkilisi Rolü Ayarlı Değil!** \`${prefix}duyuru-yetkili ayarla/sıfırla\``)
let yetkili = message.guild.roles.cache.get(data2)
if(!yetkili) return message.channel.send(`:warning: **Duyuru Yetkilisi Ayarlı Değil!** \`${prefix}duyuru-yetkili ayarla/sıfırla\``)
 if (!message.member.roles.cache.has(`${yetkili.id}`)) return message.channel.send(`:warning: **Komutu Kullanabilmek için Ayarlanan Yetkili Rolüne Sahip Olman Gerekiyor!**`)
   
    let duyurumetni = args.join(" ").slice();
    
  if(!duyurumetni) return message.channel.send(":warning: **Bir Duyuru Metni Yazmalısın**");

     var duyurubaslik = [
"Yeni Bir Duyuru Var!",
"Yeni Bir Duyuru Var!",
"Yeni Bir Duyuru Var!",
"Kaptandan Yeni Bir Mektup!",
"Kaptanınız Konuşuyor!",
"Yeni Bir Fermanınız Var!"

	]
    var duyurubaslik = duyurubaslik[Math.floor(Math.random(1) * duyurubaslik.length)]

  if(duyurumetni.length > 1024) return message.reply(":warning: **Yazma Sınırı 1024 Karakterdir.**")
message.delete()
            setTimeout(() => { message.channel.send('@everyone')},800)
            const embed = new Discord.MessageEmbed()
            .setColor(ayarlar.renk)
       
            .setAuthor(`${message.guild.name} • Duyuru`,message.guild.iconURL({dynamic: true}))
            .setTitle(`:bell: ${duyurubaslik}`)
            .setDescription(`${duyurumetni}`)
            .setThumbnail('https://cdn.discordapp.com/emojis/773234698284433470.gif')
            .setFooter(`Duyuran • ${message.author.username}`,message.author.avatarURL({dynamic: true}))
        setTimeout(() => { message.channel.send(embed)},1000)
            
            
         
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'duyuru',
  description: 'Duyuru yapar.',
  usage: 'w!duyuru <mesaj>  '
};