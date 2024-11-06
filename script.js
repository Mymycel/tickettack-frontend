//base pour la fetch de recherche de voyage :
document.querySelector('#search-button').addEventListener('click', function () {
    const departure = document.querySelector('#input-departure').value;
    const arrival = document.querySelector('#input-arrival').value;
    const date = document.querySelector('#input-date').value;

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.trips)
            if (data.trips) {
                document.querySelector('#trip-result').innerHTML =''
                for (let i = 0; i < data.trips.length; i++) {
                    const formattedTime = new Date(data.trips[i].date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');

                    document.querySelector('#trip-result').innerHTML += `
			<div class="tripContainer">
				<p class="trajet">${data.trips[i].departure} > ${data.trips[i].arrival}</p>
				<p class="horaire">${formattedTime}</p>
                <p class="price">${data.trips[i].price}</p>
				<button class="addTrip" id="${data.trips[i]._id}">Book</button>
			</div>
					`;
                }
                //emplacement fonction ajouter au panier
                document.querySelector('#input-departure').value = '';
                document.querySelector('#input-arrival').value = '';
                document.querySelector('#input-date').value = '';
            }

        });
});

// //fetch pour réccupérer les éléments du panier :
// fetch('http://localhost:3000/tripCart')
//     .then(response => response.json())
//     .then(data => {
//         if (data.cart) {
//             for (let i = 0; i < data.cart.length; i++) {
//                 document.querySelector('#cartList').innerHTML += `
// 				<div class="cartContainer">
// 				<p class="trajet">${data.cart[i].departure} > ${data.cart[i].arrival}</p>
// 				<p class="horaire">${data.cart[i].date}</p>
//                 <p class="price">${data.cart[i].price}</p>
// 				<button class="deleteTrip" id="${data.cart[i].id}">X</button>
// 			</div>
// 			`;
//             }
//             updateDeleteTripEventListener();
//         }
//     });

// //fonction pour suppimer un billet du panier :
// function updateDeleteTripEventListener() {
//     for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
//         document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
//             fetch(`http://localhost:3000/tripCart/${this.id}`, { method: 'DELETE' })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.result) {
//                         this.parentNode.remove();
//                     }
//                 });
//         });
//     }
// }