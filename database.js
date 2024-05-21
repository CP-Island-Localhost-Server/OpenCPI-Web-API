const postgres = require('postgres');

const sql = postgres({
    host: process.env.HOST,
    port: +process.env.PORT,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  })

async function createDBTablesAndExstentions() {
  console.log("TESTING")
  await sql`CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, first_name TEXT, parent_email TEXT, user_id TEXT)`;
  await sql`CREATE TABLE IF NOT EXISTS refresh_tokens (user_id TEXT, token TEXT, valid_until TIMESTAMP)`;
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
}

async function loginUser(username, password) {
  const password_hash = await sql`SELECT password from users WHERE first_name = '${username}'`;
  const is_correct_password = await sql`SELECT (password_hash = crypt(${password}, ${password_hash})) AS password_match FROM users WHERE username = '${username}'`

  return is_correct_password;
}

async function createUser(username, password, first_name, parent_email, user_id, refresh_token) {
  await sql`INSERT INTO users (username, password, first_name, parent_email, user_id) VALUES (${username}, crypt(${password}, gen_salt('md5')), ${first_name}, ${parent_email}, ${user_id})`;
  var date = new Date();
  date.setDate(date.getDate() + 7)
  await sql`INSERT INTO refresh_tokens (user_id, token, valid_until) VALUES (${user_id}, ${refresh_token}, ${date.toISOString().slice(0, 19).replace('T', ' ')})`
}

module.exports = { createUser, createDBTablesAndExstentions, sql }