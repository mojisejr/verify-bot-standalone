async function giveRole(client, userId) {
  const server = client.guilds.cache.get(process.env.guildId);
  const role = server.roles.cache.find(
    (role) => role.name === process.env.role
  );
  const member = await server.members.fetch();
  const user = member.get(userId);
  await user.roles.add(role);
  console.log(`@${userId} set to be ${role.name}`);
}

async function takeRole(client, userId) {
  const server = client.guilds.cache.get(process.env.guildId);
  const role = server.roles.cache.find(
    (role) => role.name === process.env.role
  );
  const member = await server.members.fetch();
  const user = member.get(userId);
  await user.roles.remove(role);
  console.log(`@${userId} remove from ${role.name}`);
}

async function setZeroBalanceRole(client, userId) {
  const server = client.guilds.cache.get(process.env.guildId);
  const role = server.roles.cache.find(
    (role) => role.name === process.env.zero_balance_role
  );
  const member = await server.members.fetch();
  const user = member.get(userId);
  await user.roles.remove(role);
  console.log(
    `@${userId} has 0 balance may be sent to dig or sent to market set to ${role.name}`
  );
}

module.exports = {
  giveRole,
  takeRole,
  setZeroBalanceRole,
};

// const server = client.guilds.cache.get(guildId);
// const role = server.roles.cache.find((role) => role.name === "Verified");
// const member = await server.members.fetch();
// const user = member.get("641295732384464906");
// await user.roles.add(role);
