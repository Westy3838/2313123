


const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
exports.run = async (bot, message, args, client, params) => {
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
 if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor(`Bir İzin İsmi Yazmalısın`,ayarlar.clientlogo)
   .setTitle(`İzinler; genel,yazı,ses`)
   .setDescription(`**${prefix}yetkilerim genel**\n**${prefix}yetkilerim yazı**\n**${prefix}yetkilerim ses**`))
  
 if (args[0] == 'genel') {
let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
  
    let x9;
    let x10;
    let x11;
    let x12;
    let x13;
    let x14;
    
 //yönetici
 if (message.member.hasPermission("ADMINISTRATOR")) x = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("ADMINISTRATOR")) x = "<:kapali:706990406868402296>"
 
 //Denetim kaydı
 if (message.member.hasPermission("VIEW_AUDIT_LOG")) x2 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("VIEW_AUDIT_LOG")) x2 = "<:kapali:706990406868402296>"
 
 //Sunucuyu yönet
 if (message.member.hasPermission("MANAGE_GUILD")) x3 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("MANAGE_GUILD")) x3 = "<:kapali:706990406868402296>"
 
 //Rolleri yönet
 if (message.member.hasPermission("MANAGE_ROLES")) x4 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("MANAGE_ROLES")) x4 = "<:kapali:706990406868402296>"
 
 //Kanalları yönet
 if (message.member.hasPermission("MANAGE_CHANNELS")) x5 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("MANAGE_CHANNELS")) x5 = "<:kapali:706990406868402296>"
 
 //üyeleri at
 if (message.member.hasPermission("KICK_MEMBERS")) x6 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("KICK_MEMBERS")) x6 = "<:kapali:706990406868402296>"
 
 //üyeleri yasakla
 if (message.member.hasPermission("BAN_MEMBERS")) x7 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("BAN_MEMBERS")) x7 = "<:kapali:706990406868402296>"

//kullanıcı adlarını yönet
 if (message.member.hasPermission("MANAGE_NICKNAMES")) x9 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("MANAGE_NICKNAMES")) x9 = "<:kapali:706990406868402296>"
 
 //emojileri yönet
 if (message.member.hasPermission("MANAGE_EMOJIS")) x10 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("MANAGE_EMOJIS")) x10 = "<:kapali:706990406868402296>"
 
 //webhookları yönet
 if (message.member.hasPermission("MANAGE_WEBHOOKS")) x11 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("MANAGE_WEBHOOKS")) x11 = "<:kapali:706990406868402296>"

//webhookları yönet
 if (message.member.hasPermission("CREATE_INSTANT_INVITE")) x12 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) x12 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("MANAGE_NICKNAMES")) x13 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("MANAGE_NICKNAMES")) x13 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("CHANGE_NICKNAME")) x14 = "<:westy_acik:765578629295898635>"
 if (!message.member.hasPermission("CHANGE_NICKNAME")) x14 = "<:kapali:706990406868402296>"
    
 const Mesaj = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor(`${message.author.tag}\'ın Yetkileri`,message.author.avatarURL())
