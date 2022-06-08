const Discord = require("discord.js");
const { get } = require("superagent");
const ayarlar = require('../ayarlar.json')
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
  .setColor(ayarlar.renk)
  .setAuthor('Westy • Yetki İzni',ayarlar.clientlogo)
  .setTitle('<:westy_x:750094591138463774> Bu Komutu Çalıştırabilmek için Şu İzinlere İhtiyacım Var!')
  .setDescription(''+notHavedPerms.map(perm => names[perm]).join('\n'))
  .addField('Destek almak için;',`[BURAYA TIKLA](https://discord.gg/QtSzCvmn7t)`)
  return message.author.send(yetkimesaj)
     .catch(e => console.log(`${message.author.tag}(${message.author.id}) CLOSE DM |`+notHavedPerms.map(perm => names[perm]).join('\n')))
  }
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

 const dbl = new DModule.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIwMjU4NzY0ODk1MDMwMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE5NjA1NDc1fQ.DHdeuNG9Hg2KSH9tzQtBfVkj1YbcQpIbfnbq5UQMPqQ") 


dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
 
        if(!args[0]){
message.channel.send('<:westy_x:750094591138463774> **Herhangi Bir Yazı Yazmalısın!**')
return;
} 
        let url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args.join(" ")}`
        get(url).then(res => {
message.delete().catch(error => { console.log('trump | mesaj silinemedi')})
            const embed = new Discord.MessageEmbed()
            .setColor(ayarlar.renk)
            .setAuthor("Trump Bir Tweet Paylaştı!",message.author.avatarURL())
            .setImage(res.body.message)
           
              message.channel.send(embed)
        }).catch(error => { return message.channel.send(`${ayarlar.wx} **Yazdığın Yazı Türkçe Bir Latince Harf Veya Geçerli Bir Harf Değil!**`)}
)
     
    
       } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })

};  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kn"],
  permLevel: 0
};
 
module.exports.help = {
  name: 'trump',
  category: 'Kullanıcı',
  description: 'Anime Karakterlerinin Posterine Yazı Koyar',
  usage: 'trump <yazı>'
};
