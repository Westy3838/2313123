
const Discord = require('discord.js')
const moment = require('moment')
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const botadi = "Westy"

exports.run = async (bot, message, args) => {
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

        let simdikitarih = moment.utc(message.createdAt).format('DD MM YYYY');
  
        let user = message.mentions.users.first() || message.author 
  
        let userinfo = {};
        userinfo.avatar= user.displayAvatarURL;
        userinfo.id = user.id;
        userinfo.od1 = message.guild.members.cache.get(user.id).user.presence.game || "Oynadığı bir oyun yok"
        userinfo.status = user.presence.status.toString()
        .replace("dnd", `<:mesgul:653644337531322398> Rahatsız Etmeyin`)
        .replace("online", `<:cevrimici:653644230744342549> Çevrimiçi`)
        .replace("idle", `<:bos:653644294959398932> Boşta`)
        .replace("offline", `<:cevrimdisi:653644399850422283> Çevrimdışı`)
 
        userinfo.bot = user.bot.toString()
        .replace("false", `Hayır`)
        .replace("true", `Evet`)

     
  
        userinfo.dctarih = moment.utc(message.guild.members.cache.get(user.id).user.createdAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)')

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
        userinfo.dctarihkatilma = moment.utc(message.guild.members.cache.get(user.id).joinedAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)')

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
      if(message.guild.members.cache.get(user.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' • ').length > 1024) return message.reply('<:westy_x:750094591138463774> **Rollerin Toplam Kapladığı Karakter Sayısı, 1024 Karakteri Geçemez!**')
        const uembed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.avatarURL({dynamic:true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
        .setThumbnail(user.avatarURL({dynamic:true}))
        .setTitle('Kullanıcı Bilgi Sistemi')
         .addField(`:id: ID Kimliği`, userinfo.id)
        .setColor(ayarlar.renk)
        .addField(`:date: Sunucuya Katılma Tarihi`, userinfo.dctarihkatilma, false)
        .addField(`:date: Hesabın Oluşturulma Tarihi`, userinfo.dctarih, false)
        .addField(`:pencil: Roller:`, `${message.guild.members.cache.get(user.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' • ')}`|| "Rolü Yok",true)
       
       
        message.channel.send(uembed)
    }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kb', 'kullanıcıbilgi', 'kullanıcı bilgisi', 'info'],
  permLevel: 0
};

exports.help = {
  name: 'kullanıcıbilgi',
  description: 'İstediğiniz kullanıcını bilgilerini gösterir.',
  usage: 'kullanıcıbilgi'
};

