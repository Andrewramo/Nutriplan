//yWxBiqeiNG2GGIL5Djsr44z4vovSvCwqjhbx9MKb


const backBtn = document.getElementById("back-to-meals-btn");
const searchSection = document.getElementById("search-filters-section");
const categoriesSection = document.getElementById("meal-categories-section");
const allRecipesSection = document.getElementById("all-recipes-section");
const mealDetails = document.getElementById("meal-details");
const sectionTitle = document.querySelector(".section-title h1");
const sectionDescription = document.querySelector(".section-title p");

const loading = document.getElementById("app-loading-overlay");

const scannerBtn = document.getElementById("scanner-btn");
const productsSection = document.getElementById("products-section");
const mealsBtn = document.getElementById("meals-btn");

let nameAndIngredirnt = {};
let recipeName;
let recipeImgSrc;
let recipeNutritions;

// back to show recipes page
backBtn.onclick = function () {
  backToMeals();
}
// meal recipes button
mealsBtn.onclick = function () {
  showMealsPage();
}

// to show meal section
function showMealsPage() {
  backToMeals();
  productsSection.classList.add("hidden");
  foodLogSection.classList.add("hidden");
}

//  to back to recipes page
function backToMeals() {
  searchSection.classList.remove("hidden");
  categoriesSection.classList.remove("hidden");
  allRecipesSection.classList.remove("hidden");
  mealDetails.classList.add("hidden");
  sectionTitle.innerHTML = ` Meals & Recipes`;
  sectionDescription.innerHTML = `Discover delicious and nutritious recipes tailored for you`
}





// show and hide loading
function showLoading() {
  loading.classList.remove("hidden")
  loading.classList.add("flex")
}
function endLoading() {
  loading.classList.add("hidden")
  loading.classList.remove("flex")
}





// show areas 
async function getAreas() {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/areas`);

  if (response.ok) {
    let data = await response.json();
    console.log(data.results[1].name);

    displayAreas(data.results);
    endLoading();
  }
}
getAreas();
function displayAreas(areas) {
  let cartona = ``;

  for (let i = 0; i < 10; i++) {
    cartona += `
         <button
              onclick="areaFilter('${areas[i].name}')"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${areas[i].name}
            </button>
        `
  }
  document.getElementById("areasData").innerHTML += cartona;
}


//show categories 

async function getCategories() {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/categories`);
  if (response.ok) {
    let data = await response.json();
    displayCategories(data.results);
    endLoading();



  }
}
getCategories();

