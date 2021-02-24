import Discord from "discord.js";
import mongoose from "mongoose";
import { User } from "./assets/models";
import { checkIfAsking, checkWhatisAsked } from "./assets/utils";
import requestUser from "./commands/requestUser";
import saveInfo from "./assets/saveInfo";
import listUsers from "./commands/list";
require("dotenv").config();
const client = new Discord.Client();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", function () {
  console.log("Connected to Mongo");
});

//! SETS BOT ACTIVITY
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user
    .setActivity("some fools | bc help", { type: "PLAYING" })
    .then((presence) =>
      console.log(`Activity set to ${presence.activities[0].name}`)
    )
    .catch(console.error);
});

//! SAVES USER INFO
client.on("message", (msg) => {
  saveInfo(msg);
});

//! SPITS OUT USER INFO
//* FORMAT REQUESTS LIKE "bc user "<username>""
client.on("message", (msg) => {
  requestUser(msg);
});

//! SPITS OUT ALL USERNAMES
client.on("message", (msg) => {
  listUsers(msg);
});

client.on("message", (msg) => {
  if (checkIfAsking(msg) && checkWhatisAsked(msg, "help")) {
    msg.channel.send(`\`\`\`commands:
    bc user "<username>" //? snatch info from the big canuck db about a user
    bc list //? lists all users according to big canuck\`\`\``);
  }
});

client.login(process.env.BOT_TOKEN);
