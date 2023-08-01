// import dotenv from 'dotenv';

// dotenv.config();

export const host = import.meta.env.VITE_BE_URL || 'http://localhost:8000'; // https://foo -> https://api.foo
export const thaiProvinceData = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json';
export const thaiAmphure = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json';
export const Apitambons = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json';

export const Tags = [
  'MINIMALMODERN',
  'CONTEMPORARYMODERN',
  'MODERNLUXURY',
  'MODERNSTYLE',
  'MIDCENTURYMODERN',
  'VINTAGESTYLE',
  'LOFTINDUSTRALSTYLE',
  'SCANDINAVIANSTYLE',
  'ARTDECO',
  'MIXANDMATCH',
];

export const Gender = ['MALE', 'FEMALE', 'UNSPECIFIED'];
