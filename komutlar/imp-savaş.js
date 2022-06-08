const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
exports.run = async (client, message, args, bot) => {
  const perms  = [
    "SEND_MESSAGES",
    "ADD_REACTIONS",
    "MANAGE_MESSAGES"
  ];
  
  const names = {
    SEND_MESSAGES: "• Mesaj Gönderme",
    ADD_REACTIONS: "• Tepki Ekleme",
    MANAGE_MESSAGES: "• Mesajları Yönet"
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
 if (talkedRecently.has(message.author.id)) {
           return message.channel.send(`${ayarlar.wx} **Bu komutu 10 saniyede bir kullanabilirsin!**`);
    } else {
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
let u = message.mentions.users.first()
let s = message.mentions.users.first()
if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • Savaş Bilgi',client.user.avatarURL())
.setTitle('İmparatorluk Savaşı Nasıl Çalışır?')
.setDescription(`**Kullanım Şekli: ${prefix}savaş <@Kişi> <100/500/1000/10000>**\n\nÖncelikle toplam akçeniz **seçilen savaş tutarından fazla olmalı.** Kazanan taraf karşı tarafın **seçilen akçe sayısını** alır.\nTüm birlikler sırasıyla birbiriyle sayıları ele alınarak **ihtimaller dahilinde** savaşırlar. Her birliğin **zafer sonucu puanı** vardır. Kazanan birliklerin **zafer sonucu puanları** toplanır.`))
if(!u) return message.channel.send(new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • İmparatorluk Savaşı',client.user.avatarURL())
.setTitle('Olmayan Birine Saldıramazsın!')
.setDescription('İnsan vs Hiçlik'))
if (s.bot) return message.channel.send(new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • İmparatorluk Savaşı',client.user.avatarURL())
.setTitle('Bota Saldıramazsın!')
.setDescription('İnsan vs Robot'))

   var ok = ['Kafayı mı Sıyırdın?','Birbirini Gösteren Spider-Man.',`${u.username} vs ${u.username}! Şaka Şaka.`,'İyi Deneme!','Çok Zekisin Ama Benim Kadar Değil <:hawali:712573705494069279>']
     var ok = ok[Math.floor(Math.random(1) * ok.length)]
if (u == message.author.id) return message.channel.send(new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • İmparatorluk Savaşı',client.user.avatarURL())
.setTitle('Kendine Meydan Okuyamazsın!')
.setDescription(ok))
var savaştutarı = Number(args[1])


    let parapara = await db.fetch(`para_${message.author.id}`)  
if(parapara < savaştutarı) return message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • İmparatorluk Savaşı',client.user.avatarURL())
    .setTitle(`${message.author.username}, İmparatorluk Müsabakasıİsteği Yollayamazsın!`)
    .setDescription(`Savaş müsabakası isteği yollayabilmek için **savaş tutarı kadar akçeye** sahip olmalısın!`))

  if (!u) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Lütfen savaşılacak kişiyi etiketleyiniz!")
        .setColor(ayarlar.renk)

    );
  }
if(!savaştutarı) return message.channel.send(new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • Savaş Tutarı',client.user.avatarURL())
.setTitle('Bir Savaş Tutarı Belirtmelisin!')
.setDescription(`**Savaş Tutarları**\n\`100\`\n\`500\`\n\`1000\`\n\n**Örnek Kullanım •** ${prefix}savaş @Palaur 100/500/1000/10000\nSadece **bu tutarlar** seçilebilir.`))
if(savaştutarı == 100 || savaştutarı == 500 || savaştutarı == 1000 || savaştutarı == 10000) {  const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Savaş İsteği',client.user.avatarURL())
    .setTitle(`${message.author.username} Bir Savaş İsteği Yolladı!`)
    .setDescription(`**${u.username}, ${message.author.username} Adlı şahısla savaş yapmayı onaylıyor musun?**\nKazanan, karşı tarafın **${savaştutarı} akçesini** alır.Savaş için **en az ${savaştutarı} akçeye** sahip olmalısın.`)
  
    .setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781862107439431680/imparatorluk.png')

  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && u.id === user.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });

    reactions.on("end", () => sentEmbed.edit(":timer: **Savaş isteği süresi sona erdi**"));
 
    
reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
 reaction.remove("✅")
      
  let parapara = await db.fetch(`para_${u.id}`) 
if(parapara < savaştutarı) return message.channel.send(new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Westy • Savaş Müsabakası',client.user.avatarURL())
    .setTitle(`${u.username}, Savaş Müsabakası İsteği Kabul Edemezsin`)
    .setDescription(`Savaş müsabakası isteği kabul edebilmek için **en az ${savaştutarı} akçeye** sahip olmalısın!`))

let asker = await db.fetch(`asker_${message.author.id}`) || 0
let okçu = await db.fetch(`okçu_${message.author.id}`) || 0
let süvari = await db.fetch(`süvari_${message.author.id}`) || 0
let ejder = await db.fetch(`ejderha_${message.author.id}`) || 0

let askeru = await db.fetch(`asker_${u.id}`) || 0
let okçuu = await db.fetch(`okçu_${u.id}`) || 0
let süvariu = await db.fetch(`süvari_${u.id}`) || 0
let ejderu = await db.fetch(`ejderha_${u.id}`) || 0

//GAESTER PRODUCTION A.Ş || SAVAŞ SİSTEMİ TEST - INTRODUCTION
let askercik = 0;
let okçucuk = 0;
let süvaricik = 0;
let ejdercik = 0;
let puan = 0;
let puanu = 0;
let asker_kazanma_durum;
let okçu_kazanma_durum;
let süvari_kazanma_durum;
let ejder_kazanma_durum;

const savaşembed = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setTitle(`${message.author.username} <a:vsgif:855769936865787944> ${u.username}`)
.setAuthor(`İMPARATORLUKLAR SAVAŞIYOR!`,ayarlar.clientlogo)
.setImage('https://cdn.discordapp.com/attachments/855770218357456936/855770449178656798/suvarigif.gif')
message.channel.send(savaşembed)
.then(msg => {
const savaşembed = new Discord.MessageEmbed()
.setColor(ayarlar.renk)

.setAuthor(`SAVAŞ SONA ERDİ`,ayarlar.clientlogo)
.setImage('https://cdn.discordapp.com/attachments/855770218357456936/855777238963978290/beyazbayrak.gif')
setTimeout(() => { msg.edit(savaşembed)},4600)
})


const random_sayi = Math.ceil(Math.random()*100);
// 0 İSE İHTİMALLER
 

  //eşitse
if (asker >= 1 && askeru >= 1 && asker == askeru){
        if(random_sayi<51 && random_sayi>0){
        
          asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %50`;
          puanu+=2;
        }else{
      
       asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %50`;
          puan+=2;
      }
}

       //----SONSUZLUK
