const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  if(message.author.id !== '473070737851285515') return message.reply(`${ayarlar.wx} **Bu Komut Yapımcıya Özeldir!**`)  
  let user = client.users.cache.get(args.slice(0).join(' '));
  if (!user) {
    let e = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription("Kara listeden kaldırmak istediğin kullanıcının ID'ini yaz!")
    message.channel.send(e)
    return;
  };
  
  
  db.delete(`karalist_${user.id}`)
  
  let embed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${user.tag} adlı kullanıcı başarıyla kara listeden çıkartıldı!`)
    message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["blacklist", "kara-liste"],
  permLevel: 4

};

exports.help = {
  name: "beyazliste",
  description: "Belirtilen kullancıyı kara listeden çıkartır!",
  usage: "beyazliste <kullanıcı ID>"
};