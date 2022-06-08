const Discord = require("discord.js")
const client = new Discord.Client()
const TCMB_Doviz = require('tcmb-doviz');
const Doviz = new TCMB_Doviz();
const ayarlar = require("../ayarlar.json")
var prefix = ayarlar.prefix;
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
message.channel.send('KOMUT BAKIMDA')

   
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["doviz","kur","dövizkur","kuranaliz","kurgetir","dövizanaliz","usd","euro","dolar","eur"],
  permLevel: 0
};
exports.help = {
  name: 'döviz',
  description: 'Güncel Döviz kurlarını gösterir.',
  usage: 'döviz'
};
