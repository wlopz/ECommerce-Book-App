let books; // Declare a variable to store the books data.

// Define an async function that renders the books based on an optional filter.
async function renderBooks(filter) {
  // Select the DOM element with the class 'books', which will contain the rendered books.
  const booksWrapper = document.querySelector('.books');

  // Add a 'books__loading' class to the wrapper to indicate loading.
  booksWrapper.classList += ' books__loading';

  // Check if the 'books' variable is not already populated. If it's empty, fetch the books data.
  if (!books) {
    books = await getBooks(); // Wait for the books to be fetched asynchronously.
  }

  // Remove the 'books__loading' class once books are loaded to stop the loading indication.
  booksWrapper.classList.remove('books__loading');

  // If the filter is 'LOW_TO_HIGH', sort the books by price in ascending order, using salePrice if available, otherwise use originalPrice.
  if (filter === 'LOW_TO_HIGH') {
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
  }
  // If the filter is 'HIGH_TO_LOW', sort the books by price in descending order.
  else if (filter === 'HIGH_TO_LOW') {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  }
  // If the filter is 'RATING', sort the books by their rating in descending order.
  else if (filter === 'RATING') {
    books.sort((a, b) => b.rating - a.rating);
  }

  // Map over the books array to generate HTML for each book.
  const booksHtml = books.map((book) => {
    return `<div class="book">
       <figure class="book__img--wrapper">
         <img class="book__img" src="${book.url}" alt="">
       </figure>
       <div class="book__title">
         ${book.title}
       </div>
       <div class="book__ratings">
         ${ratingsHTML(book.rating)}  // Call a helper function to render the stars for the rating.
       </div>
       <div class="book__price">
          ${priceHTML(book.originalPrice, book.salePrice)} // Call another helper function to render the price.
      </div>
     </div>`
  }).join(''); // Join all generated HTML into a single string.

  // Insert the generated HTML into the booksWrapper to display it on the page.
  booksWrapper.innerHTML = booksHtml;
}

// A helper function that generates the price HTML, handling whether there's a sale price or not.
function priceHTML(originalPrice, salePrice) {
  // If there's no sale price, display only the original price.
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  // If there is a sale price, display both the original price (crossed out) and the sale price.
  else {
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>&nbsp $${salePrice.toFixed(2)}`;
  }
}

// A helper function that generates the HTML for the rating stars based on the rating value.
function ratingsHTML(rating) {
  let ratingHTML = ""; // Initialize an empty string to build the HTML.

  // Add a full star icon for every whole number in the rating.
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }

  // If the rating is not an integer (e.g., 4.5), add a half-star icon.
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }

  // Return the generated HTML for the star ratings.
  return ratingHTML;
}

// A function to handle filtering books based on user input from an event (e.g., a dropdown change).
function filterBooks(event) {
  // Get the selected filter value and pass it to the renderBooks function.
  renderBooks(event.target.value);
}

// Delay the initial rendering of books for 1 second after the page loads.
setTimeout(() => {
  renderBooks(); // Call renderBooks without any filter.
}, 1000);

// A function to simulate an asynchronous fetch of books data.
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return an array of book objects after a 1-second delay.
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,  // No sale price for this book.
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,  // No sale price for this book.
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,  // No sale price for this book.
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,  // No sale price for this book.
          rating: 4.5,
        },
      ]);
    }, 1000); // Simulate a 1-second delay before resolving the promise.
  });
}
