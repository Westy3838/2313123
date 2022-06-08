
const Discord = require('discord.js');
const db = require('quick.db');
const a = require('../ayarlar.json')
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
      .setColor(a.renk)
      .setAuthor('Westy • Yetki İzni',a.clientlogo)
      .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
      .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
      .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
      return message.author.send(yetkimesaj)
         .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
      }
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || a.prefix;
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(':warning: **Bu Komutu Kullanabilmek İçin** \``SUNUCUYU YÖNET\`` **Yetkisine Sahip Olmalısın!**');

    if (!args[0]) return message.reply(`${a.wx} **Kullanmak İçin : ${prefix}troll-cevaplar aç/kapat**`);
 if (db.has(`üyelikk_${message.author.id}`)) {
    if (args[0] == 'aç') {
        var durum = await db.fetch(`troll_${message.guild.id}`)            
        if (durum == "acik") return message.channel.send(":question: **Önceden Açılmış Bir Şeyi Niye Açmaya Çalışıyorsun?**");
        db.set(`troll_${message.guild.id}`, 'acik')
        message.channel.send(`**Şu Andan İtibaren** \`${prefix}otoayarlımesajlar\` **da Yazan Mesajlar Otomatik Olarak Cevaplanacaktır.**`)
    }

    if (args[0] == 'kapat') {
        var durum = await db.fetch(`troll_${message.guild.id}`)            
        if (durum == "kapali") return message.channel.send(":question: **Önceden Kapanmış Bir Şeyi Niye Kapatmaya Çalışıyorsun?**");
        db.set(`troll_${message.guild.id}`, 'kapali')
        message.channel.send(`${a.wt} **Oto Mesaj Kapatıldı!**`)
    }
 } else
  message.channel.send(':warning: **Bu Komut Zümrüt Kullanıcılara Özel**')
}

exports.conf = {
  
    aliases: ['troll-cevaplar'],
    permLevel: 0,
  
}

exports.help = {
    name: 'trollcevaplar',
    description: 'Botun Yazı Yazana Cevap Versin mi Vermesin mi?',
    usage:  'oto-mesaj aç/kapat'
}