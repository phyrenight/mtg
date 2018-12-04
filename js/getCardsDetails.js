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

                            return myJson
                           }).then(function(myJson){
                            let us_price = document.getElementById("us_price");
                            us_price.innerHTML = "US: $" + myJson["usd"];
                            let tix_price = document.getElementById("tix_price");
                            let tix_price_str = "tix price: $" + myJson["tix"];
                            tix_price.innerHTML = "tix price: $" + myJson["tix"];

                            return myJson['rulings_uri']
                          }).then(function(myJson){
                            //arg: url string
                            //  purpose: gets the ruling information for the card in question
                              fetch(myJson).then(function(results){
                                return results.json();
                              }).then(function(result_json){
                                // 
                                let rulings = result_json;
                                let card_rulings = document.getElementById("card_rulings");
                                for (i in rulings["data"]){
                                  let ruling_container = document.createElement("div");
                                  let p_ruling = document.createElement("p");
                                  let p_date = document.createElement("p");
                                  ruling_container.className = "col-sm-12 col-md-12 col-lg-12";
                                  let ruling_text = document.createTextNode(rulings["data"][i]["comment"]);
                                  let date_text = document.createTextNode(rulings["data"][i]["published_at"]);
                                  p_ruling.appendChild(ruling_text);
                                  p_date.appendChild(date_text);
                                  ruling_container.appendChild(p_ruling);
                                  ruling_container.appendChild(p_date);
                                  card_rulings.appendChild(ruling_container);
                                }
                              }).catch(function(error){
                                console.log("Error: ", error);
                              })
                          }).catch(function(error){ 
                            console.log("Error: ", error);
                          });

get_card_data 