else if(asker > askeru){
if(asker-askeru>250 && asker-askeru<=Infinity){
  
               asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`;
              puan+=2;
       
        }
 }
  //-------------------------
 else if(askeru > asker){
if(askeru-asker>250 && askeru-asker<=Infinity){
              
              asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
              puanu+=2;
            }
  }
//----

// 0 
if(asker == 0 && askeru == 0){
  
   asker_kazanma_durum="Kazanan • Hiç Kimse";
askercik+=1;
  } 

if(asker == 0 && askeru > 0){

   asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
askercik+=1;
   puanu+=2;
  } 
if(askeru == 0 && asker > 0){
 
  asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`
askercik+=1;
  puan+=2;
  
}
// 0 İSE İHTİMALLER SON
  // 10 ASKER FARKI
if(askercik == 0){

  
if(asker > askeru){
        if(asker-askeru>=1 && asker-askeru<=10){
            if(random_sayi>0 && random_sayi<53){
  
               
                asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %52`;
                puan+=2;
            }
            else if(random_sayi>52 && random_sayi<101){


               
                asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %48`;
              puanu+=2;  
            }
        }
    }
  //-------------------------
  else if(askeru > asker){
  if(askeru-asker>=1 && askeru-asker<=10){
            if(random_sayi>0 && random_sayi<53){


                
                asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %52`;
                puanu+=2;
            }
            else if(random_sayi>52 && random_sayi<101){


               
              asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %48`;
              puan+=2;
            }
        }
  }
  
  // 10 ASKER FARKI SON
  //50 ASKER FARKI
  if(asker > askeru){
        if(asker-askeru>10 && asker-askeru<=50){
            if(random_sayi>0 && random_sayi<61){
   

             
              asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %60`;
              puan+=2;
            }
            else if(random_sayi>60 && random_sayi<101){
   

               
                asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %40`;
                puanu+=2;
            }
        }
  }
  //-------------------------
  else if(askeru > asker){
  if(askeru-asker>10 && askeru-asker<=50){
            if(random_sayi>0 && random_sayi<61){
 

                
                asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %60`;
                puanu+=2;
            }
            else if(random_sayi>60 && random_sayi<101){
               
               asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %40`;
              puan+=2;
            }
        }
  }
  //-------------------------

  //50 ASKER FARKI SON 
  //100 ASKER FARKI 
if(asker > askeru){
        if(asker-askeru>50 && asker-askeru<=100){
            if(random_sayi>0 && random_sayi<76){
   

                 
                 asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %75`;
              puan+=2;
            }
            else if(random_sayi>75 && random_sayi<101){
  

                
                asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %25`;
              puanu+=2;
            }
        }
  }
  //-------------------------
  else if(askeru > asker){
  if(askeru-asker>50 && askeru-asker<=100){
            if(random_sayi>0 && random_sayi<76){
               
               asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %75`;
              puanu+=2;
            }
            else if(random_sayi>75 && random_sayi<101){
            
              asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %25`;
              puan+=2;
            }
        }
  }
  //100 ASKER FARKI SON
  // 250 ASKER FARKI
 if(asker > askeru){
        if(asker-askeru>100&&asker-askeru<=250){


            if(random_sayi>0 && random_sayi<91){
              
               asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %90`;
              puan+=2;
            }
            else if(random_sayi>90 && random_sayi<101){
              
               asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %10`;
              puanu+=2;
            }
        }
  }
  //-------------------------
  else if(askeru > asker){
  if(askeru-asker<=250 && askeru-asker>100){
            if(random_sayi>0 && random_sayi<91){
             
              asker_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %90`;
              puanu+=2;
            }
            else if(random_sayi>90 && random_sayi<101){
             
              asker_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %10`;
              puan+=2;
            }
        }
  }
} // askercik yoklama
  //250 ASKER FARKI SON


 
        





// OKÇU SAVAŞI 31
// 0 İSE İHTİMALLER 
//eşitse
 if (okçu >= 1 && okçuu >= 1 && okçu == okçuu){
        if(random_sayi<51 && random_sayi>0){
        
          okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %50`;
          puanu+=3;
        }else{
      
       okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %50`;
       puan+=3;
      }
}
 //--
if(okçu > okçuu){
if(okçu-okçuu>250 && okçu-okçuu<=Infinity){
 
               okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`;
              puan+=3;
       
        }
 }
  //-------------------------
 else if (okçuu-okçu>250 && okçuu-okçu<=Infinity){
             
              okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
              puanu+=3;
            }
if(okçuu == 0 && okçu == 0){

okçu_kazanma_durum="Kazanan • Hiç Kimse";
okçucuk+=1;
} 
      if(okçu == 0 && okçuu >0) {

        okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
        puanu+=3;
 okçucuk+=1;
      }

 else if(okçuu == 0 && okçu >0) {

okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`;
   puan+=3;
okçucuk+=1;
 }

 
// 0 İSE İHTİMALLER SON
// 10 okçu FARKI 
if(okçucuk == 0){
if(okçu > okçuu){
      if(okçu-okçuu>=1 && okçu-okçuu<=10){
          if(random_sayi>0 && random_sayi<53){


             
             okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %52`;
            puan+=3;
          }
          else if(random_sayi>52 && random_sayi<101){
 

              
             okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %48`;
            puanu+=3;
          }
      }
  }
//-------------------------
else if(okçuu > okçu){
if(okçuu-okçu>=1 && okçuu-okçu<=10){
          if(random_sayi>0 && random_sayi<53){
              
              okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %52`;
              puanu+=3;

          }
          else if(random_sayi>52 && random_sayi<101){
             
             okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %48`;
            puan+=3;
          }
      }
}

// 10 okçu FARKI SON
//50 okçu FARKI
 if(okçu > okçuu){
      if(okçu-okçuu<=50 && okçu-okçuu>10){
          if(random_sayi>0 && random_sayi<61){
 
          
            okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %60`;
            puan+=3;
          }

          else if(random_sayi>60 && random_sayi<101){
             
              okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %40`;
            puanu+=3;
          }
      }
}
//------------------------

else if(okçuu > okçu){
    if(okçuu-okçu<=50 && okçuu-okçu>10){
          if(random_sayi>0 && random_sayi<61){
             
              okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %60`;
            puanu+=3;
          }
          else if(random_sayi>60 && random_sayi<101){
             
             okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %40`;
            puan+=3;
          }
      }
}

//50 okçu FARKI SON 
//100 okçu FARKI 
if(okçu > okçuu){
      if(okçu-okçuu<=100 && okçu-okçuu>50){
          if(random_sayi>0 && random_sayi<76){
               
               okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %75`;
            puan+=3;
          }
       
          else if(random_sayi>75 && random_sayi<101){
             
              okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %25`;
            puanu+=3;
          }
      }
  
}
//------------------------
else if(okçuu > okçu){
if(okçuu-okçu<=100 && okçuu-okçu>50){
          if(random_sayi>0 && random_sayi<76){
            
             okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %75`;
            puanu+=3;
          }
          else if(random_sayi>75 && random_sayi<101){
            
            okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %25`;
            puan+=3;
          }
      }
}
//100 okçu FARKI SON
// 250 okçu FARKI
if(okçu > okçuu){
      if(okçu-okçuu<=250 && okçu-okçuu>100){
          if(random_sayi>0 && random_sayi<91){
             
             okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %90`;
            puan+=3;
          }
          else if(random_sayi>90 && random_sayi<101){
        
             okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %10`;
            puanu+=3;
          }
      }
}
//------------------------
else if(okçuu > okçu){
if(okçuu-okçu<=250 && okçuu-okçu>100){
          if(random_sayi>0 && random_sayi<91){
           
            okçu_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %90`;
            puanu+=3;
          }
//------------------------
          else if(random_sayi>90 && random_sayi<101){
         
            okçu_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %10`;
            puan+=3;
          }
      }
}
} //okçucuk teyit parantezi
//250 okçu FARKI SON

  


//----------------

// eşit ise
 if(süvari >= 1 && süvariu >= 1 && süvari == süvariu){
        if(random_sayi<51 && random_sayi>0){
         
          süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %50`;
          puanu+=5;
        }else{

       süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %50`;
          puan+=5;
      }
}
//----SONSUZLUK
else if(süvari > süvariu){
if(süvari-süvariu>100 && süvari-süvariu<=Infinity){
  
               süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`;
              puan+=5;
       
        }
 }
  //-------------------------
  else if(süvariu > süvari){
if(süvariu-süvari>100 && süvariu-süvari<=Infinity){
              
              süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
              puanu+=5;
            }
  }
//SÜVARİ BAŞLANGIÇ
 if(süvari == 0 && süvariu == 0){

   süvari_kazanma_durum="Kazanan • Hiç Kimse";
süvaricik+=1;
  } 
if(süvari > 0 && süvariu == 0) {

süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`;
puan+=5;
süvaricik+=1;
}
else if(süvariu > 0 && süvari == 0) {

süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
puanu+=5;
süvaricik+=1;
}

  
  // 0 İSE İHTİMALLER SON
  // 10 süvari FARKI
if(süvaricik == 0) {
   if(süvari > süvariu){
        if(süvari-süvariu>=1 && süvari-süvariu<=10){
            if(random_sayi>0 && random_sayi<56){
               
               süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %55`;
               puan+=5;
            }
            else if(random_sayi>55 && random_sayi<101){
           
                süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %45`;
              puanu+=5;
            }
        }
    }
  //-------------------------
  else if(süvariu > süvari){
  if(süvariu-süvari>=1 && süvariu-süvari<=10){
            if(random_sayi>0 && random_sayi<56){
                
                süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %55`;
              puanu+=5;

            }
            else if(random_sayi>55 && random_sayi<101){
              
               süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %45`;
              puan+=5;
            }
        }
  }
  
  // 10 süvari FARKI SON
  //20 süvari FARKI
   if(süvari > süvariu){
        if(süvari-süvariu>10 && süvari-süvariu<=20){
            if(random_sayi>0 && random_sayi<66){
              
              süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %65`;
            }
            else if(random_sayi>65 && random_sayi<101){
             
                süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %35`;
            }
        }
  }
  //-------------------------
  else if(süvariu > süvari){
  if(süvariu-süvari>10 && süvariu-süvari<=20){
            if(random_sayi>0 && random_sayi<66){
         
                süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %65`;
              puanu+=5;
            }
            else if(random_sayi>65 && random_sayi<101){
              
               süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %35`;
              puan+=5;
            }
        }
  }
//20 SÜVARİ FARKI SON
//50 süvari FARKI
  if(süvari > süvariu){
        if(süvari-süvariu>20 && süvari-süvariu<=50){
            if(random_sayi>0 && random_sayi<76){
    
              süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %75`;
              puan+=5;
            }
            else if(random_sayi>75 && random_sayi<101){
               
                süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %25`;
              puanu+=5;
            }
        }
  }
  //-------------------------
  else if(süvariu > süvari){
  if(süvariu-süvari>20 && süvariu-süvari<=50){
            if(random_sayi>0 && random_sayi<76){
              
               süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %75`;
              puanu+=5;
            }
            else if(random_sayi>75 && random_sayi<101){
           
               süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %25`;
              puan+=5;
            }
        }
  }
//50 SÜVARİ FARKI SON
//100 süvari FARKI
  if(süvari > süvariu){
        if(süvari-süvariu>50 && süvari-süvariu<=100){
            if(random_sayi>0 && random_sayi<91){
              
              süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %90`;
              puan+=5;
            }
            else if(random_sayi>90 && random_sayi<101){
      
                süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %10`;
              puanu+=5;
            }
        }
  }
  //-------------------------
  else if(süvariu > süvari){
  if(süvariu-süvari>50 && süvariu-süvari<=100){
            if(random_sayi>0 && random_sayi<91){
              
               süvari_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %90`;
              puanu+=5;
            }
            else if(random_sayi>90 && random_sayi<101){
       
               süvari_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %10`;
              puan+=5;
            }
        }
  }
} // Süvaricik teyit parantezi
//100 SÜVARİ FARKI SON
//------

// eşit ise
 if (ejder >= 1 && ejderu >= 1 && ejder == ejderu){
        if(random_sayi<51 && random_sayi>0){
        
          ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %50`;
          puanu+=10;
        }else{

       ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %50`;
          puan+=10;
      }
}

//----SONSUZLUK
else if(ejder > ejderu){
if(ejder-ejderu>10 && ejder-ejderu<=Infinity){
 
               ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`;
              puan+=10;
       
        }
 }
  //-------------------------
  else if(ejderu > ejder){
if(ejderu-ejder>10 && süvariu-süvari<=Infinity){
   
              ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
              puanu+=10;
            }
  }
// 0 ISE EJDER
        if(ejder == 0 && ejderu == 0){
  
   ejder_kazanma_durum="Kazanan • Hiç Kimse";
ejdercik+=1;
  } 
if(ejder > 0 && ejderu == 0) {

ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %100`;
puan+=10;
ejdercik+=1;
}
else if(ejderu > 0 && ejder == 0) {

ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %100`;
puanu+=10;
ejdercik+=1;
}
// 0 ISE EJDER SON

 if(ejdercik == 0){
        // 1 EJDER FARKI 

if(ejder > ejderu){
      if(ejder-ejderu >= 2 && ejder-ejderu <=3){
          if(random_sayi>0 && random_sayi<61){


            
             ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %60`;
            puan+=10;
          }
          else if(random_sayi>60 && random_sayi<101){
 


             ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %40`;
            puanu+=10;
          }
      }
  }
//-------------------------
else if(ejderu > ejder){
      if(ejderu-ejder >= 2 && ejderu-ejder <= 3){
          if(random_sayi>0 && random_sayi<61){


           
             ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %60`;
            puanu+=10;
          }
          else if(random_sayi>60 && random_sayi<101){
 

          
             ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %40`;
            puan+=10;
          }
      }
  }

// 1 EJDER FARKI SON
        
        // 3 EJDER FARKI 

if(ejder > ejderu){
      if(ejder-ejderu > 3 && ejder-ejderu <=5){
          if(random_sayi>0 && random_sayi<71){


            
             ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %70`;
            puan+=10;
          }
          else if(random_sayi>70 && random_sayi<101){
 

        
             ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %30`;
            puanu+=10;
          }
      }
  }
//-------------------------
else if(ejderu > ejder){
      if(ejderu-ejder > 3 && ejderu-ejder <= 5){
          if(random_sayi>0 && random_sayi<71){


            
             ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %70`;
            puan+=10;
          }
          else if(random_sayi>70 && random_sayi<101){
 

            
             ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %30`;
            puanu+=10;
          }
      }
  }

// 3 EJDER FARKI SON
        // 5 EJDER FARKI 

if(ejder > ejderu){
      if(ejder-ejderu > 5 && ejder-ejderu <=10){
          if(random_sayi>0 && random_sayi<86){


            
             ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %85`;
            puan+=10;
          }
          else if(random_sayi>85 && random_sayi<101){
 

           
             ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %15`;
            puanu+=10;
          }
      }
  }
//-------------------------
else if(ejderu > ejder){
      if(ejderu-ejder > 5 && ejderu-ejder <= 10){
          if(random_sayi>0 && random_sayi<86){


           
             ejder_kazanma_durum=`Kazanan • ${u.username} İmparatorluğu | İhtimal: %85`;
            puan+=10;
          }
          else if(random_sayi>85 && random_sayi<101){
 

             
             ejder_kazanma_durum=`Kazanan • ${message.author.username} İmparatorluğu | İhtimal: %15`;
            puanu+=10;
          }
      }
  }

// 5 EJDER FARKI SON
        } // EJDERCİK TEYİT PARANTEZİ





//TOPLAM HASAR
let oyunsonu;
if(puan>puanu){
  oyunsonu= new Discord.MessageEmbed()
  .setAuthor('Westy • Savaş Sonucu',ayarlar.clientlogo)
  .setTitle(`${message.author.username} İmparatorluğu Kazandı!`)
.setColor(ayarlar.renk)
  .addFields(
      {name:"Asker Sayıları", value: `${asker} - ${askeru} | ${asker_kazanma_durum} (+2 Puan)`},
      {name:"Okçu Sayıları", value: `${okçu} - ${okçuu} | ${okçu_kazanma_durum} (+3 Puan)`},
      {name:"Süvari Sayıları", value: `${süvari} - ${süvariu} | ${süvari_kazanma_durum} (+5 Puan)`},
     {name:"Ejderha Sayıları", value: `${ejder} - ${ejderu} | ${ejder_kazanma_durum} (+10 Puan)`},
   
    
  )
  .setDescription(`**${message.author.username} İmparatorluğu ${puan}** - ${puanu} ${u.username} İmparatorluğu`)
setTimeout(() => {  db.add(`para_${message.author.id}`, savaştutarı)},5100)
setTimeout(() => {  db.add(`para_${u.id}`, - savaştutarı)},5200)
}
else if (puanu>puan){
  oyunsonu= new Discord.MessageEmbed()
  .setAuthor('Westy • Savaş Sonucu',ayarlar.clientlogo)
  .setTitle(`${u.username} İmparatorluğu Kazandı!`)
.setColor(ayarlar.renk)
  .addFields(
      {name:"Asker Sayıları", value: `${asker} - ${askeru} | ${asker_kazanma_durum} (+2 Puan)`},
      {name:"Okçu Sayıları", value: `${okçu} - ${okçuu} | ${okçu_kazanma_durum} (+3 Puan)`},
      {name:"Süvari Sayıları", value: `${süvari} - ${süvariu} | ${süvari_kazanma_durum} (+5 Puan)`},
      {name:"Ejderha Sayıları", value: `${ejder} - ${ejderu} | ${ejder_kazanma_durum} (+10 Puan)`},
     
  )
  .setDescription(`${message.author.username} İmparatorluğu ${puan} - **${puanu} ${u.username} İmparatorluğu**`)
setTimeout(() => {  db.add(`para_${u.id}`, savaştutarı)},5100)
setTimeout(() => {  db.add(`para_${message.author.id}`, - savaştutarı)},5200)
}
else if (puanu==puan){
  const rastgele = Math.floor(Math.random()*2);
  if(rastgele==0){
    oyunsonu= new Discord.MessageEmbed()
    .setAuthor('Westy • Savaş Sonucu',ayarlar.clientlogo)
    .setTitle(`${u.username} İmparatorluğu Kazandı!`)
.setColor(ayarlar.renk)
    .addFields(
      {name:"Asker Sayıları", value: `${asker} - ${askeru} | ${asker_kazanma_durum} (+2 Puan)`},
      {name:"Okçu Sayıları", value: `${okçu} - ${okçuu} | ${okçu_kazanma_durum} (+3 Puan)`},
      {name:"Süvari Sayıları", value: `${süvari} - ${süvariu} | ${süvari_kazanma_durum} (+5 Puan)`},
      {name:"Ejderha Sayıları", value: `${ejder} - ${ejderu} | ${ejder_kazanma_durum} (+10 Puan)`},
     
  )
    .setDescription(`${message.author.username} İmparatorluğu ${puan} - **${puanu+1} ${u.username} İmparatorluğu**`)
.setFooter('Savaşan kişiler eşit olduğu için rastgele birine 1 puan eklendi.')
setTimeout(() => {  db.add(`para_${u.id}`, savaştutarı)},5100)
setTimeout(() => {  db.add(`para_${message.author.id}`, - savaştutarı)},5200)
  }else if(rastgele==1){
    oyunsonu= new Discord.MessageEmbed()
    .setAuthor('Westy • Savaş Sonu',ayarlar.clientlogo)
    .setTitle(`${message.author.username} İmparatorluğu Kazandı!`)
    .setColor(ayarlar.renk)
    .addFields(
      {name:"Asker Sayıları", value: `${asker} - ${askeru} | ${asker_kazanma_durum} (+2 Puan)`},
      {name:"Okçu Sayıları", value: `${okçu} - ${okçuu} | ${okçu_kazanma_durum} (+3 Puan)`},
      {name:"Süvari Sayıları", value: `${süvari} - ${süvariu} | ${süvari_kazanma_durum} (+5 Puan)`},
      {name:"Ejderha Sayıları", value: `${ejder} - ${ejderu} | ${ejder_kazanma_durum} (+10 Puan)`},
     
  )
    .setDescription(`**${message.author.username} İmparatorluğu ${puan+1}** - ${puanu} ${u.username} İmparatorluğu`)
.setFooter('Savaşan kişiler eşit olduğu için rastgele birine 1 puan eklendi.')
setTimeout(() => {  db.add(`para_${message.author.id}`, savaştutarı)},5100)
setTimeout(() => {  db.add(`para_${u.id}`, - savaştutarı)},5200)
  }
}
        
setTimeout(() => {  message.channel.send(oyunsonu)},5000)

//GAESTER PRODUCTION A.Ş || SAVAŞ SİSTEMİ TEST - buraya kadardı



      }
    });
  });
} else {
return message.channel.send(new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setAuthor('Westy • Savaş Tutarı',client.user.avatarURL())
.setTitle('Bir Savaş Tutarı Belirtmelisin!')
.setDescription(`**Savaş Tutarları**\n\`100\`\n\`500\`\n\`1000\`\n\`10000\`\n\n**Örnek Kullanım •** ${prefix}savaş @Palaur 100/500/1000/10000\nSadece **bu tutarlar** seçilebilir.`))}
talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
         
          talkedRecently.delete(message.author.id);
        }, 10000);
    }

 
};
exports.conf = {
  aliases: ['müsabaka','vs','düello','meydanokuma','meydan-okuma','fight'],
  permLevel: 0
};
exports.help = {

  name: 'savaş'
};



