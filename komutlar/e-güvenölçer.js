const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const { RichEmbed } = require('discord.js')
const db = require('quick.db')
const DModule = require('@top-gg/sdk');
exports.run = async (bot, message, args, client) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

 const dbl = new DModule.Api(ayarlar.dbltoken) 


  
 
var ekontrol = db.fetch(`dil_${message.guild.id}`)   
    if (ekontrol == "en") {  
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
    let member = message.guild.member(message.mentions.users.array()[0] || message.guild.members.cache.get(args[0]))
    let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.cache.get(args[1]))
    var s = message.author
   if(member2) {
        var s = member2.user
    }
    if(!member) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`You have to mention someone!`)
    .setAuthor('Hata')
            .setColor(ayarlar.renk)
            .setTimestamp()
        message.channel.send({embed})
        return
    }
    var anasonuc = Math.floor(Math.random() * 101)
    var kalp = ''
    var akalp = ''
    if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0
        for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
            kalp += ':blue_circle:'
            c++
        }
        for(var x = c; x < 10; x++) {
            akalp += `:black_circle:`
        }
    } else {
        var kalp = ':black_circle:'
        var akalp = ':black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle:'
    }
    var yorum = `The most reliable person in the world`
    if(anasonuc < 80) {
        var yorum = 'It should come to mind when you say trust'
    }
    if(anasonuc < 60) {
        var yorum = 'Occasionally it shakes his confidence. But reliable.'
    }
    if(anasonuc < 40) {
        var yorum = 'He trusts you a little.'
    }
    if(anasonuc < 20) {
        var yorum = 'You cannot trust this'
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} with ${s.tag} Reliability Result Between`,ayarlar.clientlogo)
        .setDescription(`Reliability Percentage: ${anasonuc}\n${kalp}${akalp}\n\n${yorum}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/728346251153637387/4c33ef1f0c28efb56b49fb948d86ec49.gif')
        .setColor(ayarlar.renk)
        message.channel.send(embed)
            } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`You Must Vote To Use This Command. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
}
var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
    
    if (ekontrol == "en") return;
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {

    let member = message.guild.member(message.mentions.users.array()[0] || message.guild.members.cache.get(args[0]))
    let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.cache.get(args[1]))
    var s = message.author
   if(member2) {
        var s = member2.user
    }
    if(!member) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`Bir Kişi Etiketlemelisin.`)
    .setAuthor('Hata')
            .setColor(ayarlar.renk)
            .setTimestamp()
        message.channel.send({embed})
        return
    }
    var anasonuc = Math.floor(Math.random() * 101)
    var kalp = ''
    var akalp = ''
    if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0
        for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
            kalp += ':blue_circle:'
            c++
        }
        for(var x = c; x < 10; x++) {
            akalp += `:black_circle:`
        }
    } else {
        var kalp = ':black_circle:'
        var akalp = ':black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle:'
    }
    var yorum = `Dünyanın En Güvenilir İnsanı`
    if(anasonuc < 80) {
        var yorum = 'Güven Diyince Akla Gelen İlk Kişi Olabilir'
    }
    if(anasonuc < 60) {
        var yorum = 'Arada Sırada Güvenini Sarssa da Güvenilir Sayılır'
    }
    if(anasonuc < 40) {
        var yorum = 'Az da Olsa Güveniyor.'
    }
    if(anasonuc < 20) {
        var yorum = 'Buna Güven Olmaz'
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} Ve ${s.tag} Arasındaki Güvenilirlik Sonucu`,'https://cdn.discordapp.com/avatars/636202587648950303/e634aa7a8dc92156ae2684812fd960fd.png?size=2048')
        .setDescription(`Güvenilirlik Yüzdesi: ${anasonuc}\n${kalp}${akalp}\n\n${yorum}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/711338188861603940/728346251153637387/4c33ef1f0c28efb56b49fb948d86ec49.gif')
        .setColor(ayarlar.renk)
        message.channel.send(embed)
            } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,'https://cdn.discordapp.com/avatars/636202587648950303/e634aa7a8dc92156ae2684812fd960fd.png?size=2048')
        message.channel.send(Mesaj)
      }
  })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['güven','güven-ölçer','confidence','confidence-meter'],
    permLevel: 0
}
exports.help = {
    name: 'güvenölçer',
    description: 'İki Kullanıcı Arasındaki Aşkı Ölçer.',
    usage: 'aşkölçer [@Kullanıcı]'
}
