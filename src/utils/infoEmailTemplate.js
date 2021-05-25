const templateContext = (param1, param2) => {
  return {
    title: 'Bienvenida/o a Somos Más',
    text: `Hola! ${param2} ${param1}. Usted se ha registrado correctamente.`,
    contact: '0387 582-7282 / info@fundacionsomosmas.com.ar',
    url: 'https://scontent.fpra1-1.fna.fbcdn.net/v/t1.18169-9/1452262_1538356629723251_1745439727_n.png?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=b9bX72nxBsYAX9tyuhd&_nc_ht=scontent.fpra1-1.fna&oh=aaea0c2020910da448949253af6aa0b5&oe=60BA5FB3',
  };
};

module.exports = templateContext;
