const Discord = require("discord.js");
const superagent = require("superagent");
const ayarlar = require('../ayarlar.json')
exports.run = async (client,message,args) => {
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
  var rol = message.content.split(" ").slice(1).join(" ");

  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == rol.toLowerCase().trim())
  var hata = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setTitle(`${ayarlar.wx} Bir rolü etiketle / ID'sini gir ya da adını gir!\nÖrnek: w!rolbilgi @Yapımcı / 636202587648950303 / Yapımcı`);
  if(!role) return message.channel.send(hata);
  var moment = require("moment");

role.dctarih = moment.utc(message.guild.roles.cache.get(role.id).createdAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)')

        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)

        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)


var toplam = message.guild.roles.cache.size - 1
  var roleinfoEmbed = new Discord.MessageEmbed()
  .setAuthor(`Westy • Rol Bilgileri`,client.user.avatarURL())
  .setColor(ayarlar.renk)
  .setTitle(`• ${role.name}`)
  .addField('🆔 Rolün ID\'si', role.id)
  .addField(':hash: Renk Kodu', role.hexColor)
  .addField('📣 Etiketlemesi', role.mentionable ? '\n<:acik:706990446592655381> Açık ' : '<:kapali:706990406868402296> Kapalı ')
  .addField('📅 Oluşturulduğu Zaman',role.dctarih )
  .addField(":gear: Sıra",`Toplam **${toplam} ** Rol Arasında **${toplam - role.position +1}. Sırada**`)
  
  message.channel.send(roleinfoEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rolinfo', 'rolhakkında', 'rolbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'rolinfo',
  description: 'rolinfo | Rol hakkında bilgi verir.',
  usage: 'rolinfo <rolismi>'
};
