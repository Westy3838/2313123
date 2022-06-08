

const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");



const ms = require('ms')
exports.run = async (client, message, args) => {
let kişi = message.mentions.users.first() || message.author
let parapara = await db.fetch(`para_${kişi.id}`) || 0
let asker = await db.fetch(`asker_${kişi.id}`) || 0
let okçu = await db.fetch(`okçu_${kişi.id}`) || 0
let süvari = await db.fetch(`süvari_${kişi.id}`) || 0
let tüccar = await db.fetch(`tüccar_${kişi.id}`) || 0
let ejderha = await db.fetch(`ejderha_${kişi.id}`) || 0
let maden = db.fetch(`maden_${kişi.id}`) || 0
//
let askerkat = asker*1
let okçukat = okçu*3
let süvarikat = süvari*5
let ejderhakat = ejderha*100

let toplamkat = askerkat + okçukat + süvarikat + ejderhakat

  const para = new Discord.MessageEmbed()
.setAuthor('Westy • İmparatorluk Bilgi',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setImage('https://cdn.discordapp.com/attachments/748252221224910899/929840958760157254/westyimparatorlukbilgi.png')
.setThumbnail("https://cdn.discordapp.com/attachments/748252221224910899/929840817613471825/imparatorluk.png")
.setTitle(`${kişi.username} • İmparatorluk Bilgileri`)
.addField('<:westyakce:781831733971910666> Toplam Akçe',`${parapara}\n━━━━━━━━`)
.addField(':crossed_swords: • Asker Sayısı',`${asker}`,true)
.addField(':bow_and_arrow: • Okçu Sayısı',`${okçu}`,true)
.addField('━━━━━━━━━━━━━━━━━━', '\u200b')
.addField(':horse_racing: • Süvari Sayısı',`${süvari}`,true)
.addField(':busts_in_silhouette: • Tüccar Sayısı',`${tüccar}`,true)
.addField('━━━━━━━━━━━━━━━━━━', '\u200b')
.addField(':dragon_face: • Ejderha Sayısı',`${ejderha}`,true)
.addField(':man_construction_worker: • Maden Seviyesi',`${maden}`,true)
.setDescription(`**Savaşta Verebileceği Hasar • ** ${toplamkat}`)


message.channel.send(para)
};
exports.conf = {
  aliases: ['ib','imparatorluk'],
  permLevel: 0
};

exports.help = {
  name: 'imparatorluk-bilgi'
};