function displayCategories(categories) {
  let cartona = ``;
  const categoryIcon = {
    Beef: "cow",
    Chicken: "drumstick-bite",
    Dessert: "ice-cream",
    Lamb: "drumstick-bite",
    Miscellaneous: "utensils",
    Pasta: "bowl-food",
    Pork: "bacon",
    Seafood: "fish",
    Side: "bread-slice",
    Starter: "plate-wheat",
    Vegan: "seedling",
    Vegetarian: "leaf",
  };
  const categoryStyles = {
    Beef: {
      bgColor: "from-red-50 to-rose-50",
      cIcon: "from-red-400 to-red-500",
      brColor: "border-red-200 hover:border-red-400",
    },
    Chicken: {
      bgColor: "from-yellow-50 to-amber-50",
      cIcon: "from-yellow-400 to-amber-500",
      brColor: "border-yellow-200 hover:border-yellow-400",
    },
    Dessert: {
      bgColor: "from-pink-50 to-rose-50",
      cIcon: "from-pink-400 to-rose-500",
      brColor: "border-pink-200 hover:border-pink-400",
    },
    Lamb: {
      bgColor: "from-orange-50 to-orange-100",
      cIcon: "from-orange-400 to-orange-500",
      brColor: "border-orange-200 hover:border-orange-400",
    },
    Miscellaneous: {
      bgColor: "from-gray-50 to-slate-50",
      cIcon: "from-gray-500 to-gray-500",
      brColor: "border-gray-200 hover:border-gray-400",
    },
    Pasta: {
      bgColor: "from-amber-50 to-yellow-50",
      cIcon: "from-amber-400 to-yellow-500",
      brColor: "border-amber-200 hover:border-amber-400",
    },
    Pork: {
      bgColor: "from-rose-50 to-pink-50",
      cIcon: "from-rose-400 to-pink-500",
      brColor: "border-rose-200 hover:border-rose-400",
    },
    Seafood: {
      bgColor: "from-sky-50 to-cyan-50",
      cIcon: "from-sky-400 to-cyan-500",
      brColor: "border-blue-200 hover:border-blue-400",
    },
    Side: {
      bgColor: "from-lime-50 to-green-50",
      cIcon: "from-lime-400 to-green-500",
      brColor: "border-lime-200 hover:border-lime-400",
    },
    Starter: {
      bgColor: "from-violet-50 to-purple-50",
      cIcon: "from-purple-500 to-pink-500",
      brColor: "border-blue-200 hover:border-blue-400",
    },
    Vegan: {
      bgColor: "from-green-50 to-emerald-50",
      cIcon: "from-green-400 to-emerald-500",
      brColor: "border-green-200 hover:border-green-400",
    },
    Vegetarian: {
      bgColor: "from-emerald-50 to-teal-50",
      cIcon: "from-emerald-400 to-teal-500",
      brColor: "border-emerald-200 hover:border-emerald-400",
    },
  };


  for (let i = 0; i < 12; i++) {
    cartona += `
          <div
              class="category-card bg-gradient-to-br ${categoryStyles[categories[i].name].bgColor} rounded-xl p-3 border ${categoryStyles[categories[i].name].brColor} hover:shadow-md cursor-pointer transition-all group"
              data-category="Beef" onclick="categoryFilter('${categories[i].name}')"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br ${categoryStyles[categories[i].name].cIcon} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-${categoryIcon[categories[i].name]}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${categories[i].name}</h3>
                </div>
              </div>
            </div>
        `


  }

  document.getElementById("categories-grid").innerHTML += cartona;
}




