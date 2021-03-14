import { checkIfAsking, checkWhatisAsked } from "./utils";
import { User } from "./models";
import gainExp from "./gainExp";
export default function saveInfo(msg) {
  const userMessage = msg.author;
  User.findOne({ discId: userMessage.id }, function (err, user) {
    if (!user) {
      const newUser = new User({
        username: userMessage.username,
        discId: userMessage.id,
        bot: userMessage.bot,
        lastAwake: new Date(),
        admin: "false",
        words: { a: 0, b: 0, c: 0, d: 0, f: 0, e: 0, h: 0, i: 0, j: 0, k: 0 },
        level: 0,
        exp: 0,
        pr: 0,
        expCap: 20,
        cash: 0,
        dice: [2],
      });
      newUser.save();
    }
    if (user) {
      user.username = userMessage.username;
      const msgWords = msg.content.match(/\b\S*/g);
      if (!msgWords) {
        return;
      }
      let wordObj = { ...user.words };
      const now = new Date();
      if (
        String(now).substring(22, 24) -
          String(user.lastAwake).substring(22, 24) >
        2
      ) {
        gainExp(msgWords, user.discId);
      }
      gainExp(msgWords, user.discId);
      user.lastAwake = new Date();
      msgWords.map(function (word) {
        if (word) {
          if (wordObj[word] === undefined) {
            wordObj[word] = 1;
          } else {
            wordObj[word] += 1;
          }
        }
      });
      user.words = { ...wordObj };
      user.save();
    }
  });
}
