

export function aLotServiceType(items) {
    console.log('items:', items);
    console.log('Array.isArray(items):', Array.isArray(items));

    if (!Array.isArray(items)) {

        return;
    }
       

    const resumen = items.reduce((acc, item) => {
        const nombreCategoria = item.category.name;
      
        if (!acc[nombreCategoria]) {
          acc[nombreCategoria] = {
            cantidadReportes: 0,
            totalReportado: 0
          };
        }
      
        acc[nombreCategoria].cantidadReportes += 1;
        acc[nombreCategoria].totalReportado += item.amount_reported || 0;
      
        return acc;
      }, {});
      
      // Convertir a array y ordenar por cantidad de reportes
      const categoriasOrdenadas = Object.entries(resumen).sort((a, b) => {
        return b[1].cantidadReportes - a[1].cantidadReportes;
      });
      
      // Tomar la de mayor cantidad
      return categoriasOrdenadas[0] || null;
      
    //   console.log(`La categoría más reportada fue: "${categoriaMasRepetida}" con ${datos.cantidadReportes} reportes.`);
}