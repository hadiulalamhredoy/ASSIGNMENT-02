
let currentDrinks = [];
let groupDrinks = [];

const drinksContainer = document.getElementById('drinks-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const notFoundMsg = document.getElementById('not-found-msg');
const groupList = document.getElementById('group-list');
const drinkCount = document.getElementById('drink-count');
const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));


document.addEventListener("DOMContentLoaded", () => {
    
    fetchDrinks('a'); 
});


const fetchDrinks = async (query) => {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        displayDrinks(data.drinks);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


const displayDrinks = (drinks) => {
    drinksContainer.innerHTML = ''; 
    
   
    if (!drinks) {
        notFoundMsg.classList.remove('d-none');
        return;
    } else {
        notFoundMsg.classList.add('d-none');
    }

    currentDrinks = drinks; 

   
    const limitedDrinks = drinks.slice(0, 10);


    limitedDrinks.forEach(drink => {

        let instructions = drink.strInstructions ? drink.strInstructions : "";
        let shortInstructions = instructions.length > 15 ? instructions.substring(0, 15) + '...' : instructions;

        const cardHTML = `
            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <img src="${drink.strDrinkThumb}" class="card-img-top drink-img" alt="${drink.strDrink}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${drink.strDrink}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Category: ${drink.strCategory}</h6>
                        <p class="card-text flex-grow-1 text-secondary">Inst: ${shortInstructions}</p>
                        <div class="d-flex justify-content-between mt-auto">
                            <button class="btn btn-sm btn-primary w-50 me-2" onclick="addToGroup('${drink.strDrink.replace(/'/g, "\\'")}')">Add to Group</button>
                            <button class="btn btn-sm btn-outline-info w-50" onclick="showDetails('${drink.idDrink}')">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        drinksContainer.innerHTML += cardHTML;
    });
};


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchDrinks(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) fetchDrinks(query);
    }
});


window.addToGroup = (drinkName) => {
    // Prevent adding more than 7 drinks
    if (groupDrinks.length >= 7) {
        alert("Warning: You cannot add more than 7 drinks to a group!");
        return;
    }


    groupDrinks.push(drinkName);
    
  
    drinkCount.innerText = groupDrinks.length;


    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = drinkName;
    groupList.appendChild(li);
};


window.showDetails = (id) => {
    
    const drink = currentDrinks.find(d => d.idDrink === id);
    
    if (drink) {
        // Populate at least 5 pieces of information
        document.getElementById('modal-img').src = drink.strDrinkThumb;
        document.getElementById('modal-name').innerText = drink.strDrink;
        document.getElementById('modal-category').innerText = drink.strCategory;
        document.getElementById('modal-alcoholic').innerText = drink.strAlcoholic;
        document.getElementById('modal-glass').innerText = drink.strGlass;
        document.getElementById('modal-instructions').innerText = drink.strInstructions;

   
        detailsModal.show();
    }
};