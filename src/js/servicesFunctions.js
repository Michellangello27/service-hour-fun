

export function aLotServiceType(items) {

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
      
      const categoriasOrdenadas = Object.entries(resumen).sort((a, b) => {
        return b[1].cantidadReportes - a[1].cantidadReportes;
      });
      
      return categoriasOrdenadas[0] || null;
      
}
export function pendingReportsAmount(array,type) {
  return array.reduce((acc, item) => {
    if (item.status === type) {
      return acc + 1;

    }
    return acc;
  }, 0);
}

export function typeServices(items) {

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
    
    const categoriasOrdenadas = Object.entries(resumen).sort((a, b) => {
      return b[1].cantidadReportes - a[1].cantidadReportes;
    });
    
    return categoriasOrdenadas || null;
    
}