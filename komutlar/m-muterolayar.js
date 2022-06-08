  const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
module.exports.run = async (bot, message, args, client) => {
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
var kanalsayı = message.guild.channels.cache.filter(c => c.type === 'text').size + message.guild.channels.cache.filter(c => c.type === 'voice').size
       if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:warning: **Komutu Kullanabilmek için Sunucuyu Yönet Yetkisine Sahip Olman Gerekiyor!**`)
      
   if(args[0] === 'ayarla') {
//
var muterolcük = message.mentions.roles.first().id
        if(!muterolcük) return message.channel.send(`${ayarlar.wx} **Mute Rolünü Ayarlamam için Rol Etiketlemelisin!**\n${prefix}muterol ayarla @Rol`)
//
const embed = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor('Westy • Mute Rol Ayarlama',ayarlar.clientlogo)
   .setTitle(`Başarıyla Mute Rolü Ayarlandı ${ayarlar.wt}`)
   .setDescription(`**Mute Rol** • <@&${muterolcük}>\n• Artık mute komutu kullanıldığında bu rol verilecek.`)
 
   .setThumbnail(ayarlar.clientlogo)

message.channel.send(embed)
db.set(`muterole_${message.guild.id}`,muterolcük)

}
   
   if(args[0] === 'sıfırla') {
//

//
const embed = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor('Westy • Mute Rol Sıfırlama',ayarlar.clientlogo)
   .setTitle(`Başarıyla Mute Rolü Sıfırlandı ${ayarlar.wt}`)
 
 
   .setThumbnail(ayarlar.clientlogo)

message.channel.send(embed)
db.delete(`muterole_${message.guild.id}`)

}
if(args[0] === 'oluştur'){


const embed = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
    .setColor(ayarlar.renk)
   .setAuthor('Westy • Mute Rol Oluşturma',ayarlar.clientlogo)
   .setTitle(`Başarıyla Mute Rolü Oluşturuldu ${ayarlar.wt}`)
   .setDescription(`Mute rolü oluşturuldu, **kanal izinleri ayarlanıyor...**`)
   .setFooter('• Birkaç saniye sürebilir',ayarlar.clientlogo)
   .setThumbnail("https://cdn.discordapp.com/emojis/653170616370855943.gif")
message.channel.send(embed)
var muterole = await message.guild.roles.create({

data: {
                name: "🛇 Mute Rol",
                color: "RED",
                permissions: []
                                                    },
reason: 'Mute rolü Westy tarafından oluşturuldu.'

            })

            message.guild.channels.cache.array().forEach(async (channel) => {
                await channel.updateOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });


const embed2 = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
   .setAuthor('Westy • Kanal İzinleri Ayarlama',ayarlar.clientlogo)
   .setTitle(`İzinler Başarıyla Ayarlandı ${ayarlar.wt}`)
   .setDescription(`Mute rolünün izinleri **${kanalsayı}** kanala ayarlandı.\nRolün rengini veya ismini değiştirebilirsin.\nMute rolünü ayarlamak için **${prefix}muterol ayarla @Rol**`)
   .setThumbnail(ayarlar.clientlogo)
   setTimeout(() => {  message.channel.send(embed2)},4000)


}

};
 



exports.conf = {
    aliases: [],
    permLevel: 0
};

module.exports.help = {
    name: "muterol",
    description: "Etiketlenen Kişiye Mute Atar",
    usage: "mute [kullanıcı] [sebep]"
}