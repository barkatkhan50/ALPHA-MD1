const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUlYdXJCUXpwbW9zaUxLblhSY1ByWXlXN3BDUzBONGNQU1pEcDZiSVJuMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUFFvaGQwL01OV1VpSjc1OU1XSDVwQmlDTUx6Nm9yUnFMZVFYQ1h1OUd6RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRUtONGJ3SFhCUkhGY0QyMktxbC90a0I1UTZLYno1UitzcVpYUWtobjJFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhYVJWd3pSdFRIQk1VUDU3REJVQzR5c3Z4OWlGZ3Zlb3lVWUtHNTR2OVhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9Bc3NvQjkrYTcvblN5WUxabDJpZDV3MDRrbXlNUElZeG1uK3hwWHZkRjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndPeUl6MndNcUtwNFgramhEN01kekRMWU4yRGYrYXdKakk3Ui9GeUpVQzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkp4bUtJdUxTQ0E1R0h4QlJhbjFvMTJMdEN5WDZXZlFhOTF3QUxjV2oyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0lPb3QyaHBsayt0a0VLVjUrT1QvWGdGSUNuZ1RvSTFPTTlQRHlRb2doST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklSaG5LN05xUTEwSmtNOC9BeklpNnFzZndLNkIwb0RGUjByMnlPOEJhUW4zSFFZM3hCRXJrQThQUndSejRYV1d0TGV0REFUMFo0dFk5dVd4Tmd2RERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6Imo3b2M3b2NkQjVJOVcwOEFMc3ZUQ0dYbGEzSXQ5eEZjdHpDYzJ4NUFrcVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFvNGRsLV94U3hDbDhKeUJyaU9pLVEiLCJwaG9uZUlkIjoiNzhiODM0M2YtOTlkZi00MTdiLTk2ZGMtMDE5OTY4MmQwZTJkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJZcmt0YVlVdDM5T0psWHgvOEpzaldHZWZkRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNNHUwaVZ0aEcwMzZnSGhRa3pwWFVTQlROOW89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUFJYQVpMM04iLCJtZSI6eyJpZCI6IjkyMzAxMjcwNzUwMTozMkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLar9mF2LTYr9uBINiy2YbYr9qv24wifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xPTm5hMENFTVBoekxnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJvckxiWER0M0FJQXFNaHlhV1BhUXdaVlR3NXpvRFpwMDNWckV0SEdIaG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNIaklZMURXUUN0c0p2VWk2Ny90TGdVazlQbXNLMkFuQmpINzNHVmhFQnJJQWExd0NNMjZJSkRQbWw5MkZ2RDNheC80eUZZaTY4UkRrZGlPZEpsL0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCNjdhWDdCOTc5Z1h0VGExWmdPUzFXWnJNTjNTSk1wa1RxZ1pMeUNoWXJhYk1idE5MMDFuQWIzeU1xK3J3OVRGSzJwVnRkN0E5SEcvUndiTHNmSFdDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzAxMjcwNzUwMTozMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRYUt5MjF3N2R3Q0FLakljbWxqMmtNR1ZVOE9jNkEyYWROMWF4TFJ4aDRhIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MzEwOTI4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUN4ayJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
