const key = "VWy53BSbhb6aR1M1ke08svAEF1FEdVeANJN9WnQRcFKg3hO0qU";
const secret = "ZktvYuiXVzJmlliMIS5MRtEw27rAmvPtpNFbxrh1";

const searchResults = [];
const urlParams = window.location.search

// Update token and fetch search results
const getData = function(urlParams) {
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
    // console.log(urlParams)
    fetch(`https://api.petfinder.com/v2/animals${urlParams}&type=dog&page=1&`, {
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
        // Handle return of no data
        if(data.animals.length > 0) {
          updateCard()
        } else {
          console.log("No search results")
        }
      });
  });
};


// Create handle no search results function


// Update card values
const updateCard = function(){
  searchResults.forEach(function(item){
    // Card Component
    const card = $("<div class='col-3 card'>");
    const cardBodyDisc = $("<div class='card-body'>");
    const infoList = $("<ul class='list-group list-group-flush'>");
    const cardBodyContact = $("<div class='card-body'>");
    
    // Search data components
    const dogPhoto = $("<img class='card-img-top'>").attr("src", item.photos[0].full);
    const dogName = $("<h5 class='card-title'>").text(item.name);
    const descriptionEl = $("<p class='card-text'>").text(item.description);
    const genderEl = $("<li class='list-group-item'>").text(`Gender: ${item.gender}`);
    const breedEl = $("<li class='list-group-item'>").text(`Breed: ${item.breeds.primary}`);
    const contactInfoDivE = $("<div class=''>");
    const contactInfoDivP = $("<div class=''>");
    const emailEl = $("<a class='card-link'>").text(`Email: ${item.contact.email}`).attr("href", `mailto:${item.contact.email}`)
    const phoneEl = $("<a class='card-link'>").text(item.contact.phone).attr("href", item.contact.phone)
    const favButton =$("<button class= 'fav'>").text("favorite")
    favButton.click((event)=>saveFav(event, item))

    // Append Card Components
    $("#card-wrapper").append(card);
    card.append(dogPhoto);
    card.append(cardBodyDisc);
    card.append(cardBodyContact);

    // Discription Components
    cardBodyDisc.append(dogName);
    cardBodyDisc.append(descriptionEl);

    // List elements
    card.append(infoList);
    infoList.append(genderEl);
    infoList.append(breedEl);
   
    // Contact list
    card.append(cardBodyContact);
    cardBodyContact.append(contactInfoDivE);
    cardBodyContact.append(contactInfoDivP);
    contactInfoDivE.append(emailEl);
    contactInfoDivP.append(phoneEl);
    contactInfoDivP.append(favButton); 

    
    
    // // old method
    // $(".card-img-top").attr("src", item.photos[0].small)
    // $(".card-title").text(item.name)
    // $(".card-text").text(item.description)

    // $(".list-group").append($("<li class='list-group-item'>").text(`Gender: ${item.gender}`))
    // $(".list-group").append($("<li class='list-group-item'>").text(`Breed: ${item.breeds.primary}`))

    // console.log(item.contact.email)
    // // Contact info
    // $("#contact-info").append($("<a class='card-link'>").text(item.contact.email).attr("href", item.contact.email))
    // $("#contact-info").append($("<a class='card-link'>").text(item.contact.phone).attr("href", item.contact.phone))
  })
}
const saveFav = function (event, item){
  event.preventDefault()
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  favorites.push({
   name: item.name,
   image: item.photos[0].medium, 
  })
localStorage.setItem("favorites",JSON.stringify(favorites))
  displayFav()
  console.log (item)

}
// Run at start
const init = function(){
  getData(urlParams)
}

const displayFav = function(){
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  console.log(favorites)
  const cards = $(".cards")
  cards.empty()
  favorites.forEach(dog=>{
    console.log(dog.image)
    const card = $("<div class='col-3 card'>");
    const dogName = $("<h5>").text(dog.name);
    const dogImage = $("<img>").attr("src", dog.image);
    console.log(dogImage)
    card.append(dogName)
    card.append(dogImage)
    cards.append(card)
  }) 
}

init()
displayFav()