// show 25 recipes 
async function showAll() {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`);
  if (response.ok) {
    let data = await response.json();
    console.log(data.results);
    displayAll(data.results)
    document.getElementById("recipes-count").innerHTML = `Showing 25 recipes`
    endLoading();
  }
}
// display 25 recipes
showAll();



// display all recipes that recived from api
function displayAll(recipes) {
  let cartona = ``;
  for (const recipe of recipes) {
    cartona += `
         <div 
              onclick="getDetails(${recipe.id})"
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${recipe.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${recipe.thumbnail}"
                  alt="${recipe.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${recipe.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${recipe.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${recipe.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${recipe.instructions[0]}  ${recipe.instructions[1]} 
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                   ${recipe.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${recipe.area}
                  </span>
                </div>
              </div>
            </div>
        `

  }
  document.getElementById("recipes-grid").innerHTML = cartona;
}


// area filter
async function areaFilter(area) {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?area=${area}&page=1&limit=25`);
  if (response.ok) {
    let data = await response.json();
    displayAll(data.results);

    document.getElementById("recipes-count").innerHTML = `Showing ${data.results.length} ${area} recipes`
    endLoading();
  }

}



// category filter 
async function categoryFilter(category) {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&page=1&limit=25`);
  if (response.ok) {
    let data = await response.json();
    displayAll(data.results);
    document.getElementById("recipes-count").innerHTML = `Showing ${data.results.length} ${category} recipes`
    endLoading();
  }
}



// get nutrition information from analyz api
async function getNutritionDetails(data) {
  showLoading();
  let response = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze", {
    method: 'POST', // *METHOD*
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": "yWxBiqeiNG2GGIL5Djsr44z4vovSvCwqjhbx9MKb" // *HEADERS*: Indicates the body format
    },
    body: JSON.stringify(data) // *BODY*: The data payload, stringified
  });
  if (response.ok) {
    let responseData = await response.json();
    console.log(responseData.data.perServing);
    showNutritions(responseData.data);
    recipeNutritions = responseData.data.perServing;
    console.log(recipeNutritions);
    endLoading();

  }
}



// display nutrition information in meal
function showNutritions(nutritions) {
  const nutritionFacts = document.getElementById("nutrition-facts-container");

  nutritionFacts.innerHTML = `
  
            <p class="text-sm text-gray-500 mb-4">Per serving</p>

            <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                <p class="text-sm text-gray-600">Calories per serving</p>
                <p class="text-4xl font-bold text-emerald-600">${nutritions.perServing.calories}</p>
                <p class="text-xs text-gray-500 mt-1">Total: ${nutritions.totals.calories} cal</p>
            </div>

            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutritions.perServing.protein}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min(nutritions.perServing.protein / 50 * 100, 100)}%"></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutritions.perServing.carbs}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(nutritions.perServing.carbs / 300 * 100, 100)}%"></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutritions.perServing.fat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(nutritions.perServing.fat / 65 * 100, 100)}%"></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutritions.perServing.fiber}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(nutritions.perServing.fiber / 67 * 100, 100)}%"></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutritions.perServing.sugar}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: ${Math.min(nutritions.perServing.sugar / 50 * 100, 100)}%"></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutritions.perServing.saturatedFat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: ${Math.min(nutritions.perServing.saturatedFat / 20 * 100, 100)}%"></div>
                </div>
            </div>



            <div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${nutritions.perServing.cholesterol}mg</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${nutritions.perServing.sodium}mg</span>
                    </div>
                </div>
            </div>

  `
}



// get details from api
async function getDetails(id) {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/${id}`)
  if (response.ok) {
    let data = await response.json();

    displayDetails(data.result);
    displayIngredients(data.result);
    displayInstructions(data.result);
    displayVideo(data.result)
    console.log(id);
    console.log(data);
    endLoading();
    // format ingredients array 
    let formattedIngredients = data.result.ingredients.map((item) => { return `${item.measure} ${item.ingredient}` })
    nameAndIngredirnt = {
      recipeName: data.result.name,
      ingredients: formattedIngredients

    }
    getNutritionDetails(nameAndIngredirnt);

    recipeName = data.result.name;
    recipeImgSrc = data.result.thumbnail;




    searchSection.classList.add("hidden");
    categoriesSection.classList.add("hidden");
    allRecipesSection.classList.add("hidden");
    mealDetails.classList.remove("hidden")
    sectionTitle.innerHTML = ` Recipe Details`;
    sectionDescription.innerHTML = `View full recipe information and nutrition facts`
  }

}
// display details that recived from api in meal
function displayDetails(recipe) {
  document.getElementById("hero-img").setAttribute("src", `${recipe.thumbnail}`);
  document.getElementById("hero-category").innerHTML = `${recipe.category}`;
  document.getElementById("hero-area").innerHTML = `${recipe.area}`;
  document.getElementById("hero-title").innerHTML = `${recipe.name}`;
}


// show ingredients
function displayIngredients(recipe) {
  document.getElementById("item-counter").innerHTML = `${recipe.ingredients.length} item`;
  let items = ` `;
  for (let i = 0; i < recipe.ingredients.length; i++) {
    items += `
          <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${recipe.ingredients[i].measure}</span> 
                      ${recipe.ingredients[i].ingredient}
                    </span>
                  </div>
        `
  }
  document.getElementById("ingredients-items").innerHTML = items;
}

// show instructions 

function displayInstructions(recipe) {
  let items = ``;


  for (let i = 0; i < recipe.instructions.length; i++) {
    items += `
           <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      ${i + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${recipe.instructions[i]}
                    </p>
                  </div>
        `
  }
  document.getElementById("instructions-items").innerHTML = items;
}

// show video 

function displayVideo(recipe) {
  if (recipe.youtube) {
    document.getElementById("video-section").classList.remove("hidden")
    document.getElementById("video").setAttribute("src", `https://www.youtube.com/embed/${recipe.youtube.split("watch?v=")[1]}`)
  }
  else {
    document.getElementById("video-section").classList.add("hidden")
  }
}








// show log modal
const logMealBtn = document.getElementById("log-meal-btn");
const logModal = document.getElementById("log-meal-modal");
const cancelLogMeal = document.getElementById("cancel-log-meal");
const emptyLog = document.getElementById("empty-page");

