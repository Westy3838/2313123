const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db')
const moment = require("moment");
const ayarlar=require("./ayarlar.json");
const express = require('express');
const Topgg = require('@top-gg/sdk')
let talkedRecently = new Set();
/////
const app = express()
app.get('/', (req ) => req.send("Bot Aktif"))
app.listen(process.env.PORT, () => console.log('Port ayarlandı: ' + process.env.PORT))
//////////////////
const api = new Topgg.Api(ayarlar.dbltoken)
setInterval(() => {
  api.postStats({
    serverCount: client.guilds.cache.size,
  })

},3600000) // 1 SAAT

client.on("ready", () => {

  console.log(`Bütün komutlar başarıyla yüklendi`);

client.user.setPresence({ status: 'online' });
client.user.setActivity('sourcebilisim.com | w!yardım', { type: 'PLAYING' })
// 15 DAKİKA
})




client.on("message", async message => {

if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
    setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2000);
let prefix;
if(message.channel.type == "dm") return; 
if (db.has(`prefix_${message.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
}
  
if (db.has(`prefix_${message.guild.id}`) === false) {
  prefix = ayarlar.prefix
}

if(message.channel.type == "dm") return; 
  if (message.content.toLowerCase() === 'westyprefixkontrol') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setDescription(`${prefix}`)
    message.channel.send(Mesaj)
  }


  let client = message.client;
  if (message.author.bot) return;
  
  
  
  
  
  
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
console.log(`${message.author.tag}(${message.author.id}) | ${message.content}`)
client.channels.cache.get("925452732716961792").send(`\`\`${message.author.tag}(${message.author.id})\`\`\n\`\`\`Kullanılan Komut • ${message.content}\`\`\``);
  let perms = client.yetkiler(message);
  let cmd;
if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
 if (db.has(`karalist_${message.author.id}`) === true) {
   const Mesaj = new Discord.MessageEmbed()
   .setTitle('Sahibim Seni Karalisteye Almış  <a:havali:661931484499673112>')
   .setColor(ayarlar.renk)
    .setDescription("Ay kıyamam, çen beni mi kullancan çen?")
message.channel.send(Mesaj)
    return
      }
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

});




const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  
client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = -ayarlar.varsayilanperm  ;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

// AFK
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
if (msg.author.bot) return;
   if(msg.content.includes(kisi3)){

       const embed = new Discord.MessageEmbed()
        .setDescription(`Ups, etiketlediğin kişi kendini AFK moduna almış.\n**Sebebi • ** ${sebep}`)
        .setColor(ayarlar.renk)
        .setThumbnail(afk.avatarURL({ dynamic : true }))
     
        .setAuthor(`${msg.author.username}, AFK birini etiketledin!`, msg.author.avatarURL({ dynamic : true }))
msg.channel.send(embed)
   }
 }
if (msg.author.bot) return;
  if(msg.author.id === kisi){
    msg.member.setNickname(isim).catch(error => { 
  console.log('AFK tagı yok ya da silinemedi.')

})
    //SİLİNİŞLER
    db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
    db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
    db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)

    //AFK TAGI SİLİNEBİLDİYSE,
const embed = new Discord.MessageEmbed()
        .setDescription(`${msg.author.username}, AFK modundan çıkarıldın.`)
        .setColor(ayarlar.renk)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic : true }))
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic : true }))
   return msg.channel.send(embed)
 }
  
});
//AFK
// SAYAÇ BAŞLANGIÇ -   SAYAÇ BAŞLANGIÇ -   SAYAÇ BAŞLANGIÇ -   SAYAÇ BAŞLANGIÇ -   SAYAÇ BAŞLANGIÇ -   SAYAÇ BAŞLANGIÇ -  
client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`\`${db.fetch(`sayac_${message.guild.id}`)}\` Kullanıcıya Ulaştığımız İçin Sayaç Sıfırlandı!`)
        .setColor(ayarlar.renk);
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const kanal = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;
  
   var yazicik1 = [
	 "İşte Bunu Beklemiyordum!",
   "Veda Etmeden Nereye?",
   "Dostum... Üzdün.",
   "Hay Hay, Gidene Bay Bay.",
   "Daha Karpuz Kesecektik!",
   "Bana Haber Vermeden Mi?",
   "Çayın Daha Bitmemişti."

	]
  const kanalkontrol = member.guild.channels.cache.find(channel => channel.id === kanal);
  if(!kanalkontrol) return;
    var yazicik1 = yazicik1[Math.floor(Math.random(1) * yazicik1.length)]
