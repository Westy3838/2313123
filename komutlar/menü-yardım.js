const disbut = require("discord-buttons")
const Discord = require("discord.js")
const ayarlar = require('../ayarlar.json')
const db = require(`quick.db`);
const talkedRecently = new Set();
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
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
//TALKED RECENTLY
if (talkedRecently.has(message.author.id)) {
    return message.channel.send(`${ayarlar.wx} **Zaten aktif bir menü var, daha sonra tekrar deneyin.**\n*Menüyü kullanma süresi 3 dakikadır.*`);
} else {


  if (message.author.bot) return;
        message.channel.send(`Menü yükleniyor...`).then(async msj => {
            const botPing = (msj.createdTimestamp - message.createdTimestamp);
            msj.delete();
        const btn1 = new disbut.MessageMenuOption()
            .setLabel('Ana Sayfa')
            .setDescription("Ana bilgilendirme sayfası")
            .setValue('1').setEmoji("📚")
//
        const btn2 = new disbut.MessageMenuOption()
            .setLabel('Moderasyon Sistemleri')
            .setValue('2').setEmoji("⚙️")
//
        const btn3 = new disbut.MessageMenuOption()
            .setLabel('İmparatorluk Sistemi')
            .setValue('3').setEmoji("🔱")
//
        const btn4 = new disbut.MessageMenuOption()
            .setLabel('Yetkili Menüsü')
            .setEmoji(`🔰`)
            .setValue(`4`)
//
        const btn5 = new disbut.MessageMenuOption()
            .setLabel('Ekstra Komutlar Menüsü')
            .setEmoji(`🏵️`)
            .setValue(`5`)
//
        const btn6 = new disbut.MessageMenuOption()
        .setLabel(`Eğlence Menüsü`)
        .setEmoji("🎉")
        .setValue("6")
//
const btn7 = new disbut.MessageMenuOption()
     .setLabel(`Zümrüt Üye Menüsü`)
      .setEmoji("922124713642299433")
      .setValue("7")
//
      const btn8 = new disbut.MessageMenuOption()
        .setLabel(`Oyun Menüsü`)
        .setEmoji("🎮")
        .setValue("8")
//
const btn9 = new disbut.MessageMenuOption()
        .setLabel(`Bot Menüsü`)
        .setEmoji("🤖")
        .setValue("9")
//

        const menu = new disbut.MessageMenu()
        .addOptions(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9)
        .setMaxValues(1)
        .setMinValues(1)
        .setID("menu")
///////////////////////////////////////
        const anasayfa = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
       .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
       .setThumbnail(ayarlar.clientlogo)
       .setTitle('📚  Ana Sayfa')
       .setDescription(`» Şu an **Ana Sayfadasın.**\nAşağıdaki **Seçim yap**\'a tıkla, istediğin menüyü seçerek kategoriler arasında geçiş yapabilirsin.\n\n⚙️ • Moderasyon Sistemleri (**7**)\n🔱 • İmparatorluk (**10**)\n🔰 • Yetkili (**22**)\n🏵️ • Ekstra (**19**)\n🎉 • Eğlence (**16**)\n<:zumrutuye:922124713642299433> • Zümrüt Üye (**3**)\n🎮 • Oyun (**8**)\n🤖 • Bot (**4**)\n\n`)
       .addField(`${prefix}sponsor • sourcebilisim.com`,`[**Yeniliklerden Haberdar Olmak için Buraya Tıkla**](https://discord.gg/QtSzCvmn7t)`)  
// [Davet Et](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Oyla](https://top.gg/bot/636202587648950303/vote) • [Tanıtım Videoları](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi)
       .setFooter(`• Her hakkı saklıdır Westy Bot © 2022 | w!gizlilik-politikası `)
       .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////////////////
        const mods = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setTitle('⚙️ Moderasyon Sistemleri')
            .setDescription(`\`${prefix}templates\` **Hazır şablonları kullanmanızı sağlar**(Vote İsteği)\n\`${prefix}kayıtsistemibilgi\` **Kayıt sistemi yardım menüsünü gösterir.**\n\`${prefix}kick-sistemi\` **Kick sistemi yardım menüsünü gösterir.**\n\`${prefix}ban-sistemi\` **Ban sistemi yardım menüsünü gösterir.**\n\`${prefix}softban-sistemi\` **Softban sistemi yardım menüsünü gösterir.**\n\`${prefix}mute-sistemi\` **Mute sistemi yardım menüsünü gösterir.**\n\`${prefix}warn-sistemi\` **Uyarı sistemi yardım menüsünü gösterir.**`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////////////////
const imp = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setURL('https://bit.ly/westytanitim')
            .setTitle('🔱 İmparatorluk Sistemi')
            .setDescription(`**<:westyakce:781831733971910666> Günlük Akçe Alımları**
\`${prefix}günlük-sandık\` Günlük olarak **minimum 300+(1-100)** akçe alımı yaparsınız.
\`${prefix}günlük-vote\` **Vote atarak** günlük olarak **minimum 300+** akçe alımı yaparsınız.

**:crossed_swords: Genel İmparatorluk Komutları**
\`${prefix}imparatorluk <@Kişi>\` Kişinin savaşta verebileceği hasarı, toplam akçesini, asker, okçu, süvari, ejderha **sayılarını** gösterir.
\`${prefix}savaş <@Kişi> <100/500/1000/10000>\` Öncelikle toplam akçeniz **seçilen savaş tutarından fazla olmalı.**\nKazanan taraf karşı tarafın **seçilen akçe sayısını** alır.\nTüm birlikler sırasıyla birbiriyle sayıları ele alınarak **ihtimaller dahilinde** savaşırlar.\nHer birliğin **zafer sonucu puanı** vardır.\nKazanan birliklerin **zafer sonucu puanları** toplanır.
\`${prefix}kışla\` Kışladan alabileceğiniz birimlerin **özelliklerini** gösterir.
\`${prefix}kışla <birim> <miktar>\` Kışladan yazdığınız **birimin,** yazdığınız **miktar** kadarını akçe karşılığı imparatorluğunuza ekler.
\`${prefix}akçe-bağışla <@Kişi> <miktar>\` Etiketlediğiniz kişiye yazdığınız **miktarda** akçe bağışlarsınız. Miktar sizden **düşer** ve **kişiye eklenir.**
\`${prefix}sefer\` **Sefer listesini gösterir.**
\`${prefix}sefer <sefer ismi>\` Yazdığınız imparatorluğa sefer düzenlersiniz, her imparatorluğa karşı **1 defa** sefer düzenleme hakkınız var. Kazanma ihtimaliniz **kesin.**

👷‍♂️ **MADEN SİSTEMİ**
\`${prefix}maden\` Ana maden menüsü.
\`${prefix}maden aç\` Maden oluşturursunuz.
\`${prefix}maden yükselt\` Maden yükseltirsiniz.
\`${prefix}maden topla\` Madenleri toplarsınız.
\`${prefix}maden bilgi\` Madeniniz hakkında bilgi alırsınız.
\`${prefix}maden oranlar\` Madenlerin oranlarını öğrenirsiniz.`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////
////////////////
const yet = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setTitle('🔰 Yetkili Menüsü')
            .setDescription(`\`${prefix}oylama <yazı>\` **Emojili oylama yaparsınız.**\n\`${prefix}duyuru <yazı>\` **Yazdığınız kanala duyuru atar.**\n\`${prefix}unban <id>\` **Yasaklanan kişinin yasağını kaldırır.**\n\`${prefix}sil <miktar>\` **Belirttiğiniz miktar kadar mesaj siler.**\n\`${prefix}otorol rol-ayarla @Rol\` **Biri sunucuya geldiğinde rol verir.**\n\`${prefix}otorol kanal-ayarla #kanal\` **Otorol verildiğinde kanala atar.**\n\`${prefix}ototag <tag>\` **Gelen kişilere ayarlanan tag verilir.**\n\`${prefix}ototagkanal #kanal\` **Ototag verildiğinde kanala mesaj atar.**\n\`${prefix}ototagkapat\` **Oto tag sistemini kapatır.**\n\`${prefix}slowmode <saniye>\` **Komutu yazdığınız kanalın slowmode\'unu değiştirmenizi sağlar(En fazla 900 saniye)**\n\`${prefix}tümlogları ayarla #kanal\` **Ban,kick,mute,warn,softban loglarını aynı kanala ayarlar.**\n\`${prefix}tümyetkileri ayarla @rol\`**Ban,kick,mute,warn,softban izinlerini aynı ayarlar.**\n\`${prefix}giriş-çıkış <#kanal> <hedef>\` **Giriş çıkış hedefini ve kanalını ayarlar.**\n\`${prefix}giriş-çıkış-kapat\` **Sistemi kapatır.**\n\`${prefix}kilitle <sebep>\` **Yazdığınız kanalı kilitler.**\n\`${prefix}kilit-aç\` **Kilitlediğiniz kanalı açar.**\n\`${prefix}prefix <prefix>\` **Prefixi değiştirmenizi sağlar.**\n\`${prefix}sorgulama-kanal #kanal\` **Sorgulama kanalını ayarlar.**\n\`${prefix}sorgulama-kapat\` **Sistemi kapatır.**\n\`${prefix}ayarlar\` **Bottaki ayarlanan tüm ayarları gösterir.**\n\`w!duyuru-yetkili ayarla/sıfırla\` **Duyuru yetkili rolünü ayarlar.**\n\`${prefix}kilit-log ayarla #kanal\` **Kilitle ve kilit-aç komutlarını loglar.**`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////
////////////////
const ex = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setTitle('🏵️ Ekstra Komutlar Menüsü')
            .setDescription(`\`${prefix}sözlük <kelime>\` **Yazdığınız kelime hakkında bilgiler verir.**\n\`${prefix}kısalt <link>\` **Link Kısaltmanıza Yarar.**\n\`${prefix}emojiekle <link> <isim>\` **Sunucuya emoji eklemenize yarar.**\n\`${prefix}avatar <@kişi>\` **Avatarınızı atar.**\n\`${prefix}yazıbanner <yazı>\` **Yazıyı banner şeklinde yazar.**\n\`${prefix}yetkilerim <genel,yazı,ses>\` **Sunucudaki yetkilerini gösterir.**\n\`${prefix}şifre <uzunluk sayısı>\` **Şifre oluşturur.**\n\`${prefix}steam <oyun adı>\` **Steam oyun fiyat bilgisi.**\n\`${prefix}klasik-cevaplar aç/kapat\` **Oto cevap ekler.**\n\`${prefix}fun-cevaplar aç/kapat\` **Oto cevap ekler.**\n\`${prefix}bansorgulama <id>\` **Ban sorgulamanıza yarar.**\n\`${prefix}starboard-kanal ayarla #kanal\` **Starboard kanalını ayarlarsınız.**\n\`${prefix}starboard <yazı>\` **Ayarlanmış starboard kanalına starboard atarsınız.**\n\`${prefix}gazete\` **Günün gündem haberlerini sayfa halinde paylaşır.**\n\`${prefix}döviz <döviz kodu>\` **Yazdığınız dövizin alış ve satış bilgilerini gösterir.**\n\`${prefix}afk <sebep>\` **Sebep belirterek AFK durumuna geçersiniz. Sizi etiketleyenlere uyarı mesajı gönderilir. Mesaj yazdığınızda AFK'lıktan çıkarsınız.**\n\n**Kullanıcı Komutları**\n\`w!sunucubilgi\` **Sunucu hakkında bilgi verir.**\n\`w!rolbilgi @rol/rol/rol id\` **Rol hakkında bilgi verir.**\n\`w!kullanıcıbilgi <@kişi>\` **Kullanıcı hakkında bilgi verir.**\n\`w!avatar <@kişi>\` **Kendinizin veya bir kişinin avatarını atar.**`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////
////////////////
const fun = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setTitle('🎉 Eğlence Komutlar Menüsü')
            .setDescription(`\`${prefix}kralol\` **Kral olursunuz.**\n\`${prefix}efkarölçer\` **Efkarınızı ölçer.**\n\`${prefix}güvenölçer @kişi\` **Aranızdaki Güvenirliği Ölçer.**\n\`${prefix}cmölçer\` **Malafatınızı ölçer.**\n\`${prefix}corgi\` **Rastgele corgi memeleri atar.**\n\`${prefix}alkış <yazı>\` **Yazdığınız yazıyı alkışlar.**\n\`${prefix}şanslırengim\` **Şanslı renginizi gösterir.**\n\`${prefix}herkesebendençay\` **Herkese çay ısmarlarsınız.**\n\`${prefix}kedi\` **Rastgele Kedi GIF\`i yada fotoğrafı Atar.**\n\`${prefix}emojiyazı <yazı>\` **Emojilerle yazı yazarsınız.**\n\`${prefix}sorusor <soru>\` **Bot yazdığınız soruyu cevaplar.**\n\`${prefix}mesajdöndür <mesaj>\` **Yazdığınız mesajı ters döndürür.**\n\`${prefix}aşkölçer <@kişi>\` **Etiketlediğin kişiyle aşk seviyenizi ölçer.**\n\`${prefix}koronavirüs\` **Koronavirüs testi yapar, Testlerin gerçekle uzaktan yakından alakası bulunmamaktadır.**\n\`${prefix}büyü <@Kişi>\` **Etiketlediğiniz kişiye büyü yaparsınız.**\n\`${prefix}trump <mesaj>\` **Trump\'a mesaj yazdırırsınız.**`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////
////////////////
const game = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setTitle('🎮 Oyunlar Menüsü')
            .setDescription(`\`${prefix}sayı-tahmin\` **Sayı tahmin etme oyunu.**\n\`${prefix}yazmaoyunu\` **Rastgele verilen kelimeyi ilk yazan kazanır.**\n\`${prefix}doğruluk-cesaretlik\` **Doğruluk cesaretlik oyunu.**\n\`${prefix}kazıkazan\` **Kazı Kazan oynarsınız.**\n\`${prefix}üçleme\` **Aynı sembolü 3lü olarak yanyana getirmelisin.**\n\`${prefix}brawlkutu\` **Brawl Stars kutusu açarsınız.**\n\`${prefix}zar <sayı>\` **Bahise girdiğiniz sayıyı çıkartmaya çalışırsınız.**\n\`${prefix}kasa-aç\` **CS:GO kasa açma simulasyonu**`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////
////////////////
const bot = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setTitle('🤖 Bot Menüsü')
            .setDescription(`\`${prefix}ping\` **Botun pingini gösterir.**\n\`${prefix}botbilgi\` **Botun bilgilerini atar.**\n\`${prefix}vote\` **Botu votelemeniz için link verir.**\n\`${prefix}davet\` **Botu davet etmeniz için link verir.**`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////
////////////////
const zumrut = new Discord.MessageEmbed()
       .setColor(ayarlar.renk)
 .setAuthor('Westy • Yardım Menüsü',ayarlar.clientlogo)
            .setTitle('<:zumrutuye:922124713642299433> Zümrüt Üye Menüsü')
            .setDescription(`\`${prefix}troll-cevaplar aç/kapat\` **Troll cevapları açarsınız.**\n\`${prefix}destur\` **Kullandığınız kanalda ferman duyurursunuz.**\n\`${prefix}zümrüt-durum\` **Zümrüt durumunuza bakarsınız.**\n\n**Zümrüt Üyelik Nasıl Elde Edilir?**\nDestek sunucuna 3 üye davet ederek, Westy hakkında video çekerek, veya türlü destekler sergileyerek elde edebilirsin.`)
            .setFooter('Menüyü oluşturan kişi kullanabilir.')
            .addField(`━━━━━━━━━━━━━━━━━━`,`[Destek Sunucusu](https://discord.gg/QtSzCvmn7t) • [Davet](https://discordapp.com/oauth2/authorize?client_id=636202587648950303&scope=bot&permissions=8) • [Vote](https://top.gg/bot/636202587648950303/vote) • [Tanıtım](https://www.youtube.com/playlist?list=PL-Z-VwfQdPEs6wod9vxbPB-SN4TBsdzOi) • [Website](https://westy-discord.glitch.me) `)  
            .setImage('https://cdn.discordapp.com/attachments/748252221224910899/924367284703748126/yardmmenusuthumbnail.png')
////
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            

        let msg = await message.channel.send({ embed: anasayfa, component: menu })
        talkedRecently.add(message.author.id);
  
        msg.delete({timeout: 178000, reason: "süre bitti"}).catch(error => { console.log('Menü silme| HATA')})
        const filter = (menu) => menu.clicker.user.id === message.author.id;
      //user filter (author only)
        const collector = message.createMenuCollector(filter, { time: 180000 })
        client.on("clickMenu", menu => {
            if(menu.clicker.id !== message.author.id) return;
            menu.reply.defer().catch(error => { console.log('YARDIM MENÜ | EDİT')})
            if (menu.values[0] === '1') {
                msg.edit({
                    embed: anasayfa
                }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
            }
            if (menu.values[0] === '2') {
                msg.edit({
                    embed: mods
                }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
           
            }
            if(menu.values[0] === "3"){
                msg.edit({
                    embed: imp
                }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
            }
            if(menu.values[0] === "4"){
                msg.edit({
                    embed: yet
       
                }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
         
            }
 if(menu.values[0] === "5"){
                msg.edit({
                    embed: ex
                }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
 }
if(menu.values[0] === "6"){
                msg.edit({
                    embed: fun
               
 }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
 }
if(menu.values[0] === "7"){
                msg.edit({
                    embed: zumrut
               
 }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
 }
if(menu.values[0] === "8"){
                msg.edit({
                    embed: game
               
 }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
 }
if(menu.values[0] === "9"){
                msg.edit({
                    embed: bot
                }).catch(error => { console.log('YARDIM MENÜ | EDİT')})
 }


   
        })

        })
        setTimeout(() => {
        talkedRecently.delete(message.author.id);
}, 178000) }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help","y","h","komutlar"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk "
};