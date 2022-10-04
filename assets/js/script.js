// Event listener for search form
$("#search-form").on("submit", function (e) {
    e.preventDefault()

    // Url input/api param object
    const paramObj = {
        location: $("#zip-code").val(),
        age: $("#age-input").val(),
        size: $("#size-input").val(),
        gender: $("#gender-input").val(),
        good_with_dogs: $("#good-with-dogs").val(),
        good_with_cats: $("#good-with-cats").val(),
        good_with_children: $("#good-with-children").val()
    }

    // Host will need to be updated before deploying to GitPages
    const host = "http://127.0.0.1:5500/projects/group-project1/2index.html?";
    // const host = "https://hoffh-5334.github.io/finding-fido/2index.html?";


    // Filter out nulls
    var newParams = Object.entries(paramObj).filter(item => {
        if (item[1] !== null && item[1] !== "null") {
            return item;
        }
    })

    // Join each key value pair and return a valid URL with params
    var paramString = newParams.map(item => {
        return item[0] + "=" + item[1]
    }).join("&");

    // Filter out nulls values then use URLSearchParams object to create new URL
    const newURL = host + new URLSearchParams(paramString)

    // Open new page with search params
    window.open(newURL, "_self");
})

// Animations
gsap.from("#finding-fido-logo", {
    duration: 2,
    x: -200,
});

gsap.to("#find-fido-button", {
    rotation: 360,
    duration: 1,
    repeat: 1,
    repeatDelay: 1,
});