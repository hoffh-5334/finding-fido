// Form input variables
let zipCode;
let age;
let size;
let gender;
let goodWithOtherDogs;
let goodWithCats;
let goodWithChildren;


// Create new URL
const newUrl = function(){
    // Host will need to be updated before deploying to GitPages
    const host = "http://127.0.0.1:5500/projects/group-project1";

    window.open(`${host}/2index.html?location=${zipCode}&age=${age}&size=${size}&gender=${gender}&good_with_dogs=${goodWithOtherDogs}&good_with_cats=${goodWithCats}&good_with_children=${goodWithChildren}`,"_self")
}

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
