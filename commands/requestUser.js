import { checkIfAsking, checkWhatisAsked } from "../assets/utils";
import { User } from "../assets/models";
import { MessageEmbed } from "discord.js";

export default function requestUser(msg) {
  if (checkIfAsking(msg) && checkWhatisAsked(msg, "user")) {
    if (!msg.content.includes('"')) {
      msg.reply("put the username in quotes dumbass");
      return;
    }
    const usernameRequested = msg.content
      .match(/".*/)[0]
      .trim()
      .replace(/\"/g, "");
    User.findOne({ username: usernameRequested }, function (err, user) {
      if (!user) {
        msg.reply("gimme a real name loser");
        return;
      }
      if (user) {
        const sortedWords = Object.entries(user.words).sort(function (a, b) {
          return b[1] - a[1];
        });
        let specialWords = new Array();
        for (let i = 0; i < 10; i++) {
          specialWords.push(sortedWords[i]);
        }
        let specialStr = new String();
        for (const arr of specialWords) {
          specialStr += "[ " + arr[0] + ", " + arr[1] + " times ] ";
        }
        const userEmbed = new MessageEmbed()
          .setColor("ffffff")
          .setTitle(`${user.username} @ ${user.discId}`)
          .addFields(
            { name: "bot", value: user.bot },
            { name: "admin", value: user.admin },
            {
              name: "last awake",
              value: user.lastAwake,
            },
            {
              name: "says the most",
              value: specialStr,
            }
          );
        msg.channel.send(userEmbed);
      }
    });
  }
}
