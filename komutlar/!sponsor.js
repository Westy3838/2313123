const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = async (bot, message, args, client) => {
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
const invitelink = new Discord.MessageEmbed()
    .setColor("2f78ff")
    .setAuthor(`Westy • Sponsor`, ayarlar.clientlogo)
    .setTitle(`• SOURCE BİLİŞİM`)
    .setDescription('[**🔗 SOURCE BİLİŞİM WEBSİTESİ**](https://www.sourcebilisim.com)\n[Sunucuya Katıl](https://discord.gg/xyBA2w7Vyh)\n**»** Görüp görebileceğiniz en iyi paketleri ve destek hizmetini Source Bilişim\'de bulabilirsiniz.')
    .setThumbnail('https://cdn.discordapp.com/attachments/962699628061548587/963553814319857714/unknown.png')
message.channel.send(invitelink)
};  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sponsorbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'sponsor',
  description: '0',
  usage: 'davet'
 };