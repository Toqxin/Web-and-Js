const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getStreamerInfo() {

  //Twitch channel info
  rl.question('Twitch Channel Name: ', (streamer) => {

    if (streamer) {
      const fetch = require('node-fetch');
      const clientId = 'twitch_client_id';
      const clientSecret = 'twitch_secret';
      const twitchChannel = streamer;
      let accessToken;

      const oauthTokenUrl = 'https://id.twitch.tv/oauth2/token';
      const oauthTokenOptions = {
        method: 'POST',
        body: new URLSearchParams({
          'client_id': clientId,
          'client_secret': clientSecret,
          'grant_type': 'client_credentials',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      fetch(oauthTokenUrl, oauthTokenOptions)
        .then(response => response.json())
        .then(data => {

          if (data.access_token) {
            accessToken = data.access_token;
            const channelInfoUrl = `https://api.twitch.tv/helix/users?login=${twitchChannel}`;
            const channelInfoOptions = {
              method: 'GET',
              headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
              },
            };
            return fetch(channelInfoUrl, channelInfoOptions);
          } 
          else {
            console.error('Access Token could not be received.');
          }
        })
        .then(response => response.json())
        .then(data => {
          
          if (data.data && data.data.length > 0) {
            const channelData = data.data[0];
            console.log(`Channel Name: ${channelData.display_name}`);
            console.log(`Channel ID: ${channelData.id}`);
            console.log(`Channel Created At: ${channelData.created_at}`);
            console.log(`Broadcaster Type: ${channelData.broadcaster_type}`);
            console.log(`Description: ${channelData.description}`);
            console.log(`Channel Profile Img: ${channelData.profile_image_url}`);
            console.log(' ');
            console.log('CHAT 🢆');
          }
        });

      
      //See the chat of the twitch channel
      const tmi = require('tmi.js');
      const opts = {
        identity: {
          username: 'username',
          password: 'Twitch_Chat_OAuth_Password_Generator',
        },
        channels: [twitchChannel],
      };
      const client = new tmi.client(opts);
      client.connect();
      client.on('message', (channel, userstate, message) => {
        console.log(`⮳ ${userstate['display-name']} : ${message}`);
      });
    } 
    else {
      console.error('Twitch Channel Name cannot be left blank.');
      getStreamerInfo(); 
    }
  });
}
getStreamerInfo(); 
