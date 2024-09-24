// Get the current year
const currentYear = new Date().getFullYear();
        
// Set the current year in the element with id "year"
document.getElementById("current-year").textContent = currentYear;

// MOBILE BURGER MENU

// OPEN
function openMenu() {
    document.body.classList += " menu--open"
}

// CLOSE
function closeMenu() {
    document.body.classList.remove('menu--open')
}