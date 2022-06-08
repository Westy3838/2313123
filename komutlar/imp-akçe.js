

const Discord = require('discord.js');


const ayarlar = require('../ayarlar.json');
const ms = require('parse-ms')
const db = require('quick.db')
exports.run = async (client, message, args) => {
  

let artışans = Math.ceil(Math.random()*100);

  let sonuç = 300 + artışans
  let yavaşmod = 36000000

        amount = Math.floor(Math.random() * 1000) + 4000;      


    let lastDaily = await db.fetch(`günlükakçe_${message.author.id}`);

    if (lastDaily !== null && yavaşmod - (Date.now() - lastDaily) > 0) {

        let timeObj = ms(yavaşmod - (Date.now()  - lastDaily))
const saat = new Discord.MessageEmbed()
.setAuthor('Westy • Günlük Akçe',ayarlar.clientlogo)
.setTitle(`Akçe Toplama Zamanın Gelmemiş`)
.setThumbnail('https://cdn.discordapp.com/attachments/781123411204112387/781150874764443648/231b.png')
.setColor(ayarlar.renk)
.setDescription(`**${timeObj.hours} Saat ${timeObj.minutes} Dakika ${timeObj.seconds} Saniye** Sonra Alabilirsin`)
return message.channel.send(saat)

      

    } else {
let tüccar = await db.fetch(`tüccar_${message.author.id}`);



const tparasi = 45*tüccar
db.add(`para_${message.author.id}`, sonuç);
db.add(`para_${message.author.id}`, tparasi);

    let paraq = db.has(`para_${message.author.id}`) ? db.fetch(`para_${message.author.id}`) : '0'
message.channel.send(new Discord.MessageEmbed().setAuthor('Westy • Günlük Akçe',ayarlar.clientlogo).setColor(ayarlar.renk).setImage('https://cdn.discordapp.com/attachments/748252221224910899/930907180746547210/westysandik.gif').setTitle('Verilecek Akçeler Hesaplanıyor')).then((sentMessage) =>   
  setTimeout(() => { sentMessage.edit(
new Discord.MessageEmbed()
.setAuthor('Westy • Günlük Akçe',ayarlar.clientlogo)
.setColor(ayarlar.renk)
.setThumbnail('https://cdn.discordapp.com/attachments/781270847796412426/781494145244069908/westy_akce.png')
.setTitle(`Sandıktan ${sonuç + tparasi} Akçe Topladın!`)
.addField('Ayrıntılar',`Toplam Akçen **${sonuç}**(+${tparasi}) Artarak **${paraq}** Oldu`)
.setFooter('» Eklenen miktar, tüccar sayısına göre eklenen akçedir.'))},1500))


       db.set(`günlükakçe_${message.author.id}`, Date.now());
    }}




exports.conf = {
  aliases: ["günlük-akçe"],
  permLevel: 0
};

exports.help = {
  name: 'günlük-sandık'
};


