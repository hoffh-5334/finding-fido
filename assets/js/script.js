// Form input variables
// const urlParams = []
let zipCode;
let age;
let size;
let gender;
let goodWithOtherDogs;
let goodWithCats;
let goodWithChildren;


// Create new URL
const newUrl = function(){
    window.open(`http://127.0.0.1:5500/projects/group-project1/2index.html?size=${size}`)
}

// &good_with_dogs=${goodWithOtherDogs}

$("#search-form").on("submit", function(e){
    e.preventDefault()
    console.log("search")
    zipCode = $("#zip-code").val();
    age = $("#age-input").val();
    size = $("#size-input").val();
    gender = $("#gender-input").val();
    goodWithOtherDogs = $("#good-with-dogs").val()
    goodWithCats = $("#good-with-cats").val()
    goodWithChildren = $("#good-with-children").val()
   
    newUrl()

})