// Magic_card.js
// fetch magic card details
const replaceSpaces = require('./replaceSpaces')


function get_card_data(){
  let card_name = document.getElementById("search_item").value;
  if(card_name.length == 0){
    card_name ="fireball";
  }
  card_name = replaceSpaces(card_name);
  fetch(
    "https://api.scryfall.com/cards/named?fuzzy="+card_name)
  .then(function(result){
    return result.json();
  }).then(function(myJson){
    let card_image = document.getElementById("image");
    card_image.src = myJson["image_uris"]["small"];
    let card_name = document.getElementById("card_name");
    card_name.innerHTML = "<span class='col-6'>Card Name:</span> " + 
                          "<span class='col-6'>" + 
                          myJson["name"] + "</span>";
    let mana_cost = document.getElementById("mana_cost");
    mana_cost.innerHTML = "<span class='col-6'>Mana Cost:</span>" + 
                          "<span class='col-6'>" + 
                          myJson["mana_cost"] + "</span>";
    let rarity = document.getElementById("rarity");
    rarity.innerHTML = "<span class='col-6'>Rarity:</span>" + 
                       "<span class='col-6'>" + 
                       myJson["rarity"] + "</span>";
    let card_type = document.getElementById("type");
    card_type.innerHTML = "<span class='col-6'>Type:</span>" + 
                          "<span class='col-6'>" + 
                          myJson["type_line"] + "</span>";
    let card_set = document.getElementById("set");
    card_set.innerHTML = "<span class='col-6'>Set Name:</span>" + 
                         "<span class='col-6'>" + 
                         myJson["set_name"] + "</span>";
    let oracle_text = document.getElementById("oracle_text");
    oracle_text.innerHTML = "<span class='col-4'>Text:</span>" +
                            "<span class='col-12'>" + 
                            myJson["oracle_text"] + "</span>";
    return myJson;
  }).then(function(myJson){
    // Price section
    let us_price = document.getElementById("us_price");
    let dollars = myJson["usd"];
    if (!myJson["usd"]){
      dollars = "0.00";
    }
    us_price.innerHTML = "US price: $" + dollars;
    let tix_price = document.getElementById("tix_price");
    let tix = myJson["tix"];
    if (!myJson["tix"]){
      tix_price = "0.00";
    }
    tix_price.innerHTML = "Tix price: $" + tix;
    return myJson['rulings_uri'];
  }).then(function(myJson){
    //  arg: url string
    //  purpose: gets the ruling information for the card in question
    fetch(myJson).then(function(results){
      return results.json();
    }).then(function(result_json){
      // args: result_json - json object containing ruling information
      //purpose: display ruling to html page
      let rulings = result_json;
      let card_rulings = document.getElementById("card_rulings");
      card_rulings.innerHTML = "";
      for (i in rulings["data"]){
        let ruling_container = document.createElement("div");
        let p_ruling = document.createElement("p");
        let p_date = document.createElement("p");
        ruling_container.className = "col-sm-12 col-md-12 col-lg-12";
        let ruling_text = document.createTextNode(rulings["data"][i]["comment"]);
        let date_text = document.createTextNode(rulings["data"][i]["published_at"]);
        p_ruling.appendChild(ruling_text);
        p_date.appendChild(date_text);
        ruling_container.appendChild(p_date);
        ruling_container.appendChild(p_ruling);
        card_rulings.appendChild(ruling_container);
      }
    }).catch(function(error){
      console.log("Error: ", error);
    })
  }).catch(function(error){
    console.log("Error: ", error);
  });
} 




get_card_data()