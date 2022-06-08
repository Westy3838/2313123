const Discord = require('discord.js');
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
	let csgopng = "https://cdn.discordapp.com/attachments/447829045376319500/516564269584744448/csgo.png"
    var virus = [
		"**Korona Virüs Testin = Pozitif**\n **Acilen Hastaneye Gitmen Lazım!**",
      "**Korona Virüs Testin = Negatif**\n **Testin Negatif ama Dikkatli Ol!**",
      "**Korona Virüs Testin = Pozitif**\n **Kelle Paça İç Geçer.**",
      "**Korona Virüs Testin = Nezitif**\n **Yeni Bir Tür! Kolonya Sıktığın Anda Ölür. **",
      "**Korona Virüs Testin = Pozitif**\n **14 Gün Karatinadasın!**",
      "**Korona Virüs Testin = Negatif**\n **Doğruluk Oranı %1 :(**",
      "**Korona Virüs Testin = Pozitif**\n **Yarasa Çorbası İçtiğin Tespit Edildi!**",
      "**Korona Virüs Testin = Pogatif**\n **Virüs Mutasyon Geçirdi, Artık CAVİT-10 Virüsünün Saldırısı Altındasın!**"

	]
    var virus = virus[Math.floor(Math.random(1) * virus  .length)]
	const embed  = new Discord.MessageEmbed()
	.setImage("https://cdn.discordapp.com/attachments/640287918623162449/694581098373447761/download.jpg")
	.setAuthor('Westy • Korona Virüs Testi',ayarlar.clientlogo)
	.setDescription(`${virus}`)
	.setColor(ayarlar.renk)
	return message.channel.send(embed);
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
  aliases: ['korona','coronavirus','corona'],
  permLevel: 0
};

exports.help = {
  name: 'koronavirüs',
  description: '',
  usage: ''
};