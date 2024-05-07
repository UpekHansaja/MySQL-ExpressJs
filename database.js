import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    // host: "127.0.0.1",
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM `notes` ");
  return rows;
}

export async function getNote(id) {
  const [rows] = await pool.query("SELECT * FROM `notes` WHERE `id` = ?", [id]);
  return rows[0];
}

export async function createNote(title, contents) {
  const [result] = await pool.query(
    "INSERT INTO `notes` (`title`, `contents`) VALUES (?,?)",
    [title, contents]
  );
  const id = result.insertId;
  return getNote(id);
}

// const rows = result[0];
// const result = await createNote("Insert Test 2", "Insert Description Test 2");
// console.log(result);
