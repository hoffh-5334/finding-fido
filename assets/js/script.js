// Form input variables
// const urlParams = []
let zipCode;
let goodWithOtherDogs;
let size;

// Create new URL
const newUrl = function(){
    window.open(`http://127.0.0.1:5500/projects/group-project1/2index.html?size=${size}`)
}

// &good_with_dogs=${goodWithOtherDogs}

$("#search-form").on("submit", function(e){
    e.preventDefault()
    console.log("search")
    zipCode = $("#zip-code").val();
    goodWithOtherDogs = $("#good-with-dogs").val()
    size = $("#size-input").val()
    newUrl()

})