// show and close modal and add meals to log page
logMealBtn.addEventListener("click", function () {
  // show log modal
  showLogModal(recipeName, recipeImgSrc, recipeNutritions);
  logModal.classList.remove("hidden");
  logModal.classList.add("flex");

  // close log modal
  const cancelLogMeal = document.getElementById("cancel-log-meal");
  cancelLogMeal.onclick = function () {
    logModal.classList.add("hidden")
    logModal.classList.remove("flex")
  }

  // increase or decrease meal servings
  const mealServignsNum = document.getElementById("meal-servings");
  const increaseServings = document.getElementById("increase-servings");
  const decreaseServings = document.getElementById("decrease-servings");
  //  increase servings
  increaseServings.onclick = function () {
    mealServignsNum.value = Number(mealServignsNum.value) + 0.5;
  }
  // decreas servings
  decreaseServings.onclick = function () {
    if (mealServignsNum.value > 0.5) {
      mealServignsNum.value -= 0.5;
    }

  }

  // add meal to log page 
  const logMeal = document.getElementById("confirm-log-meal");

  logMeal.addEventListener("click", function () {
    emptyLog.classList.add("hidden");
    addMeals(recipeName, recipeImgSrc, recipeNutritions, mealServignsNum.value);
    logModal.classList.add("hidden")
    logModal.classList.remove("flex")

  })
})


// show meal informtion in log modal
function showLogModal(recipeName, recipeImgSrc, recipeNutritions) {

  logModal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${recipeImgSrc}" alt="Tandoori chicken" class="w-16 h-16 rounded-xl object-cover">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                        <p class="text-gray-500 text-sm">${recipeName}</p>
                    </div>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                    <div class="flex items-center gap-3">
                        <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-minus" data-prefix="fas" data-icon="minus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"></path></svg></i>
                        </button>
                        <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                        <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                        </button>
                    </div>
                </div>


                <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${recipeNutritions.calories}</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">${recipeNutritions.protein}g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">${recipeNutritions.carbs}g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">${recipeNutritions.fat}g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>


                <div class="flex gap-3">
                    <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                    <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                        <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
                        Log Meal
                    </button>
                </div>
            </div>
  `
}








// search meals
const searchInput = document.getElementById("search-input");

async function searchMeals(meal) {
  showLoading()
  let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${meal}&page=1&limit=25`);

  if (response.ok) {
    let data = await response.json();
    displayAll(data.results);
    endLoading();
  }
}

searchInput.oninput = function () {
  searchMeals(searchInput.value);

}





/////// product scanner section//////






// show scanner section
scannerBtn.onclick = function () {

  showScannerPage();
}

// show scanner page
function showScannerPage() {
  searchSection.classList.add("hidden");
  categoriesSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  mealDetails.classList.add("hidden")
  productsSection.classList.remove("hidden")
  foodLogSection.classList.add("hidden");
  sectionTitle.innerHTML = ` Product Scanner`;
  sectionDescription.innerHTML = `Search packaged foods by name or barcode`
}


// show products by search 
const productSearchBtn = document.getElementById("search-product-btn");
const productSearchInput = document.getElementById("product-search-input");
const barcodeInput = document.getElementById("barcode-input");
const barcodeBtn = document.getElementById("lookup-barcode-btn");




barcodeBtn.onclick = function () {  // search by barcode
  getProductsByBarcode(barcodeInput.value);
}
productSearchBtn.onclick = function () { // search by name
  if (productSearchInput.value) {
    getProductsBySearch(productSearchInput.value);
  }

}




let totalProducts;
let productName;
let allProducts = [];


