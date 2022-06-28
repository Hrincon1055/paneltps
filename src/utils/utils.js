/**

  * Filtra un conjunto de datos de acuerdo al campo que se le indique y de acuerdo
  * a lo que ingrese un usuario.

  * @param {[Array]} data [  Array de objetos ]
  * @param {[string]} fieldFilter [etiquiteta o valor para filtrar ]
  * @param {[string | useState]} search [ valor ingresado por el usuario para filtrar ]
  * @return { [Array] }  [ Array de objetos]
  *
 */
export const filterdSearch = (data, fieldFilter, search = "") => {
  if (data) {
    const filterd = data.filter((element) => {
      if (typeof element[fieldFilter] === "string") {
        return element[fieldFilter]
          .toLowerCase()
          .includes(search.toLowerCase());
      } else {
        return;
      }
    });
    return filterd;
  }
};

/**

  * Obtiene el porcentaje de un total 

  * @param {[number]} value [ valor que hace parte del 100% ]
  * @param {[number]} total [ valor total (100%) para sacar el porcentaje]
  * @return { [number] }  [ porcentaje sin el valor de % ]
  *
 */
export const getWidhTPercentProgress = (value, total) => {
  return (value / total) * 100;
};

/**
  * Obtiene tener un numero aletorio de acuerdo a un rango

  * @param {[number]} min [ valor minimo]
  * @param {[number]} max [ valor maximo]
  * @return { [number] }  [ Numero aleatorio]
  *
 */

export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getData = (route = "ruta") => {
  return new Promise((resolve, reject) => {
    if (route.includes("/")) {
      reject("ha ocurrido un problema");
    }

    const json = Array.from({ length: 10 }, (v, i) => {
      let publicados = randomInteger(1000, 50000);
      let sinPublicar = randomInteger(1000, 50000);
      let E11certificados = randomInteger(1000, 50000);
      let esperados = publicados + sinPublicar + E11certificados;
      return {
        descripcion: `${route} ${i}`,
        publicados,
        sinPublicar,
        E11certificados,
        esperados,
      };
    });

    setTimeout(() => {
      resolve({
        data: { data: json, sumEsperados: "", sumPublicados: "" },
        status: 200,
      });
    }, 2000);
  });
};
