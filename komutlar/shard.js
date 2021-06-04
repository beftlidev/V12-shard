const Discord = require("discord.js") 

const cevaplar = [

"Biliyor muydun? Space Giveaway Aslında Sade Çekiliş Botu İdi", 
"Biliyor muydun? Space Giveaway Sahibi iUgur UwU", 
"Biliyor muydun? Aslında ben çok ünlüyüm UwUU", 
"Biliyor muydun? Space Giveaway sahibi çok dadlu :3", 
"Biliyor muydun? Bu bota katkıda bulunan bazı insanlar var.", 
"Biliyor muydun? Space Giveaway Aslında genel bir bot", 

];

exports.run = async (client, message, args) => {

var soru = args.join(' ');
    var random = cevaplar[Math.floor(Math.random() * cevaplar.length)];

const promises = [
	client.shard.fetchClientValues('guilds.cache.size'),
	client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
];

Promise.all(promises)
	.then(results => {
		const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
		const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
		
                 const embed = new Discord.MessageEmbed() 
                 .addField("> Toplam Bilgiler", "[Destek Sunucum](https://discord.gg/KZfAEjrPUF)") 
                 .addField("Toplam Sunucu", totalGuilds) 
                 .addField("Toplam Kullanıcı", totalMembers) 
                 .addField("Bu Sunucunun Shard İd' si", client.shard.ids) 
                 .addField("Shard Sayısı", "1") 
                 .addField(`> ${client.shard.ids} id' li Shard' ın bilgileri`, random)
                 .addField("Toplam Sunucu", client.guilds.cache.size) 
                 .addField("Toplam Kullanıcı", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()) 
                .setTimestamp() 
                 .setColor("BLURPLE") 
                 .setFooter(`Ping: ${client.ws.ping}`, client.user.displayAvatarURL()) 
                return message.channel.send(embed);
	})
	.catch(console.error);

}
exports.conf = {
aliases: [] 
}
exports.help = {
name: "shard" 
} 
