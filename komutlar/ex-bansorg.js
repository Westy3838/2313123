const Discord = require('discord.js');
const a = require('../ayarlar.json')
exports.run = (client, message, args) => {
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
      if(!message.guild.me.permissions.has('ADMINISTRATOR')) return message.channel.send('Ban sorgulamak için yönetici iznimin olması gerekiyor.')
      if(message.author.id !== '473070737851285515') return message.reply(`${a.wx} **Bu Komut BAKIMDA!**`) 
      let kullanici = args[0]
   
   
  if(client.users.cache.get(kullanici) === null) {
   return message.channel.send("Böyle bir kullanıcı yok.")

  } else {
   
    if (!kullanici) return message.channel.send(`${a.wx} **Banlanan Bir Kullanıcının ID'sini Belirtmen Gerek!**`)
  
message.guild.fetchBans()
  message.guild.fetchBans().then(bans => {
            if (!bans.has(kullanici)) {
                return message.channel.send(`${a.wx} **Bu Kullanıcının Banı Bulunmamakta!**`)
            }
        })
        
        message.guild.fetchBan(kullanici).then(({ user, reason }) => {

const Embed = new Discord.MessageEmbed()
 .setColor(a.renk)
.setAuthor('Westy • Ban Sorgulama',a.clientlogo)
.setDescription(`**Banlanan Kişi •** \`${user.tag}\`\n**━━━━━━━━━━━━━**\n**Sebebi •** \`${reason || "Neden Belirtilmemiş"}\``)
return message.channel.send(Embed)
    })}
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bansorgulama','bansorgu','ban-sorgulama','BANSORGULAMA','ban-sorgu'],
    permLevel: 0
};

exports.help = {
    name: 'bansorgulama',
    description: 'Ban sorgulama yaparsınız',
    usage: 'bansorgulama'
};