// Magic_card.js
// fetch magic card details


var get_card_data = fetch("https://api.scryfall.com/cards/named?fuzzy=aust+com")
                           .then(function(result){
                            return result.json()
                           }).then(function(myJson){                            
                            var card_data = myJson
                            var card_image = document.getElementById("image");
                            card_image.src = myJson["image_uris"]["small"];
                            var card_name = document.getElementById("card_name");
                            card_name.innerHTML = myJson["name"]
                            var mana_cost = document.getElementById("mana_cost");
                            mana_cost.innerHTML = myJson["mana_cost"];
                            var rarity = document.getElementById("rarity");
                            rarity.innerHTML = myJson["rarity"];
                            var card_type = document.getElementById("type");
                            card_type.innerHTML = myJson["type_line"];
                            var card_set = document.getElementById("set");
                            card_set.innerHTML = myJson["set_name"];
                            var oracle_text = document.getElementById("oracle_text");
                            oracle_text.innerHTML = myJson["oracle_text"];
                            console.log(myJson)
                            return myJson
                           }).then(function(myJson){
                            let us_price = document.getElementById("us_price");
                            us_price.innerHTML = "US: $" + myJson["usd"];
                            let tix_price = document.getElementById("tix_price")
                            let tix_price_str = "tix price: $" + myJson["tix"]
                            tix_price.innerHTML = "tix price: $" + myJson["tix"];

                            return myJson['rulings_uri']
                           }).catch(function(error){ 
                            console.log("Error:", error)
                          });

get_card_data 
