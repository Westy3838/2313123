const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
  const perms  = [
    "SEND_MESSAGES"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme"
  };
  if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send('Rolleri yönet iznimin olması gerekiyor.')
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
  const db = require('quick.db')
  let kullanıcı = await db.fetch(`ksistem_${message.guild.id}`);
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if( kullanıcı == undefined){
message.reply(`:warning: **Kayıt Komutları Kapalı Gözüküyor!**\n\`Açmak İçin ${prefix}kayıtsistemi aç\``)
  }else{
      if( kullanıcı == "acik"){
    let kayıt = message.author

         const kanal = db.fetch(`kkanal_${message.guild.id}`).replace("<#", "").replace(">", "")

         const channelss = db.fetch(`kkanal_${message.guild.id}`).replace("<#", "").replace(">", "")

  if (message.channel.id !== kanal) return message.channel.send(`:warning: **Bu Komutu Sadece <#${kanal}> Kanalında Kullanabilirsin!**`)
    if (message.channel.id == kanal) {
                              message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.updateOverwrite(message.author, {
                    VIEW_CHANNEL: true
                });
            });
                          
                 message.guild.channels.cache.get(channelss).updateOverwrite(message.author, {
                    VIEW_CHANNEL: false
                });
                   const rol = db.fetch(`krol_${message.guild.id}`)
            message.member.roles.add(rol)
   const embed = new Discord.MessageEmbed()
   .setAuthor(`${message.author.tag}  `,message.author.avatarURL({dynamic: true}))
   .setDescription(`Başarıyla Kaydoldun, Rolün Verildi ${ayarlar.wt}`)
   .setThumbnail(message.author.avatarURL({dynamic: true}))
   .setColor(ayarlar.renk)
   message.channel.send(embed)
        }
    
                     
    
      }
  }

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayıt','kayıtol'],
    permLevel: 0
};

exports.help = {
    name: 'kaydol',
    description: 'Sunucuya kayıt olursunuz!',
    usage: 'kayıt-ol'
};
   