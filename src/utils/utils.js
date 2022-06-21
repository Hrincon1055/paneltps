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