const red = new Discord.MessageEmbed()
                          .setColor('RED')
                          .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284439511080/westygorusuruz.png')
                          .setAuthor(`${member.user.tag} ${yazicik1}`,member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .setThumbnail(member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .setDescription(`**${db.fetch(`sayac_${member.guild.id}`)}** Sayısına Ulaşmamıza **${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}** Kişi Kaldı!`)
                          member.guild.channels.cache.get(kanal).send(red)
                          
});

client.on("guildMemberAdd", async member => {
  const kanal = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

var yazicik = [
	 "Geldi, Hizaya Geçin! ",
   "Hoşgeldin, Merhaba Desene!",
   "Tam da Seni Bekliyordum!",
   "Nihayet, Sonunda Geldin.",
   "Umarım Pizza Getirmişsindir.",
   "Viyuuu, Hoşgeldin!",
   "Tam da Çayımı Yudumluyordum!",
   "Geldiğine Çok Sevindik!",
   "Az Önce İniş Yaptı."

	]
  const kanalkontrol = member.guild.channels.cache.find(channel => channel.id === kanal);
  if(!kanalkontrol) return;
    var yazicik = yazicik[Math.floor(Math.random(1) * yazicik.length)]
const green = new Discord.MessageEmbed()
                          .setColor('GREEN')
                          .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367283982311444/westyhosgeldin.png')
                          .setAuthor(`${member.user.tag} ${yazicik}`,member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .setThumbnail(member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .setDescription(`**${db.fetch(`sayac_${member.guild.id}`)}** Sayısına Ulaşmamıza **${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}** Kişi Kaldı!`)
                          member.guild.channels.cache.get(kanal).send(green)
                          
// SAYAÇ BİTİŞ -  SAYAÇ BİTİŞ -  SAYAÇ BİTİŞ -  SAYAÇ BİTİŞ -  SAYAÇ BİTİŞ -  SAYAÇ BİTİŞ -  SAYAÇ BİTİŞ 
});

//KLASİK CEVAPLAR BAŞLANGIÇ
client.on("message", async msg => {
  if(msg.channel.type == "dm") return; 
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'sa') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setDescription(`${msg.author} Aleyküm Selam, Hoş geldin! <:selam:648133867932221451>`)
    msg.channel.send(Mesaj)
    
  }
  }
 

  
    if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'hb') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Bu Arada Nasılsın? <:selam:648133867932221451>`)
    msg.channel.send(Mesaj)
    }
  }
        if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'sea') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Ase, Hoş geldin!<:selam:648133867932221451>`)
    msg.channel.send(Mesaj)
   
    }
  }
          if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'naber') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} İyi Senden N'aber?<:selam:648133867932221451>`)
    msg.channel.send(Mesaj)
   
    }
  }
   if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'hoşbulduk') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Bu Arada Nasılsın? <:selam:648133867932221451>`)
    msg.channel.send(Mesaj)
    }
  }
   if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'hosbulduk') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Bu Arada Nasılsın? <:selam:648133867932221451>`)
   msg.channel.send(Mesaj)
    }
  }
      if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'selam') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setDescription(`${msg.author} Aleyküm Selam, Hoş geldin! <:selam:648133867932221451>`)
    msg.channel.send(Mesaj)
    }
  }
   if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'selamın aleyküm') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Aleyküm Selam, Hoş geldin! <:selam:648133867932221451>`)
   msg.channel.send(Mesaj)
    }
  }
   if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'selamün aleykum') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Aleyküm Selam, Hoş geldin! <:selam:648133867932221451>`)
   msg.channel.send(Mesaj)
    }
  }
  if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Aleyküm Selam, Hoş geldin! <:selam:648133867932221451>`)
   msg.channel.send(Mesaj)
    }
  }
    
  
    if (saas == 'kapali') return;
    if (saas == 'acik') {
    if (msg.content.toLowerCase() === 'nasılsınız') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} İyiyiz İyi, Seni Sormalı? <a:tavsancik:656506786198585384>`)
    msg.channel.send(Mesaj)
   
    }
  }
    if (saas == 'kapali') return;
    if (saas == 'acik') {
    if (msg.content.toLowerCase() === 'günaydın') {
      const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Sana da Günaydın! :sunny:`)
   msg.channel.send(Mesaj)
    }
  }
  if (saas == 'kapali') return;
    if (saas == 'acik') {
    if (msg.content.toLowerCase() === 'gunaydin') {
       const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Sana da Günaydın! :sunny:`)
   msg.channel.send(Mesaj)
    }
  }
  if (saas == 'kapali') return;
    if (saas == 'acik') {
    if (msg.content.toLowerCase() === 'iyi geceler') {
        const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setDescription(`${msg.author} İyi Geceler :crescent_moon:`)
    msg.channel.send(Mesaj)
    }
  }
  if (saas == 'kapali') return;
    if (saas == 'acik') {
    if (msg.content.toLowerCase() === 'iyiyim') {
           const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setDescription(`${msg.author} İyi Olmana Sevindim! <a:tavsancik:656506786198585384>`)
    msg.channel.send(Mesaj)
    }
  }
  if (saas == 'kapali') return;
    if (saas == 'acik') {
    if (msg.content.toLowerCase() === 'kötüyüm') {
      const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setDescription(`${msg.author} Neden ki? <:huu:648130761630679040>`)
   msg.channel.send(Mesaj)
    }
  }
