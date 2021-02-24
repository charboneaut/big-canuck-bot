import { checkIfAsking, checkWhatisAsked } from "../assets/utils";
import { User } from "../assets/models";

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
        msg.channel
          .send(`\`\`\`info on ${user.username} LVL ${user.level} | EXP ${user.exp} / ${user.expCap} | ${user.pr} POWER RATING
----------------------------
username: ${user.username}
id: ${user.discId}
bot: ${user.bot}
last awake: ${user.lastAwake}
admin: ${user.admin} //? for restricted bot commands
says the most: ${specialStr}\`\`\``);
      }
    });
  }
}
