 const Discord = require('discord.js')
var steam = require('steam-provider')
const ayarlar = require('../ayarlar.json')
var provider = new steam.SteamProvider();

exports.run = (client, message, args) => {
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
    let game = args[0]
 
    if (!game) return message.reply(':warning: **Steam\'de Bulunan Bir Oyunun Adını Yazmalısın!**')
   if(provider.search(game) === undefined) {
     return message.channel.send('Böyle bir oyun yok')
   }
    provider.search(game).then(result => {
      try {
    provider.detail(result[0].id, "turkey", "tr")
      }catch {message.channel.send(`**:mag_right: Aranan Sonuç** • *${game}*\n${ayarlar.wx} **Böyle bir oyun yok veya veriye işlenmemiş!**`)
    return;
  }

      provider.detail(result[0].id, "turkey", "tr").then(results => {
        if(!result[0]) return message.channel.send(`${ayarlar.wx} **Böyle Bir Veri Bulunamadı!**`)

if(!results.otherData.metacriticScore) results.otherData.metacriticScore = 'Metacritic verisi bulunamadı'
if(!results.priceData.initialPric) results.priceData.initialPric = 'Fiyat Bulunamadı'
if(!results.genre) results.genre = 'Bulunamadı'
if(!results.otherData.platforms) results.otherData.platforms = 'Bulunamadı'
if(!results.otherData.developer) results.otherData.developer = 'Bulunamadı'
if(!results.otherData.publisher) results.otherData.publisher = 'Bulunamadı'
if(!result[0].name)result[0].name = 'Böyle Bir Oyun Yok'
    const embed = new Discord.MessageEmbed()
    .setAuthor('Westy • Steam Fiyat',ayarlar.clientlogo)
  .setColor(ayarlar.renk)
    .setTitle(result[0].name)
    
    .setThumbnail(ayarlar.clientlogo)
    .addField(':moneybag: Fiyatı', `**${results.priceData.initialPrice}** TL`, true)
    .addField(':star: Metacritic Puanı', results.otherData.metacriticScore, true)
    .addField(':rosette: Türleri', results.genres)
    .addField(':globe_with_meridians: Platformlar', results.otherData.platforms)
    .addField(':busts_in_silhouette: Geliştiricileri', results.otherData.developer)
    .addField(':bust_in_silhouette: Yayımcıları', results.otherData.publisher)
    message.channel.send(embed) 
 
})
})

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'steam',
  description: 'Aradağınız oyunun steamdaki fiyatına bakmanızı sağlar',
  usage: '!steamfiyat PUBG'
};