// search for products by name
async function getProductsBySearch(product) {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${product}&page=1&limit=24`);
  if (response.ok) {
    let data = await response.json();
    totalProducts = data.pagination.total;
    productName = product;
    showProducts(data.results);
    console.log(data.pagination.total);

    allProducts = data.results;
    endLoading();
  }
}







// show products
function showProducts(products) {
  let cartona = ``;
  if (!Array.isArray(products)) {
    cartona += `
         <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
                onclick="modalByBarcode('${product.barcode}')"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${products.image}"
                    alt="${products.name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${products.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                   ${products.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${products.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${products.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${products.nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${products.nutrients.protien}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${products.nutrients.carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${products.nutrients.fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${products.nutrients.sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
        `
    document.getElementById("products-count").innerHTML = `Found product : "${products.name}"`
  }
  else {
    for (const product of products) {
      cartona += `
         <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${product.barcode}"
                onclick="modalByBarcode('${product.barcode}')"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${product.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                   ${product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${product.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${product.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
        `
    }
    document.getElementById("products-count").innerHTML = `Found ${totalProducts} products for "${productName}"`
  }

  document.getElementById("products-grid").innerHTML = cartona;
}




// search for products by barcode
async function getProductsByBarcode(barcode) {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`);
  if (response.ok) {
    let data = await response.json();
    showProducts(data.result);

    endLoading();


  }
}





// product grade filter
const productFilterBtn = document.querySelectorAll(".nutri-score-filter");

for (const btn of productFilterBtn) {
  btn.addEventListener("click", function () {
    let grade = this.dataset.grade;
    filterProduct(grade);

  })
}





// get products by grade
function filterProduct(grade) {
  let newProducts = [];
  if (grade === "") {
    newProducts = allProducts;

  }
  else {
    newProducts = allProducts.filter((product) => product.nutritionGrade === grade);
    totalProducts = newProducts.length;
  }
  showProducts(newProducts);
}




// get product categories
async function getProductCategories() {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/products/categories`);
  if (response.ok) {
    let data = await response.json();
    // console.log(data.results);
    showProductCategories(data.results);
    endLoading();

  }
}





// show product categories
function showProductCategories(categories) {
  let cartona = ``;
  for (const category of categories) {
    cartona += `
         <button onclick="getCategoryProducts('${category.name}')"
                class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
              >
                <i class="fa-solid fa-cookie mr-1.5"></i>${category.name}
              </button>
        `
  }
  document.getElementById("product-categories").innerHTML = cartona;
}
getProductCategories();




// get products by categories
async function getCategoryProducts(category) {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/products/category/${category}`);

  if (response.ok) {
    let data = await response.json();
    showProducts(data.results);
    totalProducts = data.pagination.total;
    productName = category;

    endLoading();
  }
}


// display modal for products
const productModal = document.getElementById("productModal");

// get barcode for modal
let product; // for log function
async function modalByBarcode(barcode) {
  showLoading();
  let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`);
  if (response.ok) {
    let data = await response.json();
    displayModal(data.result);
    console.log(data.result);
    product = data.result;
    endLoading();
  }

}


// close modal
function closeModal() {
  productModal.classList.add("hidden")
  productModal.classList.remove("flex");
}
// display modal
function displayModal(product) {
  productModal.classList.remove("hidden")
  productModal.classList.add("flex");
  productModal.innerHTML = `
     <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">

    <!-- Close -->
    <button
      id="closeProductModal"
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
      onclick="closeModal()"
    >
      ✕
    </button>

    <!-- ===== CONTENT ===== -->
    <div class="p-6">

      <!-- Header -->
      <div class="flex items-start gap-6 mb-6">
        <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src="${product.image}"
            alt="${product.brand}"
            class="w-full h-full object-contain"
          />
        </div>

        <div class="flex-1">
          <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand}</p>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
          <p class="text-sm text-gray-500 mb-3">${product.nutrients.calories} cl</p>

          <div class="flex items-center gap-3">
            <div
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50"
            >
              <span
                class="w-8 h-8 rounded flex items-center justify-center text-white font-bold bg-emerald-600"
              >
                ${product.nutritionGrade.toUpperCase()}
              </span>
              <div>
                <p class="text-xs font-bold text-emerald-700">
                  Nutri-Score
                </p>
                <p class="text-[10px] text-gray-600">Excellent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nutrition -->
      <div
        class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200"
      >
        <h3 class="font-bold text-gray-900 mb-4">
          Nutrition Facts
          <span class="text-sm font-normal text-gray-500">(per 100g)</span>
        </h3>

        <div class="text-center mb-4 pb-4 border-b border-emerald-200">
          <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories}</p>
          <p class="text-sm text-gray-500">Calories</p>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div class="text-center">
            <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein}g</p>
            <p class="text-xs text-gray-500">Protein</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs}g</p>
            <p class="text-xs text-gray-500">Carbs</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-purple-600">${product.nutrients.fat}g</p>
            <p class="text-xs text-gray-500">Fat</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar}g</p>
            <p class="text-xs text-gray-500">Sugar</p>
          </div>
        </div>
      </div>

      <!-- Ingredients -->
      <div class="bg-gray-50 rounded-xl p-5 mb-6">
        <h3 class="font-bold text-gray-900 mb-3">Ingredients</h3>
        <p class="text-sm text-gray-600">
          OBD1 999 999 1112606 266963207 mb
        </p>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button onclick="logProduct()"
          class="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
        >
          Log This Food
        </button>
        <button
          id="closeProductModal2"
          class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          onclick="closeModal()"
        >
          Close
        </button>
      </div>

    </div>
  </div>
    `
}




// sidbar anchor tags 
const sidebarLinks = document.querySelectorAll("#sidebar .nav-link");
for (const navLink of sidebarLinks) {
  navLink.addEventListener("click", function () {
    sidebarLinks.forEach((item) => {
      item.classList.remove(
        "bg-emerald-50",
        "text-emerald-700",
        "font-semibold"
      )
      item.classList.add(
        "text-gray-600",
        "hover:bg-gray-50",
        "font-medium"
      )
    })
    navLink.classList.remove(
      "text-gray-600",
      "hover:bg-gray-50",
      "font-medium"
    )
    navLink.classList.add(
      "bg-emerald-50",
      "text-emerald-700",
      "font-semibold"
    )
  })
}


const foodLogBtn = document.getElementById("food-log-btn");
const foodLogSection = document.getElementById("foodlog-section");
foodLogBtn.onclick = function () {
  searchSection.classList.add("hidden");
  categoriesSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  mealDetails.classList.add("hidden")
  productsSection.classList.add("hidden")
  foodLogSection.classList.remove("hidden");
  sectionTitle.innerHTML = ` Food Log`;
  sectionDescription.innerHTML = `Track your daily nutrition and food intake`
}


//////////////// log items section ///////////////////

// set fooding date

const foodingDate = document.getElementById("foodlog-date");

const today = new Date(); // object has date information

today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric"
})

foodingDate.innerHTML = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric"
});


// browse recipes and scan products

const browseRecipesBtn = document.getElementById("browse-recipes");
const scanProductsBtn = document.getElementById("scan-product");

browseRecipesBtn.onclick = function () {
  showMealsPage();
}

scanProductsBtn.onclick = function () {
  showScannerPage();
}






// log meal in log page
const logCounter = document.getElementById("log-counter");
let mealList = [];
let productList = [];

// add meals to log section
function addMeals(recipeName, recipeImgSrc, recipeNutritions, serving) {
  meal = {
    name: recipeName,
    imgSrc: recipeImgSrc,
    nutritions: recipeNutritions,
    servingNum: serving
  }
  mealList.push(meal);
  localStorage.setItem("mealContainer", JSON.stringify(mealList));
  showLogItems();

}
if (localStorage.getItem("mealContainer") !== null) {
  mealList = JSON.parse(localStorage.getItem("mealContainer"))
  emptyLog.classList.add("hidden");
  showLogItems();
}
if (localStorage.getItem("productContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productContainer"))
  emptyLog.classList.add("hidden");
  showLogItems();
}


// delete meals from log section
function deleteMeal(index) {
  mealList.splice(index, 1);
  localStorage.setItem("mealContainer", JSON.stringify(mealList));
  showLogItems();
}


// log product in log page 

// show log products in log section
function logProduct() {
  emptyLog.classList.add("hidden");
  addProducts(product);
  closeModal();
}
// add products
function addProducts(product) {
  product = {
    name: product.name,
    brand: product.brand,
    nutrients: product.nutrients
  }
  productList.push(product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  showLogItems();
}
// delete product
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  showLogItems();
}

let week = []
let totalCalories = 0;
let totalItems = 0;


// show all log items
function showLogItems() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit"
  })
  time.toString();
  let cartona = ``;
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  for (let i = 0; i < mealList.length; i++) {
    cartona += `
    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src="${mealList[i].imgSrc}" alt="${mealList[i].name}" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">${mealList[i].name}</p>
                                <p class="text-sm text-gray-500">
                                    ${mealList[i].servingNum} servings
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">Recipe</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1 time-date">${time}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${mealList[i].nutritions.calories * mealList[i].servingNum}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${mealList[i].nutritions.protein * mealList[i].servingNum}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${mealList[i].nutritions.carbs * mealList[i].servingNum} C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${mealList[i].nutritions.fat * mealList[i].servingNum}g F</span>
                            </div>
                            <button onclick="deleteMeal(${i})" class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="0">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>
    `
    calories += mealList[i].nutritions.calories * mealList[i].servingNum;
    protein += mealList[i].nutritions.protein * mealList[i].servingNum;
    carbs += mealList[i].nutritions.carbs * mealList[i].servingNum;
    fat += mealList[i].nutritions.fat * mealList[i].servingNum;

  }
  for (let i = 0; i < productList.length; i++) {
    cartona += `
    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i>
                                </div>
                            <div>
                                <p class="font-semibold text-gray-900">${productList[i].name}</p>
                                <p class="text-sm text-gray-500">
                                    ${productList[i].brand}
                                    <span class="mx-1">•</span>
                                    <span class="text-blue-600">Product</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1 time-date">${time}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${productList[i].nutrients.calories}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${productList[i].nutrients.protein}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${productList[i].nutrients.carbs} C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${productList[i].nutrients.fat} F</span>
                            </div>
                            <button onclick="deleteProduct(${i})" class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="1">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>
    `
    calories += productList[i].nutrients.calories;
    protein += productList[i].nutrients.protein;
    carbs += productList[i].nutrients.carbs;
    fat += productList[i].nutrients.fat;
  }
  if (cartona === ``) {
    emptyLog.classList.remove("hidden");

    document.getElementById("log-meal-product").innerHTML = cartona
  }
  else {
    document.getElementById("log-meal-product").innerHTML = cartona;
  }
  logCounter.innerHTML = `Logged Items (${mealList.length + productList.length})`
  document.getElementById("progress-bars").innerHTML = `
     <h3 class="text-lg font-bold text-gray-900 mb-4">
              <i class="fa-solid fa-fire text-orange-500 mr-2"></i>
              Today's Nutrition
            </h3>

            <!-- Progress Bars -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              <!-- Calories Progress -->
              <div class="bg-emerald-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Calories</span
                  >
                  <span class="text-sm text-gray-500">${Math.round(calories)} / 2000 kcal</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-emerald-500 h-2.5 rounded-full"
                    style="width: ${Math.min(calories / 2000 * 100, 100)}%"
                  ></div>
                </div>
              </div>
              <!-- Protein Progress -->
              <div class="bg-blue-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Protein</span
                  >
                  <span class="text-sm text-gray-500">${Math.round(protein)}  / 50 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-blue-500 h-2.5 rounded-full"
                    style="width: ${Math.min(protein / 50 * 100, 100)}%"
                  ></div>
                </div>
              </div>
              <!-- Carbs Progress -->
              <div class="bg-amber-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Carbs</span>
                  <span class="text-sm text-gray-500">${Math.round(carbs)} / 250 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-amber-500 h-2.5 rounded-full"
                    style="width: ${Math.min(carbs / 250 * 100, 100)}%"
                  ></div>
                </div>
              </div>
              <!-- Fat Progress -->
              <div class="bg-purple-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Fat</span>
                  <span class="text-sm text-gray-500">${Math.round(fat)} / 65 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-purple-500 h-2.5 rounded-full"
                    style="width: ${Math.min(fat / 65 * 100, 100)}%"
                  ></div>
                </div>
              </div>
            </div>
  `
  document.getElementById("today-calories").innerHTML = Math.round(calories);
  document.getElementById("week-calories").innerHTML = Math.round(calories / 7);
  document.getElementById("today-items").innerHTML = `${mealList.length + productList.length} items`;
  document.getElementById("week-items").innerHTML = `${mealList.length + productList.length} items`;



}





//week chart

const weekDays = document.querySelectorAll(".weekday");
const days = document.querySelectorAll(".day");



for (let i = weekDays.length - 1; i >= 0; i--) {
  let date = new Date(today)

  date.setDate(today.getDate() - i);
  let dayNumber = date.getDate();
  days[weekDays.length - 1 - i].innerHTML = dayNumber;
  let dayName = date.toLocaleDateString("en-US", {
    weekday: "short"
  })
  weekDays[weekDays.length - 1 - i].innerHTML = dayName;
}

