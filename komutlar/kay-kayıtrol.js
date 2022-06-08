const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db');
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
    let kullanıcı = await db.fetch(`ksistem_${message.guild.id}`);

  if( kullanıcı == undefined){
message.reply(`:warning: **Kayıt Komutları Kapalı Gözüküyor!**\n\`Açmak İçin ${prefix}kayıtsistemi aç\``)
  }else{
      if( kullanıcı == "acik"){
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let role = message.mentions.roles.first()

    if (!role) {
        return message.reply(":warning: **Ayarlamak İstediğin Rolü Etiketlemelisin!")
    }

  
    db.set(`krol_${message.guild.id}`, role.id)
  
    const embed = new Discord.MessageEmbed()
        .setAuthor('Westy • Kayıt Sistemi',ayarlar.clientlogo)
                .setDescription(`**» Kayıt Rolü Başarılı Bir Şekilde Ayarlandı <a:basarili:647509263199240213>**\nAyarlanan Rol • ${role}`)
                .setColor(ayarlar.renk)
                .setThumbnail(ayarlar.clientlogo)
                .setFooter(`${message.author.username} Tarafından Ayarlandı`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
      message.channel.send({embed})
      }
  }

}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıt-rol'],
    permLevel: 0
}

exports.help = {
    name: 'kayıtrol',
    category: 'moderasyon',
    description: 'Birisi susturulunca verilecek rolü ayarlar.',
    usage: 'sustur-rol-ayarla <@rol>'
}
   