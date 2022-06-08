const db = require("quick.db");
const fetch = require("node-fetch");
const ayarlar = require('../ayarlar.json')
 const Discord = require('discord.js')
exports.run = async (client, message, args) => {
const perms  = [
    "SEND_MESSAGES",
    "ADD_REACTIONS"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme",
    ADD_REACTIONS: "• Tepki Ekleme"
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

  var siteck = await fetch("http://newsapi.org/v2/top-headlines?country=tr&apiKey=c3e2429af5534e48b2278773081ab7d3");
  var bilgi = await siteck.json();
  var page = 0;


if(!bilgi.articles[0].author) bilgi.articles[0].author = 'Yazar Adı Bulunamadı'
if(!bilgi.articles[0].title) bilgi.articles[0].title = 'Başlık Adı Bulunamadı'
const mesaj = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setTitle('Gazete menüsü 90 saniye sonra işlevini yitirecek.')
message.channel.send(mesaj)
  const embed = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy News',ayarlar.clientlogo)
.setThumbnail('https://cdn.discordapp.com/attachments/855770218357456936/947393124290928640/gazete.png')
.setTitle(`${bilgi.articles[0].title}`)
.setDescription(`
[**${bilgi.articles[0].author}**](${bilgi.articles[0].url})
• ${bilgi.articles[0].description}`)
.setFooter(`• Sayfa ${page} / ${bilgi.articles.length}`)
  message.channel.send(embed).then(async msg => {
    await msg.react("⬅")
    await msg.react("📰")
 
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '📰' && user.id === message.author.id;
 
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 90000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 90000 });


forwards.on('collect', async (reaction, user) => {
 
        if(page === bilgi.articles.length) return;
        page++;
if(!bilgi.articles[page-1].author) bilgi.articles[page-1].author = 'Site'
if(!bilgi.articles[page-1].url) bilgi.articles[page-1].url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
if(!bilgi.articles[page-1].title) bilgi.articles[page-1].title = 'Başlık Yok'

embed.setColor(ayarlar.renk)
embed.setAuthor('Westy News',ayarlar.clientlogo)
embed.setThumbnail('https://cdn.discordapp.com/attachments/855770218357456936/947393124290928640/gazete.png')
embed.setTitle(`${bilgi.articles[page-1].title}`)
embed.setDescription(`
[**${bilgi.articles[page-1].author}**](${bilgi.articles[page-1].url})
• ${bilgi.articles[page-1].description}`)
embed.setFooter(`• Sayfa ${page} / ${bilgi.articles.length}`)
      msg.edit(embed)

      })
      backwards.on('collect', async (reaction, user) => {
      if(page === 0) return;
        page--;
if(!bilgi.articles[page+1].author) bilgi.articles[page+1].author = 'Site'
if(!bilgi.articles[page+1].url) bilgi.articles[page+1].url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
if(!bilgi.articles[page+1].title) bilgi.articles[page+1].title = 'Başlık Yok'

embed.setColor(ayarlar.renk)
embed.setAuthor('Westy News',ayarlar.clientlogo)
embed.setThumbnail('https://cdn.discordapp.com/attachments/855770218357456936/947393124290928640/gazete.png')
embed.setTitle(`${bilgi.articles[page+1].title}`)
embed.setDescription(`
[**${bilgi.articles[page+1].author}**](${bilgi.articles[page+1].url})
• ${bilgi.articles[page+1].description}`)
embed.setFooter(`• Sayfa ${page} / ${bilgi.articles.length}`)
       
        msg.edit(embed)
      })
 
  })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["news","westynews","westy-news","westy-gazete","haber","haberler"],
  permLevel: 0
};
 
exports.help = {
  name: "gazete",
  useage: "!haber"
};
