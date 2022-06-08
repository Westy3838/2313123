const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')

exports.run = (bot, message, args, client) => {

const perms  = [
  "SEND_MESSAGES"
];

const names = {
  SEND_MESSAGES: "MESAJ GÖNDERME"
};

const notHavedPerms = perms.filter(perm => !message.channel.permissionsFor(message.guild.me).has(perm))

if (notHavedPerms.length) {  
const yetkimesaj = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • Yetki İzni',client.user.avatarURL({dynamic: true}))
.setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
return message.author.send('şu yetkilerim yok;\n'+notHavedPerms.map(perm => names[perm]).join('\n'))
   .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
}
//COMMAND
const embed = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • Gizlilik Politikası',ayarlar.clientlogo)
.setTitle('Botu Sunucuya Eklediğiniz Andan İtibaren Kabul Etmiş Sayılırsınız')
.addField('Kullanılan Kullanıcı Verileri',`• Herhangi bir komut kullanımı halinde,
Saklanmasına tabii olunan veriler;\n
**> A | Kullanıcı Verileri**
• Kullanıcı ID
• Kullanıcı profil
• Discord kayıt tarihi
• Sunucu katılım tarihi
• Komut geçmişi
**•** Bot içi veriler
• İmparatorluk sistemi\n
**> B | Sunucu Verileri**
• Sunucu ID
• Rol bilgileri
• Yetki bilgileri
• Eklenme tarihi
• Üye sayısı
• Westy ayarlanabilir içerikler\n
**WESTY SUNUCUYA EKLENDİĞİNDEN İTİBAREN TÜM ŞARTLAR GEÇERLİDİR, VERİLERİN SİLİNMESİ İÇİN WESTY\'İ SUNUCUDAN ATMANIZ YETERLİ**`)
.setFooter('Her hakkı saklıdır Westy Bot © 2022')
message.channel.send(embed)

};  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['politika','gizlilikpolitikası','privacy-policy','privacypolicy'],
  permLevel: 0
};

exports.help = {
  name: 'gizlilik-politikası',
  description: '0',
  usage: 'test'
 };