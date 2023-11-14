const express = require('express');
const fetch = require('node-fetch'); // Import node-fetch
const app = express();

require('dotenv').config();

const { createAccessProfile } = require("./mongo/functions")

const fs = require('fs');
const path = require('path');

const baseUrl = process.env.BASE_URL

function keepAlive() {
    app.listen(process.env.PORT || 8080, () => {
        console.log("Server is alive!");
    });
}

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, './utils/misc')));

app.get('/', (req, res) => {
    res.redirect('https://discord.gg/xz3xDdUvxq')
})

// app.get('/test', async (req, res) => {
//     const discordId = "1119579873044861050"
//     await fetch(`${baseUrl}/discord/assign-access-role`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ discordId: discordId })
//     });
//     res.send("Working!");
// });

app.get('/success', async (req, res) => {
    const filePath = path.join(__dirname, './utils/misc/successPage.html');
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    res.send(htmlContent);
});

function postAccessRole(client) {
 app.post('/discord/assign-access-role', async (req, res) => {
    const access_role = "1172957050410635314"
    const { discordId } = req.body;
    if (!discordId) return null
    
    try {
        const member = await client.guilds.cache.first().members.fetch(discordId);
        const roleToAdd = await client.guilds.cache.first().roles.cache.get(access_role);
        await member.roles.add(roleToAdd);
        res.json({ message: 'Rol asignado correctamente' });
    } catch (error) {
        console.error('Error al asignar rol:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
 });
}

// Redirect to Battle.net authorization page
app.get('/auth/battlenet', (req, res) => {
    const discord_id = req.query.discord_id
    if(!discord_id) return 
    const uniqueStateString = 'unique_string'; // Generate a unique string for CSRF protection
    const combinedState = `${uniqueStateString}-${discord_id}`
    const authUrl = `https://us.battle.net/oauth/authorize?client_id=${process.env.BATTLE_NET_CLIENT_ID}&scope=openid&redirect_uri=${encodeURIComponent(process.env.BATTLE_NET_REDIRECT_URI)}&response_type=code&state=${combinedState}`;
    res.redirect(authUrl);
});

// Battle.net callback endpoint
app.get('/auth/battlenet/callback', async (req, res) => {
    try {
        const code = req.query.code;
        const combinedState = decodeURIComponent(req.query.state);
        const [ stateCsrf, discordId ] = combinedState.split('-');

        // Exchange the code for an access token
        const tokenResponse = await fetch('https://us.battle.net/oauth/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.BATTLE_NET_CLIENT_ID,
                client_secret: process.env.BATTLE_NET_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.BATTLE_NET_REDIRECT_URI,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Fetch user information from Battle.net API using the access token
        const userInfoResponse = await fetch('https://us.battle.net/oauth/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        const userInfo = await userInfoResponse.json();

        if (!userInfo) return console.log("Error while getting User Info for Battle.Net")

        await fetch(`${baseUrl}/discord/assign-access-role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ discordId: discordId })
        });
        
        const battle_net = {
            ...userInfo,
            access_token: accessToken
        }

        const profileCreation = await createAccessProfile(discordId, userInfo.battletag, battle_net)

        if (!profileCreation) return console.log("Error while profile Creation")

        res.redirect('/success');
    } catch (error) {
        console.error('Error in Battle.net OAuth flow:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = { keepAlive, postAccessRole };