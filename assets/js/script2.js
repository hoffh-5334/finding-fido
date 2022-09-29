const key = "VWy53BSbhb6aR1M1ke08svAEF1FEdVeANJN9WnQRcFKg3hO0qU";
const secret = "ZktvYuiXVzJmlliMIS5MRtEw27rAmvPtpNFbxrh1";

const searchResults = [];

// Update token and fetch search results
const getData = function() {
fetch("https://api.petfinder.com/v2/oauth2/token", {
  method: "POST",
  body:
    "grant_type=client_credentials&client_id=" +
    key +
    "&client_secret=" +
    secret,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const token = data.access_token;
    fetch("https://api.petfinder.com/v2/animals?type=dog&page=1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        data.animals.forEach(function(item){
          searchResults.push(item)
        })
        updateCard()
        return data
      });
  });
};

// Update card values
const updateCard = function(){
  console.log("update")
  console.log(searchResults)
  searchResults.forEach(function(item){
    // $('.card').attr("style", "width: 18rem;")


    // old method
    $(".card-img-top").attr("src", item.photos[0].small)
    $(".card-title").text(item.name)
    $(".card-text").text(item.description)

    $(".list-group").append($("<li class='list-group-item'>").text(`Gender: ${item.gender}`))
    $(".list-group").append($("<li class='list-group-item'>").text(`Breed: ${item.breeds.primary}`))

    console.log(item.contact.email)
    // Contact info
    $("#contact-info").append($("<a class='card-link'>").text(item.contact.email).attr("href", item.contact.email))
    $("#contact-info").append($("<a class='card-link'>").text(item.contact.phone).attr("href", item.contact.phone))
   

  })
}

// Run at start
const init = function(){
  getData()
}

init()