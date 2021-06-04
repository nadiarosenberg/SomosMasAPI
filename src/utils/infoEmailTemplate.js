const templateContext = (param1, param2) => {
  return {
    title: 'Bienvenida/o a Somos Más',
    text: `Hola, ${param1} ${param2}! . Usted se ha registrado correctamente.`,
    contact: '0387 582-7282 / info@fundacionsomosmas.com.ar'
  };
};

module.exports = templateContext;
