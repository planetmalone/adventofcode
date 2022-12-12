import fetch from 'node-fetch';

(async () => {
  const response = await fetch(
    'https://adventofcode.com/2020/day/2/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text());
  const passwords = response.split('\n');
  const totalValid = 0;

  const validPasswords = passwords.filter(passwordString => {
    let [policy, token, password] = passwordString.split(' ');
    const [first, second] = policy.split('-');
    const letter = (token ?? '').replace(':', '');

    if (!password) {
      return false;
    }

    console.log({
      password,
      policy,
      letter,
      firstIndex: first,
      secondIndex: second,
      first: password[first - 1],
      second: password[second - 1]
    });
    return (password[first - 1] === letter || password[second - 1] === letter) && !(password[first - 1] === letter && password[second - 1] === letter);
  });
  console.log(validPasswords.length);
})();
