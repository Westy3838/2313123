  const Discord = require("discord.js");
var request = require("request");
const ayarlar = require("../ayarlar.json");
const DModule = require('@top-gg/sdk');
const db = require("quick.db");
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
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  const dbl = new DModule.Api(ayarlar.dbltoken) 
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
      const corgis = [
        {
          name:"Osmanlı Torunu Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/800429531332608010/osmanl_torunu_corgi.png"
        },
        {
          name:"Rey Misteryo Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/801042799688548372/rey_misteryo_corgi.png"
        },
        {
          name:"Batman Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/800995653726503002/batman_corgi.png"
        },
        {
          name:"Beden Hocası Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/800429718460563476/2.png"
        },
        {
          name:"Lil Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/800429962745479218/lil_corgi2.png"
        },
        {
          name:"Noel Baba Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/800430207538167838/3.png"
        },
        {
          name:"Noel Baba Corgi (napim edition)",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/800430376342126622/dsfs.png"
        },
        {
          name:"Basketbolcu Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/800432784564420618/corgi_bird.png"
        },
        {
          name:"Görünmez Köpke Corgi",
          url:"https://cdn.discordapp.com/attachments/795388290723348510/802260171153604668/gorunmez_kopke_corgi.png"
        }
      ];
      
      const rastgele_sayi = Math.floor(Math.random()*9);
      const rastgele_sayi2 = Math.floor(Math.random()*3);
      
      const titles=["Uzaylı olabilir","Tipe Bak","Şu tatlılığa bakar mısın yaa?"];
      
      const corgiEmbed = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(
          "Westy • Rastgele Corgi",
          ayarlar.clientlogo
        )
        .setTitle(titles[rastgele_sayi2]+" 🐶")
        .setDescription(corgis[rastgele_sayi].name)
        .setImage(corgis[rastgele_sayi].url);
        
      message.channel.send(corgiEmbed);
   } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["corgi"],
  permLevel: 0
};

exports.help = {
  name: "corgi",
  description: "Rastgele Corgi Fotografi Atar.",
  usage: "corgi"
};