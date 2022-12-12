import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/4/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n\n'))
    .then(response => response.map(row => {
      row = row.replace(/\n/g, ' ');
      const fields = row.split(' ');
      const passport = {};
      fields.forEach(field => {
        if (field.includes(':')) {
          const pair = field.split(':');
          passport[pair[0]] = pair[1];
        }
      });
      return passport;
    }));

  const validPassports = data.filter(passport =>
    validateByr(passport) &&
    validateIyr(passport) &&
    validateEyr(passport) &&
    validateHgt(passport) &&
    validateHcl(passport) &&
    validateEcl(passport) &&
    validatePid(passport)
  );

  console.log(validPassports.length);
})();

const validateHgt = passport => {
  const hgt = passport.hgt;
  const hgtValue = Number.parseInt(hgt);

  return Boolean(hgt) &&
  (
    (hgt.includes('cm') && hgtValue >= 150 && hgtValue <= 193) ||
    (hgt.includes('in') && hgtValue >= 59 && hgtValue <= 76)
  );
};

const validateIyr = passport => {
  const iyr = Number.parseInt(passport.iyr);
  return Boolean(passport.iyr) && iyr >= 2010 && iyr <= 2020;
};

const validateByr = passport => {
  const byr = Number.parseInt(passport.byr);
  return Boolean(passport.byr) && byr >= 1920 && byr <= 2002;
};

const validateEyr = passport => {
  const eyr = Number.parseInt(passport.eyr);
  return Boolean(passport.eyr) && eyr >= 2020 && eyr <= 2030;
};

const validateHcl = passport => {
  return Boolean(passport.hcl) && /#[0-9a-f]{6}/.test(passport.hcl);
};

const validatePid = passport => {
  console.log(passport.pid, Boolean(passport.pid) && /[0-9]{9}/.test(passport.pid))
  return Boolean(passport.pid) && /[0-9]{9}/.test(passport.pid);
};

const validateEcl = passport => {
  return Boolean(passport.ecl) && /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl);
};
