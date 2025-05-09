
export function amountHours(school) {
    

if (school === "Software"){
    return 20
}else{
    return 15
}




}


export function reportedHours(array) {
    const newArray = Object.values(array);
    let counter = 0; 

    newArray.forEach(item => {
        counter += item.amount_reported;
    });

    return counter;
}


export function aproveHours(array) {
    const newArray = Object.values(array);
    let counter = 0; 

    newArray.forEach(item => {
        if (item.status === "Approved") {
            if(item.amount_approved === null){
                counter += item.amount_reported;

            }else{
                counter += item.amount_approved;
            }
           
        }
    });

    return counter;
    
}

