export function checkIfAsking(msg) {
  return msg.content.toLowerCase().startsWith("bc");
}

export function checkWhatisAsked(msg, command) {
  return msg.content.toLowerCase().includes(command);
}
