const key = "VWy53BSbhb6aR1M1ke08svAEF1FEdVeANJN9WnQRcFKg3hO0qU";
const secret = "ZktvYuiXVzJmlliMIS5MRtEw27rAmvPtpNFbxrh1";

// Update token
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
    console.log(data.access_token);
    const token = data.access_token;

    fetch(`https://api.petfinder.com/v2/animals?type=dog&page=`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data
      });
  });
};