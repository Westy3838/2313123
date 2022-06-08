const Discord = require("discord.js");
const db = require("quick.db");
const a = require("../ayarlar.json");

exports.run = async (bot, message, args, client, params) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || a.prefix;
  if (message.author.id !== "473070737851285515")
    return message.reply(`${a.wx} **Bu Komut Hazır Değil!**`);
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply(
      ":warning: **Bu Komutu Kullanabilmek İçin** ``SUNUCUYU YÖNET`` **Yetkisine Sahip Olmalısın!**"
    );

  if (!args[0])
    return message.reply(
      `${a.wx} **Kullanmak İçin : ${prefix}language tr/en**`
    );
  if (args[0] == "tr") {
    db.delete(`dil_${message.guild.id}`);

    message.channel.send(`${a.wt} **Türkçe Dili aktif!**`);
  }

  if (args[0] == "en") {
    db.set(`dil_${message.guild.id}`, "en");

    message.channel.send(`${a.wt} **English language is active.**`);
  }
};

exports.conf = {
  aliases: ["dil"],
  permLevel: 0,
};

exports.help = {
  name: "language",
  description: "Botun Yazı Yazana Cevap Versin mi Vermesin mi?",
  usage: "oto-mesaj aç/kapat",
};
