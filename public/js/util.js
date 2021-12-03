const generateUid = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

const generateName = () => {
  const nameArray = [
    'tiger',
    'wolf',
    'rat',
    'deer',
    'mink',
    'monkey',
    'sloth',
    'zebra',
    'dog',
    'fox',
    'leopard',
    'musk ox',
    'lion',
    'warthog',
    'koala',
    'rhino',
    'lynx',
    'pangolin',
    'giraffe',
    'panda',
    'anteater',
    'orangutan',
    'Manatee',
    'civet',
    'dolphin',
    'walrus',
    'platypus',
    'hedgehog',
    'arctic fox',
    'koala',
    'polar bear',
    'kangaroo',
    'armadillo',
    'hippo',
    'seal',
    'whale',
    'ferret',
  ];
  const len = nameArray.length;
  return nameArray[Math.round(Math.random(0, 1) * (len - 1))]
}

module.exports = {
  generateUid,
  generateName
}