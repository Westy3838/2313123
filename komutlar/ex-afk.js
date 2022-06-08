const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
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
  if(!message.guild.me.permissions.has("MANAGE_NICKNAMES")) return message.channel.send(`${ayarlar.wx} **Kullanıcı İsimlerini Yönet Yetkim Yok!**`)
 
  let sebep = args.join(" ");


  //TANIMLAR
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  const sebeptekrar = db.fetch(`afkSebep_${message.author.id}_${message.guild.id}`)
 
  let kullanıcı = message.guild.members.cache.get(message.author.id);

      if (kisi) return;
     if (sebeptekrar) return;

  if(!sebep) {
return message.channel.send(`${ayarlar.wx} **Sebep Belirtmek Zorundasın!**\n*${prefix}afk <sebep>*`)
} 
  if(sebep.length > 500) return message.channel.send(`${ayarlar.wx} AFK Sebebi 500 Karakteri Geçemez!`)

 
    const b = kullanıcı.displayName;
    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);
    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );
    //İŞLEM
   //KULLANICI ADI
   if(b.length >= 27 && message.member.roles.highest.position >= message.guild.members.resolve(client.user.id).roles.highest.position)
   {
    const embed = new Discord.MessageEmbed()
    .setDescription(`${message.author.username}, Kendini AFK moduna aldı.\n**Sebebi •** ${sebep}`)
    .setColor(ayarlar.renk)
    .setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/908787043881091123/westyafkgif.gif')
    .setFooter('İsmin çok uzun, ve rolüm senden altta AFK tagı ekleyemedim.')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
    return message.channel.send(embed)

   }
   
   
   else if(b.length >= 27) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`${message.author.username}, Kendini AFK moduna aldı.\n**Sebebi •** ${sebep}`)
      .setColor(ayarlar.renk)
      .setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/908787043881091123/westyafkgif.gif')
      .setFooter('İsmin çok uzun, AFK tagı ekleyemedim.')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
      return message.channel.send(embed)
    }
    // ROL BÜYÜKLÜĞÜ
     else if(message.member.roles.highest.position >= message.guild.members.resolve(client.user.id).roles.highest.position) {
    
        const embed = new Discord.MessageEmbed()
          .setDescription(`${message.author.username}, Kendini AFK moduna aldı.\n**Sebebi •** ${sebep}`)
          .setColor(ayarlar.renk)
          .setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/908787043881091123/westyafkgif.gif')
          .setFooter('Rolüm senden altta, AFK tagı ekleyemedim.')
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
          return message.channel.send(embed)
          
        } 
     //SUNUCU SAHİBİ 

else if(message.member.id == message.member.guild.owner.id) {
     const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author.username}, Kendini AFK moduna aldı.\n**Sebebi •** ${sebep}`)
  .setColor(ayarlar.renk)
  .setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/908787043881091123/westyafkgif.gif')
  .setFooter('Sunucu sahibisin, ismine AFK tagı eklenemedi.')
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
return message.channel.send(embed)
   }


  // HATASIZSA,
       const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author.username}, Kendini AFK moduna aldı.\n**Sebebi •** ${sebep}`)
        .setColor(ayarlar.renk)
        .setThumbnail('https://cdn.discordapp.com/attachments/748252221224910899/908787043881091123/westyafkgif.gif')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
message.channel.send(embed)
message.member.setNickname(`[AFK] ` + b)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk "
};