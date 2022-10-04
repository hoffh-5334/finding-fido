const key = "VWy53BSbhb6aR1M1ke08svAEF1FEdVeANJN9WnQRcFKg3hO0qU";
const secret = "ZktvYuiXVzJmlliMIS5MRtEw27rAmvPtpNFbxrh1";

const searchResults = [];
let pagination = null;

// PetFinder POST API
const getData = async function () {
  let options = {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  };
  const response = await fetch("https://api.petfinder.com/v2/oauth2/token", options);
  const token = await response.json();
  const searchRes = await fetch(`https://api.petfinder.com/v2/animals${window.location.search}&type=dog`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  })
  if (searchRes.status < 400) {
    const data = await searchRes.json()

    // If there are results, push to array, else render no results html
    if (data.animals.length > 0) {
      console.log(data);

      // Clear card if no api error
      await clearCards();

      // Update search results array
      data.animals.forEach(function (item) {
        searchResults.push(item);
      })

      // Set pagination object to get total
      pagination = data.pagination;

      // Update components after search
      updateSearchBar();
      updateCard();

    } else {
      console.log("No data returned for filter option")
    }
  } else {
    console.log(searchRes)
  }
}

/** 
 * Append elements function
 * @param {string} tag: element type 
 * @param {string} content: text value of the element
 * @param {array} attr: pass an array with attr and value. Ex: [class, "search-bar"] 
 * @param {string} appendTo: Parent element to append to
 */
const renderElement = (tag, content = null, attr = null, appendTo,) => {
  const elem = $(tag);
  content != null ? elem.text(content) : "";
  attr != null ? elem.attr(attr[0], attr[1]) : "";
  typeof appendTo === "string" ? $(appendTo).append(elem) : appendTo.append(elem);
};

// Search bar results
const renderSearchBar = function () {
  $("#search-header").css({
    backgroundColor: "#fff",
    boxShadow: "0px 0px 5px 2px rgba(0,0,0,.1)",
    gap: "1rem",
    padding: "1rem",
    margin: "1rem 0"
  })
  renderElement("<div>", `Results: ${0}`, ["id", "total-count"], "#search-header")

}

const updateSearchBar = function () {
  $("#search-header").empty()
  let totalResults = 0;
  if (pagination === null) {
    totalResults = 0;
  } else {
    totalResults = pagination.total_count
  }
  renderElement("<div>", `Results: ${searchResults.length * pagination.current_page} of ${totalResults}`, ["id", "total-count"], "#search-header")
}

const clearCards = async function () {
  $("#card-wrapper").html("");
  searchResults.length = 0;
}

// Update card values
const updateCard = function () {
  searchResults.forEach(function (item) {
    // Card Component
    const card = $("<div class='col-sm-12 col-md-5 col-lg-3 card'>");
    const cardBodyDisc = $("<div class='card-body'>");
    const infoList = $("<ul class='list-group list-group-flush'>");
    const cardBodyContact = $("<div class='card-body contact-info'>");
    const favoriteArea = $("<div class= 'card-body favoriteDog'>");

    // Search data components
    let dogPhoto = $("<span>");
    item.photos.length
      ? dogPhoto = $("<img class='card-img-top'>").attr("src", item.photos[0].full).attr("alt", "Image of dog")
      : dogPhoto = $("<img class='card-img-top'>").attr("src", "./assets/images/finding-fido-logo.png").attr("alt", "Finding Fido logo");

    const dogName = $("<h5 class='card-title'>").text(item.name);
    let descriptionEl = $("<span>");
    item.description === null ? descriptionEl = $("<p class='card-text'>").text(`No info for ${item.name}.`) : descriptionEl = $("<p class='card-text'>").text(item.description);
    const genderEl = $("<li class='list-group-item'>").text(`Gender: ${item.gender}`);
    const breedEl = $("<li class='list-group-item'>").text(`Breed: ${item.breeds.primary}`);
    const contactInfoSite = $("<div class='more-info'>");
    const moreInfo = $("<a class='moreInfo card-link'>").text("More Info").attr("href", item.url).attr('target', '_blank')
    const favButton = $("<button class= 'favButton'>").text("Favorite")
    const favoriteButton = $("<div class='favArea'>");


    // Favorite buttons -- made dynamic -- color and text change on click
    favButton.on('click', function (event) {
      if ($(this).text() === 'Favorite') {
        saveFav(event, item);
        $(this).text('Unfavorite');
      }
      else {
        // removeFav(event, item)
        unfavorite(event, item.id)
        $(this).text('Favorite');
      }
    });

    // Append Card Components
    $("#card-wrapper").append(card);
    card.append(dogPhoto);
    card.append(cardBodyDisc);
    card.append(cardBodyContact);


    // Description Components
    cardBodyDisc.append(dogName);
    cardBodyDisc.append(descriptionEl);

    // List elements
    card.append(infoList);
    infoList.append(genderEl);
    infoList.append(breedEl);

    // Contact list
    card.append(cardBodyContact);
    cardBodyContact.append(contactInfoSite);
    contactInfoSite.append(moreInfo);
    card.append(favoriteArea);
    favoriteArea.append(favoriteButton);
    favoriteButton.append(favButton);
  })
}

