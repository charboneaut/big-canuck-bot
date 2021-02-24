import { checkIfAsking, checkWhatisAsked } from "../assets/utils";
import { User } from "../assets/models";

export default function listUsers(msg) {
  if (checkIfAsking(msg) && checkWhatisAsked(msg, "list")) {
    let newUsers = new Array();
    User.find(function (err, users) {
      newUsers = users;
      msg.channel.send(`\`\`\`List of Users according to big canuck:
          ${newUsers.map(function (user) {
            return "\n" + user.username + " LVL " + user.level;
          })}\`\`\``);
    });
  }
}