// KLASİK CEVAPLAR BİTİŞ
  // FUN CEVAPLAR BAŞLANGIÇ
  });
 client.on("message", async msg => {
  if(msg.channel.type == "dm") return;
  let funoto = await db.fetch(`funoto_${msg.guild.id}`);
  if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'westy saldır') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} S400 Füzeleri! :rocket: :rocket:`);
   msg.channel.send(Mesaj)
    
  }
  }
    if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'silivri soğuktur') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Silivri Soğuktur :snowflake:`);
    msg.channel.send(Mesaj)
    
  }
  }
   if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'barış ab') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Barış :ab: Harekatı!!`);
   msg.channel.send(Mesaj)
    
  }
  }
     if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'interesting') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Interesting <:hmm:648130877955637248>`);
   msg.channel.send(Mesaj)
    
  }
  }
    
     if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'ban ban ban') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setTitle(`${msg.author.tag} Aynen Katılıyorum`)
    .setDescription('Banlayın Şunu Hacım Ya, Ban Ban Ban!')
    .setThumbnail('https://cdn.discordapp.com/emojis/705922953707126844.gif');
    msg.channel.send(Mesaj)
    
  }
  }
       if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'yazık') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Yazık Kafana :brain:`);
    msg.channel.send(Mesaj)
    
  }
  }
         if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'çok ayıp') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(`${msg.author} Çok Ayıp Krşm Birdaha Görmim <:ipnelik:648133561970458634>`);
    msg.channel.send(Mesaj);
    
  }
  }

           if (funoto == 'kapali') return;
  if (funoto == 'acik') {
  if (msg.content.toLowerCase() === 'westy') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setDescription(`${msg.author} Efendim? <:mutlu:648133652982530071>`);
    msg.channel.send(Mesaj)
    
  }
  }
 // FUN CEVAPLAR BİTİŞ
  // TROLL CEVAPLAR BAŞLANGIÇ
})  
client.on("message", async msg => {
  if(msg.channel.type == "dm") return;
  let troll = await db.fetch(`troll_${msg.guild.id}`);
  if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'sen kimsin ya') {
    const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
     .setTitle(`Sen Kimsin Ya?`)
    .setDescription('Sen Kim Oluyorsun? Haddini Bil!')
    .setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/740942342676021308/senkimsinya.jpg')
    msg.channel.send(Mesaj)
    
  }
  }
 if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'bot kendine gelsin') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setTitle(`Bir Sakin Ol, Bot Kendine Gelsin`)
    .setDescription('-Depp(Bot Sahibi)')
    .setThumbnail('https://cdn.discordapp.com/avatars/473070737851285515/0d1b98ffcd724cf61a3421ba1281f8bf.png?size=1024')
    msg.channel.send(Mesaj);
    
  }
  }
 if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'bekle kendine gelsin') {
     const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setTitle(`Bir Sakin Ol, Bot Kendine Gelsin`)
    .setDescription('-Gaester(Bot Geliştiricisi)')
    .setThumbnail('https://cdn.discordapp.com/avatars/319240233944219668/18d23af7cf3d7614de8a93d0f31aff4b.png?size=1024')
    msg.channel.send(Mesaj);
    
  }
  }

   if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'alçak puşt') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('Alçak, Puşt!')
    .setDescription(`Sen Abdülhamid'i Savundun!`)
.setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/740942644468777020/alcakpust.jpg')
    msg.channel.send(Mesaj)
    }
  }
     if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'kahkaha tufanı') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('Bu bir roman,hikaye,bu bir aşk. Bu bir sanat. O kadar güldüm ki gülerken kendimi sanatçı gibi hissettim. Kahkaha şelalesinden bir yudum aldım. Öyle komik ki, anlatamıyorum bile.')
  
.setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/740943405214859274/kahkahatufan.png')
    msg.channel.send(Mesaj)
    }
  }

  
         if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'oldu mu knk') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('+ Oldu knk ')
  
    msg.channel.send(Mesaj)
    }
  }
           if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'haram bro') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('WOWOWOWOW')
.setDescription('It is haram bro.')
.setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/740943532411322578/harambro.jpg')
  
    msg.channel.send(Mesaj)
    }
  }
             if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'ama bu sahtekarlık') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('Ama Bu Sahtekarlık!')
.setDescription('Allah Allah, Olur mu Öyle?')
.setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/740943779045048372/amabusahtekarlik.jpg')
  
    msg.channel.send(Mesaj)
    }
  }
  
              if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'öyle istemişim öyle olmuş') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('Öyle İstemişim Öyle Olmuş')
.setDescription('-Mrtol')
.setThumbnail('https://cdn.discordapp.com/attachments/717477574875414559/740944038328401970/mrtol.jpg')
  
    msg.channel.send(Mesaj)
    }
  }
                if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'go brrr') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('Go PrRrrR')

.setImage('https://cdn.discordapp.com/attachments/567415625278816323/736522721961181225/go_brr.png')
  
    msg.channel.send(Mesaj)
    }
  }
 
                if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'bir dakika') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('One Minute!')
.setDescription('Sesin Çok Yüksek Çıkıyor')
.setThumbnail('https://cdn.discordapp.com/attachments/637379393475575818/764222011588476948/unknown.png')

  
    msg.channel.send(Mesaj)
    }
  }  if (troll == 'kapali') return;
  if (troll == 'acik') {
  if (msg.content.toLowerCase() === 'one minute') {
const Mesaj = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
.setTitle('One Minute!')
.setDescription('Sesin Çok Yüksek Çıkıyor')
.setThumbnail('https://cdn.discordapp.com/attachments/637379393475575818/764222011588476948/unknown.png')

  
    msg.channel.send(Mesaj)
    }
  }
});


// TROLL CEVAPLAR BİTİŞ
//eventse atılcak


