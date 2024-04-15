

// function showrecom(){
//     let input= document.getElementById("cityname").value.toLowerCase() ;
//     let recom= document.getElementById("recommendations");
//     recom.classList.add("reco");
//     fetch('travel.json')
//         .then(response => response.json())
//         .then(data=>{
//             const place=data[input.toLowerCase()]
//             place.cities.forEach(element => {
//                 recom.innerHTML += `<h3>${element.name}</h3>`
//                 recom.innerHTML += `<img src=${element.imageUrl} height="50px" width="50px">`
//                 recom.innerHTML += `<p>${element.description}</p>`
//                  });
//             })
//         }
// let searchbtn= document.getElementById("searchbtn");
// searchbtn.addEventListener('click',showrecom);

function showrecom() {
    let input = document.getElementById("cityname").value.toLowerCase();
    let recom = document.getElementById("recommendations");
    recom.innerHTML = ''; // Clear previous recommendations
    recom.classList.add("reco");
    fetch('travel.json')
        .then(response => response.json())
        .then(data => {
            const category = data[input]; // Access the corresponding category based on user input
            if (!category) {
                recom.innerHTML = "<p>No recommendations found.</p>";
                return;
            }
            if (input === "countries") {
                // Access the "countries" array directly
                const countries = data["countries"];
                countries.forEach(country => {
                    // Check if the current country has cities
                    if (country.cities) {
                        // Iterate over the cities and display their information
                        country.cities.forEach(city => {
                            let cityDiv = document.createElement('div');
                            cityDiv.classList.add('recommendation');
                            cityDiv.innerHTML += `<h3>${city.name}</h3>`;
                            cityDiv.innerHTML += `<img src="${city.imageUrl}" height="220px" width="400px">`;
                            cityDiv.innerHTML += `<p>${city.description}</p>`;
                            recom.appendChild(cityDiv);
                        });
                    }
                });
            } else {
                category.forEach(item => {
                    let recommendationDiv = document.createElement('div');
                    recommendationDiv.classList.add('recommendation');
                    recommendationDiv.innerHTML += `<h3>${item.name}</h3>`;
                    recommendationDiv.innerHTML += `<img src="${item.imageUrl}" height="220px" width="400px">`;
                    recommendationDiv.innerHTML += `<p>${item.description}</p>`;
                    recom.appendChild(recommendationDiv);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}



const searchbtn = document.getElementById('searchbtn');
searchbtn.addEventListener('click', showrecom);

function clear_recom(){
    let place= document.getElementById("cityname");
    place.value='';

    let reco= document.getElementById("recommendations");
    reco.innerHTML='';
}

const resetbtn= document.getElementById('resetbtn');
resetbtn.addEventListener('click',clear_recom);
