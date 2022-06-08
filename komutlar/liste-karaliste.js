const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  if(message.author.id !== '473070737851285515') return message.reply(`${ayarlar.wx} **Bu Komut Yapımcıya Özeldir!**`)
  let user = client.users.cache.get(args.slice(0).join(' '));
  if (!user) {
    let e = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription("Kara listeye almak istediğin kullanıcının ID'ini yaz!")
    message.channel.send(e)
    return;
  };
  
  if (db.has(`karalist_${user.id}`) === true) return message.reply("Bu kullanıcı zaten kara listede!");
  
  db.set(`karalist_${user.id}`, "aktif")
  
  let embed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${user.tag} adlı kullanıcı başarıyla kara listeye alındı!`)
    message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["blacklist", "kara-liste"],
  permLevel: 5

};

exports.help = {
  name: "karaliste",
  description: "Belirtilen kullancıyı kara listeye alır!",
  usage: "karaliste <kullanıcı ID>"
};