.setTitle('Genel İzinler')
   .setDescription(`${x} **•** Yönetici\n${x2} **•** Denetim Kaydını Görüntüle\n${x3} **•** Sunucuyu Yönet\n${x4} **•** Rolleri Yönet\n${x5} **•** Kanalları Yönet\n${x6} **•** Üyeleri At\n${x7} **•** Üyeleri Yasakla\n${x9} **•** Kullanıcı Adlarını Yönet\n${x10} **•** Emojileri Yönet\n${x11} **•** Webhook\'ları Yönet\n${x12} **•** Davet Oluştur\n${x13} **•** Kullanıcı Adlarını Yönet\n${x14} **•** Kullanıcı Adını Değiştir`)
  message.channel.send(Mesaj)
 }
 if (args[0] == 'yazı') {
let x0;
    let xa;
    let xb;
    let xc;

    let xe;
    let xf;
    let xg;
    let xh;
    let xı;
    let xi;
    let xj;

    if (message.member.hasPermission("SEND_MESSAGES")) x0 = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("SEND_MESSAGES")) x0 = "<:kapali:706990406868402296>"
 
    if (message.member.hasPermission("SEND_TTS_MESSAGES")) xa = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("SEND_TTS_MESSAGES")) xa = "<:kapali:706990406868402296>"
    
  
    if (message.member.hasPermission("MANAGE_MESSAGES")) xb = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("MANAGE_MESSAGES")) xb = "<:kapali:706990406868402296>"
    
  
    if (message.member.hasPermission("EMBED_LINKS")) xc = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("EMBED_LINKS")) xc = "<:kapali:706990406868402296>"
    
    if (message.member.hasPermission("ATTACH_FILES")) xe = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("ATTACH_FILES")) xe = "<:kapali:706990406868402296>"
   
    if (message.member.hasPermission("READ_MESSAGE_HISTORY")) xf = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("READ_MESSAGE_HISTORY")) xf = "<:kapali:706990406868402296>"
    
 
    if (message.member.hasPermission("MENTION_EVERYONE")) xg = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("MENTION_EVERYONE")) xg = "<:kapali:706990406868402296>"
    
   
    if (message.member.hasPermission("USE_EXTERNAL_EMOJIS")) xh = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("USE_EXTERNAL_EMOJIS")) xh = "<:kapali:706990406868402296>"
    
  
    if (message.member.hasPermission("ADD_REACTIONS")) xı = "<:westy_acik:765578629295898635>"
    if (!message.member.hasPermission("ADD_REACTIONS")) xı = "<:kapali:706990406868402296>"
    const Mesaj = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor(`${message.author.tag}\'ın Yetkileri`,message.author.avatarURL())
.setTitle('Yazı İzinleri')
   .setDescription(`${x0} **•** Mesaj Gönder\n${xa} **•** Metin Okuma Mesajı Gönder\n${xb} **•** Mesajları Yönet\n${xc} **•** Bağlantı Yerleştir\n${xe} **•** Dosya Ekle\n${xf} **•** Mesaj Geçmişini Oku\n${xg} **•** @everyone & @here Kullanımı\n${xh} **•** Harici Emojiler Kullan\n${xı} **•** Tepki Ekle`)
  message.channel.send(Mesaj)


 }
if (args[0] == 'ses') {
let x20;
let x21;
let x22;
let x23;
let x24;
let x25;
let x26;
let x27;

if (message.member.hasPermission("CONNECT")) x20 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("CONNECT")) x20 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("SPEAK")) x21 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("SPEAK")) x21 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("STREAM")) x22 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("STREAM")) x22 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("MUTE_MEMBERS")) x23 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("MUTE_MEMBERS")) x23 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("MOVE_MEMBERS")) x24 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("MOVE_MEMBERS")) x24 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("DEAFEN_MEMBERS")) x25 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("DEAFEN_MEMBERS")) x25 = "<:kapali:706990406868402296>" 

if (message.member.hasPermission("USE_VAD")) x26 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("USE_VAD")) x26 = "<:kapali:706990406868402296>"

if (message.member.hasPermission("PRIORITY_SPEAKER")) x27 = "<:westy_acik:765578629295898635>"
if (!message.member.hasPermission("PRIORITY_SPEAKER")) x27 = "<:kapali:706990406868402296>" 

 const Mesaj = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor(`${message.author.tag}\'ın Yetkileri`,message.author.avatarURL())
.setTitle('Ses İzinleri')
   .setDescription(`${x20} **•** Bağlan\n${x21} **•** Konuş\n${x22} **•** Go Live(Yayın)\n${x23} **•** Üyeleri Sustur\n${x24} **•** Üyeleri Taşı\n${x25} **•** Üyeleri Sağırlaştır\n${x26} **•** Ses Eylemini Kullan\n${x27} **•** Öncelikli Konuşmacı`)
  message.channel.send(Mesaj)
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['izinlerim'],
  permLevel: 0,

};

exports.help = {
  name: 'yetkilerim',
  description: 'Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.',
  usage: 'yetkilerim'
};