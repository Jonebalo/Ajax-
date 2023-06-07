const promesa = fetch ("https://api.publicapis.org/entries");

promesa.then ((result) => {
    result.json ()
    .then ((response) => {
 console.log(response);

})
.catch ((error) => {
    console.log(error);
})
    
}).catch ((error) => {
console.log(error);

});

const otraPromesa = fetch ("https://api.publicapis.org/entries");

otraPromesa
.then ((result) => result.json())
.then ((response) => console.log(response))
.catch ((error) => console.log(error));