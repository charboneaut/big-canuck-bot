import { User } from "./models";
import { megaWordList } from "./words";

export default function gainExp(words, id) {
  User.findOne({ discId: id }, function (err, user) {
    //? EJECT IF SPAMMING
    if (words.length > 150) {
      return;
    }
    words.map(function (word) {
      megaWordList.map(function (dicWord) {
        if (word) {
          if (word.toLowerCase() === dicWord.toLowerCase()) {
            user.exp += word.length;
            if (word.length >= 6) {
              user.pr += Math.floor(word.length / 2 + words.length / 2);
            }
          }
        }
      });
    });
    if (user.exp > user.expCap) {
      user.exp = 0;
      user.level++;
      user.expCap = Math.floor(1.1 * user.expCap) + user.level;
    }
    user.save();
  });
}