client.on('guildMemberAdd', async (member, message) => {
 
if (db.has(`${member.guild.id}_otorol`) == false) return;
if (db.has(`${member.guild.id}_otokanal`) == false) return;
  if(db.has(`${member.guild.id}_otorol`)) {

    var rolID = db.fetch(`${member.guild.id}_otorol`)
    member.roles.add(rolID).catch(error => { console.log('OTOROL | Rol eklenemedi')})
  } 

  if(db.has(`${member.guild.id}_otokanal`)) {

    var kanal = await db.fetch(`${member.guild.id}_otokanal`)

    const kanalkontrol = member.guild.channels.cache.find(channel => channel.id === kanal);
    if(!kanalkontrol) return;
   member.guild.channels.cache.get(kanal).send(new Discord.MessageEmbed()
     .setColor('GREEN')
    .setAuthor(`${member.user.tag}  `,member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
    .setDescription(`» Hoşgeldin ${member.user.username}, Rolün Otomatik Olarak Verildi <a:geldi:638665597034692638>`))
  } else {
    return;
  }
});
  
  client.on('guildMemberAdd', async (member, guild, message) => {
if (db.fetch(`${member.guild.id}_ototag`) == false) return;
if (db.fetch(`${member.guild.id}_ototagKanal`) == false) return;
if (db.fetch(`${member.guild.id}_kayıt`) == false) return;
  let ototag = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagKanal_${member.guild.id}`)
  const kanalkontrol = member.guild.channels.cache.find(channel => channel.id === kanal);
  if(!kanalkontrol) return;

 
    let nick = member.user.username
    if(nick.length >= "28") { 
      member.guild.channels.cache.get(kanal).send(new Discord.MessageEmbed()
      .setColor('RED')
      .setAuthor(`${member.user.tag}  `,member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
      .setDescription(`» Hoşgeldin ${member.user.username}, Tagın Verilemedi İsmin Çok Uzun <a:hayir:719220904130904145>`))
   return;

    
    }
    if(nick.length < "28") { 
      member.setNickname(`${ototag} ${nick}`)} 
 
    
  member.guild.channels.cache.get(kanal).send(new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setAuthor(`${member.user.tag}  `,member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                                        .setDescription(`» Hoşgeldin ${member.user.username}, Tagın Otomatik Olarak Verildi <a:geldi:638665597034692638>`))
                                     
  
  });
 client.on('guildCreate', guild => {

    let kermit = guild.channels.cache.filter(c => c.type === "text").random()
   kermit.send("**Hey Beni Sunucuna Eklediğin İçin Teşekkürlerl!**\n**Bir Sorun Yaşarsan Destek Sunucusuna Gelebilirsin**\n\ndiscord.gg/uFuW6pF");
   const embed = new Discord.MessageEmbed()
   .setColor(ayarlar.renk)
   .setAuthor('Westy • Gizlilik Politikası',ayarlar.clientlogo)
   .setTitle('Botu Sunucuya Eklediğiniz Andan İtibaren Kabul Etmiş Sayılırsınız')
   .addField('Kullanılan Kullanıcı Verileri',`• Herhangi bir komut kullanımı halinde,
   Saklanmasına tabii olunan veriler;\n
   **> A | Kullanıcı Verileri**
   • Kullanıcı ID
   • Kullanıcı profil
   • Discord kayıt tarihi
   • Sunucu katılım tarihi
   • Komut geçmişi
   **•** Bot içi veriler
   • İmparatorluk sistemi\n
   **> B | Sunucu Verileri**
   • Sunucu ID
   • Rol bilgileri
   • Yetki bilgileri
   • Eklenme tarihi
   • Üye sayısı
   • Westy ayarlanabilir içerikler\n
  **WESTY SUNUCUYA EKLENDİĞİNDEN İTİBAREN TÜM ŞARTLAR GEÇERLİDİR, VERİLERİN SİLİNMESİ İÇİN WESTY\'İ SUNUCUDAN ATMANIZ YETERLİ**`)
   .setFooter('Her hakkı saklıdır Westy Bot © 2022')
   kermit.send(embed)
});



client.on("guildMemberRemove", async member => {
  const kanal = db.fetch(`sKanalay_${member.guild.id}`);
  
   var yazicik1 = [
	 "İşte Bunu Beklemiyordum!",
   "Veda Etmeden Nereye?",
   "Dostum... Üzdün.",
   "Hay Hay, Gidene Bay Bay.",
   "Daha Karpuz Kesecektik!",
   "Bana Haber Vermeden Mi?",
   "Çayın Daha Bitmemişti."

	]
    var yazicik1 = yazicik1[Math.floor(Math.random(1) * yazicik1.length)]
 member.dctarih = moment.utc(member.user.createdAt).format('YYYY [Yılında] MMMM [Ayında] dddd [Gününde] (DD/MM/YYYY)')

        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)

        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)
  
let süre = new Date().getTime() - member.user.createdAt.getTime()
let kontrol;
     if(süre < 3600000) kontrol = 'Güvensiz'
     if(süre < 1296000000) kontrol = 'Şüpheli'
     if(süre > 1296000000) kontrol = 'Orta'
     if(süre > 31556926000) kontrol = 'Güvenli'
     const kanalkontrol = member.guild.channels.cache.find(channel => channel.id === kanal);
     if(!kanalkontrol) return;

const red = new Discord.MessageEmbed()
                          .setColor('RED')
                          .setTitle(`${member.user.tag}`)
                          .setAuthor(`${yazicik1}`,member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .setThumbnail(member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .addField(':id: ID Kimliği',member.id)
                          .addField(`:bell: Güvenlik Durumu`,kontrol)
                          .addField(':date: Hesabın Kurulma Tarihi',member.dctarih)               
                          member.guild.channels.cache.get(kanal).send(red)
                      
});
client.on("guildMemberAdd", async member => {
  const kanal = db.fetch(`sKanalay_${member.guild.id}`);  
  if(kanal == undefined) {
    return;
  }
var yazicik = [
	 "Geldi, Hizaya Geçin! ",
   "Hoşgeldin, Merhaba Desene!",
   "Tam da Seni Bekliyordum!",
   "Nihayet, Sonunda Geldin.",
   "Umarım Pizza Getirmişsindir.",
   "Viyuuu, Hoşgeldin!",
   "Tam da Çayımı Yudumluyordum!",
   "Geldiğine Çok Sevindik!",
   "Az Önce İniş Yaptı."

	]
    var yazicik = yazicik[Math.floor(Math.random(1) * yazicik.length)]
 member.dctarih = moment.utc(member.user.createdAt).format('YYYY [Yılında] MMMM [Ayında] dddd [Gününde] (DD/MM/YYYY)')

        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)

        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)
let süre = new Date().getTime() - member.user.createdAt.getTime()
let kontrol;
       if(süre < 3600000) kontrol = 'Güvensiz'
     if(süre < 1296000000) kontrol = 'Şüpheli'
     if(süre > 1296000000) kontrol = 'Orta'
     if(süre > 31556926000) kontrol = 'Güvenli'
  
     const kanalkontrol = member.guild.channels.cache.find(channel => channel.id === kanal);
     if(!kanalkontrol) return;
    
 const green = new Discord.MessageEmbed()
                          .setColor('GREEN')
                          .setTitle(`${member.user.tag}`)
                          .setAuthor(`${yazicik}`,member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .setThumbnail(member.user.avatarURL({dynamic: true}) || "https://cdn.discordapp.com/attachments/748252221224910899/924370077720121354/profilsizwesty.png")
                          .addField(':id: ID Kimliği',member.id)
                          .addField(`:bell: Güvenlik Durumu`,kontrol)
                          .addField(':date: Hesabın Kurulma Tarihi',member.dctarih)
                          member.guild.channels.cache.get(kanal).send(green)
                          

// ASAYAÇ BİTİŞ -  ASAYAÇ BİTİŞ -  ASAYAÇ BİTİŞ -  ASAYAÇ BİTİŞ - ASAYAÇ BİTİŞ - A SAYAÇ BİTİŞ -  ASAYAÇ BİTİŞ 
});




client.on("guildCreate", async(guild) => {
    const fetchedChannel = await client.channels.fetch(`785221657395462164`);
    const EmbedJoin = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setAuthor("📁 LOG")
    .setTitle(`Joined Guild • ${guild.name || "Unknown"}`)
    .setDescription(`Members • ${guild.memberCount || "Unknown"}`)
    .setTimestamp()
    console.log(`Joined New Guild • ${guild.name || "Unknown"}`);
    fetchedChannel.send(EmbedJoin)
});

//Left Guild

client.on("guildDelete", async(guild) => {
if(guild.name == undefined) return;
const fetchedChannel = await client.channels.fetch(`785221657395462164`);
    const EmbedLeave = new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor("📁 LOG")
    .setTitle(`Left Guild • ${guild.name || "Unknown"}`)
    .setDescription(`Members • ${guild.memberCount || "Unknown"}`)
    .setTimestamp()
    console.log(`Left Guild • ${guild.name || "Unknown"}`);
    fetchedChannel.send(EmbedLeave)
});

client.login(ayarlar.token)
require('discord-buttons')(client);
