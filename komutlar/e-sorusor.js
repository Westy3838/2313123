  const Discord = require('discord.js');
const a = require('../ayarlar.json')
const db = require('quick.db')
const DModule = require('@top-gg/sdk');
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

 const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 


dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
const cevaplar = [
    "Hmmm,Evet.",
    "Böyle Soru mu Olur Arkadaşım?",
    "Hı Hı.",
    "Evet Öyle.",
    "Neden Sordun ki? Tabii ki de Evet.",
    "Evet,Ama Aslında Hayır.",
    "Sanırım Hayır.",
    "Bunu Cevaplayamam.",
    "Olabilir Ama Buna Katılmıyorum.",
    "Bunu Saymıyorum,Bir Daha Sor.",
    "İmkansız.",
    "Evet.",
    "Sanırım,Evet.",
    "Aynen Öyle.",
    "Yoo.",
    "Buna Katılıyorum.",
    "Buna Katılmıyorum.",
    "Ayıp Ediyorsun.",
    "İşte Buna Soru Derim,Cevabım Bir Sonraki Cevapta. ;) "
  
  
 
];


    var soru = args.join(' ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if(!soru) return message.reply(':warning: Bir Soru Belirt **Doğru Kullanım**: w!sorusor <soru>')
const sor = new Discord.MessageEmbed()
.setTitle('Üstün Zeka Ve Tüm Bilginliğimle Buna Cevabım')
.setColor(a.renk)
.setDescription(`**•** ${cevap}`)
    message.channel.send(sor)
 } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(a.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,a.clientlogo)
        message.channel.send(Mesaj)
      }
  })

};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'sorusor', 
  description: 'Sorduğunuz soruları cevaplar.',
  usage: 'sorusor <soru>'
};
