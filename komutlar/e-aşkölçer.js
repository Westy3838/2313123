const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const DModule = require('@top-gg/sdk');
const db = require('quick.db')
exports.run = async (client, message, args) => {
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

 var ekontrol = await db.fetch(`dil_${message.guild.id}`)   
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
    .setAuthor('Error')
            .setColor(ayarlar.renk)
     
        message.channel.send({embed})
        return
    }
    var anasonuc = Math.floor(Math.random() * 101)
    var kalp = ''
    var akalp = ''
    if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0
        for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
            kalp += '❤️'
            c++
        }
        for(var x = c; x < 10; x++) {
            akalp += `🖤`
        }
    } else {
        var kalp = '🖤'
        var akalp = '🖤🖤🖤🖤🖤🖤🖤🖤🖤'
    }
    var yorum = `You should marry!`
    if(anasonuc < 80) {
        var yorum = 'You have to deal a little more.'
    }
    if(anasonuc < 60) {
        var yorum = 'It trips every once in a while.'
    }
    if(anasonuc < 40) {
        var yorum = 'Feels somethings.'
    }
    if(anasonuc < 20) {
        var yorum = 'Almost impossible.'
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} with ${s.tag} Love Result Between`,ayarlar.clientlogo)
        .setDescription(`Love Percentage: ${anasonuc}\n${kalp}${akalp}\n\n${yorum}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/637566911558713356/637956073080356894/tenor.gif')
        .setColor(ayarlar.renk)
        message.channel.send(embed)
            } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`You Must Vote To Use This Command (${prefix}vote)`,ayarlar.clientlogo)
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

        message.channel.send({embed})
        return
    }
    var anasonuc = Math.floor(Math.random() * 101)
    var kalp = ''
    var akalp = ''
    if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0
        for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
            kalp += '❤️'
            c++
        }
        for(var x = c; x < 10; x++) {
            akalp += `🖤`
        }
    } else {
        var kalp = '🖤'
        var akalp = '🖤🖤🖤🖤🖤🖤🖤🖤🖤'
    }
    var yorum = `Evlenecek Kadar Sevgi Var Aranızda.`
    if(anasonuc < 80) {
        var yorum = 'Biraz Daha Uğraşırsan Olacak.'
    }
    if(anasonuc < 60) {
        var yorum = 'Eh İşte Arada Trip Atıyor.'
    }
    if(anasonuc < 40) {
        var yorum = 'Az Da Olsa Bişeycikler Hissediyor Sana.'
    }
    if(anasonuc < 20) {
        var yorum = 'Maalesef Neredeyse İmkansız.'
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} Ve ${s.tag} Arasındaki Aşk Sonucu`,ayarlar.clientlogo)
        .setDescription(`Aşk Yüzdesi: ${anasonuc}\n${kalp}${akalp}\n\n${yorum}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/637566911558713356/637956073080356894/tenor.gif')
        .setColor(ayarlar.renk)
        message.channel.send(embed)
            } else {
        const Mesaj = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bu Özelliği Kullanabilmek için 12 Saatte Bir Vote Vermen Gerekiyor. (${prefix}vote)`,ayarlar.clientlogo)
        message.channel.send(Mesaj)
      }
  })
    
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['aşk-ölçer', 'ask-olcer', 'askolcer', 'ask', 'aşk','lovemeter','love','love-meter'],
    permLevel: 0
}
exports.help = {
    name: 'aşkölçer',
    description: 'İki Kullanıcı Arasındaki Aşkı Ölçer.',
    usage: 'aşkölçer [@Kullanıcı]'
}
