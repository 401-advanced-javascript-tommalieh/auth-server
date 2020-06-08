const URL = 'https://github.com/login/oauth/authorize';
const options = {
  client_id: 'aae693a314989e29f5f0', //required!!
  scope: 'read:user',
  state: 'class-12 oauth ask for consent',
};
// converting the obj to string and formatting the resulting string
const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');

console.log('Query', queryString);
// making the full url
const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('oauth');
console.log('link', link);

link.setAttribute('href', authUrl);