function arrPrime(arr){
    let prArray=" ";
    for(let i=0;i<arr.length;i++){
        if(checkPrime(arr[i])){
            prArray=prArray+arr[i];
        }
    }
    return prArray;
}

function checkPrime(n){
    for(let i=2;i<n;i++){
        if(n%i==0){
            return false;
        }
    }
    return true;
}

let arr=[3,6,4,2,7]
console.log(arrPrime(arr));



// for(int i=0;i<navigator;i++){
//     if(n%i==0){
//         return false;
//     }
//     return true;
// }
