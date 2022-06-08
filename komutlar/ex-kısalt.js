const Discord = require('discord.js');
const shorten = require('isgd');
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args, tools) => {
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
    if (!args[0]) return message.channel.send(' :warning: **Doğru Kullanım : w!kısalt <link>** ')

    if(!args[1]) {

        shorten.shorten(args[0], function(res) {
            if (res.startsWith('Hata:')) message.channel.send('**:warning: Lütfen Doğru Bir Link Giriniz!**');

 const k1 = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • Link Kısaltma',ayarlar.clientlogo)
.setTitle('Link Başarıyla Kısaltıldı')
 .setDescription(`**-  Link   •  ${args[0]}**\n**+  Kısaltılmış Hali  •  <${res}>**`)
message.channel.send(k1)
        })
    } else {
        shorten.custom(args[0], args[1], function(res) {

            if (res.startsWith('Hata:')) message.channel.send(`**<${res}>**`);

            message.channel.send(`**<${res}>**`);
        })
    }

};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'kısalt',
 description: 'İstediğiniz URLni Kısaltır. ',
 usage: 'kısalt'
};  