/**
 * Displays an alert with custom message for 5 seconds
 * @param {string} message: Message to be displayed in the alert
 */
const showAlert = function (message) {
  var timer = 5;
  if ($("#alert").length) {
    return;
  };
  renderElement("<div class='alert alert-light'>", message, ["id", "alert"], "#main")
  $("#alert").css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    right: "50%",
    margin: "1rem 0px",
    border: "1px solid black",
    zIndex: 2,
    gap: ".5rem",
  })
    .attr("role", "alert")
    .append($("<span class='material-symbols-outlined'>")
      .text("done"));

  // Animate 
  gsap.from("#alert", {
    duration: .5,
    y: 200,
  });

  const startTimer = setInterval(function () {
    timer--
    if (timer <= 0) {
      gsap.from("#alert", {
        duration: .5,
        y: 200,
      });
      $("#alert").remove();
      clearInterval(startTimer);
    }
  }, 1000)
}

const removeFav = function (event, item) {
  event.preventDefault()
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  const elementIndex = favorites.findIndex(element => element === {
    name: item.name,
    image: item.photos.length ? item.photos[0].medium : `./assets/images/finding-fido-logo.png`,
  })
  favorites.splice(elementIndex, 1)
  localStorage.setItem("favorites", JSON.stringify(favorites))
  displayFav()
  console.log(item)

}


// takes favorited dogs and adds them to local storage
const saveFav = function (event, item) {
  event.preventDefault()
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  if (item.photos.length) {
    favorites.push({
      name: item.name,
      image: item.photos.length ? item.photos[0].medium : `./assets/images/finding-fido-logo.png`,
      id: item.id
    })
  } else {
    favorites.push({
      name: item.name,
      image: `./assets/images/finding-fido-logo.png`,
      id: item.id
    })
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
  displayFav()
  showAlert("Added to Favorites");
  console.log(item)
}
// Run at start
const init = function () {
  // Renders some of the page elements created using JS
  renderSearchBar()

  if (window.location.search.length > 0) {
    getData()
  } else {
    console.log("No Search params")
  }
}

//unfavorite Button for footer
const unfavorite = function (event, dogId) {
  console.log(event)
  const id = dogId || $(this).data("id")
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  const updatedFavorites = favorites.filter(dog => dog.id !== id)
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  window.location.reload()
  console.log(id)
}


// pulls favorited dogs from local storage and displays them to favorites in footer
const displayFav = function () {
  console.log("display fav")
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  console.log(favorites)
  const cards = $(".cards")
  cards.empty()
  favorites.forEach(dog => {
    console.log(dog.image)
    const card = $("<div class=' favoritedDog col-3 card'>");
    const dogName = $("<h5 class= 'favDogName'>").text(dog.name);
    const dogImage = $("<img class= 'favDogPic'>").attr("src", dog.image);
    const unfavoriteButton = $("<button class = 'favButton2'> Unfavorite</button>");
    unfavoriteButton.data("id", dog.id)
    unfavoriteButton.click(unfavorite)
    console.log(dogImage)
    card.append(dogName)
    card.append(dogImage)
    card.append(unfavoriteButton)
    cards.append(card)
  })
}

init()
displayFav()

$("#search-form").on("submit", function (e) {
  e.preventDefault()

  // API param and form input key value pair
  const paramObj = {
    location: $("#zip-code").val(),
    age: $("#age-input").val(),
    size: $("#size-input").val(),
    gender: $("#gender-input").val(),
    good_with_dogs: $("#good-with-dogs").val(),
    good_with_cats: $("#good-with-cats").val(),
    good_with_children: $("#good-with-children").val()
  }

  // Filter out null values
  var newParams = Object.entries(paramObj).filter(item => {
    if (item[1] !== null && item[1] !== "null") {
      return item;
    }
  })

  // Join each key value pair and return a valid URL with params
  var paramString = newParams.map(item => {
    return item[0] + "=" + item[1]
  }).join("&");

  // Push new params to url without reloading
  history.pushState("", "", "2index.html?" + paramString);

  // Run search api
  getData();
});