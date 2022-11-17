# Development

### Link to Deployed Website
https://sleepychinchilla241.github.io/uiuxassignment5/

### Goal and Value of the Application
This is an extension of the website I redesigned for the Responsive Redesign assignment - the Bagel Gourmet website. I'd redesigned the menu page for Responsive Redesign, and decided to implement part of an online ordering page for the restaurant chain for this assignment. My main complaint with the original website was the small font size and the confusing organization. I've implemented various filtering features and sorting features to make the interface simpler for customers to use. 

### Usability Principles Considered
The website incorporates various conventions of online shopping websites as well as characteristics like reading direction into its design.
- The filter and sorting panel is to the left of the main content of the page, as is conventionally seen in online shopping websites like Amazon.com
- The add to cart button is on the right side of its line, keeping with the principle of having action buttons at the end of the scan pattern
- Similarly, the "View Cart" button is also at the end of the scan pattern, on the right side of the page
- The information for each menu item is grouped within its own box of the CSS grid, and the different background colours of the menu boxes and the actual webpage help create a visual separation between adjacent menu items
- Important information, like item names and prices, are displayed in bold and larger text
- The buttons for adding to the cart and removing from the cart are similarly highlighted by their white background colour and large size

### Organization of Components
Most of the content of the page is seated within the "Contents" div. Distinct components with different purposes have received their own divs within the Contents div. The filtering menu has its own div, and the options within it are organized as an unordered list. The menu display itself is a separate component. Both the menu display and the page contents were organized using CSS grid. The shopping cart is also a separate component that pops over the main page content when the "View Cart" button is selected. Additional items serving a similar function or purpose are often grouped within a single div to make it easy to identify component groups within the code. 

States have been used to track whether items were added to or removed from the cart, whether specific filters were applied, and whether a specific sorting order was specified. A state was also used to keep track of whether the user had selected the "View Cart" button, in order to determine whether the popover containing the cart should be made visible. This state also keeps track of whether the user clicks away from the cart, so it can hide the popover when they do so that they can see the menu underneath.

### How Data is Passed Down Through Components
The contents of the cart are passed using the props passed as arguments to the ShowCart component and the CartContents component (used to display how many of an item are present in the user's cart on the corresponding item card). Individual items' data is passed into the props argument of the CartItems component, which is used to display the item card for each menu item on the website. Due to the deeply interconnected and interdependent nature of the filtering components, data concerning these components is never passed outside the App function. 

All the menu data is imported from the menu-data.json file. 


### How the User Triggers State Changes
Users trigger state changes for the filter menu items by selecting the corresponding checkbox. For the sorting menu, the user can select at most one of the checkboxes at a time, but unselecting all checkboxes will not restore items to their original (arbitrary) order on the webpage, since that ordering was destroyed by the subsequent filtering operations. 

To trigger state changes with the shopping cart, the user should click the "+" or "-" buttons for the corresponding menu items. This will also change the number displayed on the corresponding item card. Users cannot decrement the number of items in the cart below zero by clicking the "-" button, though there is no upper limit to how many items they can add to their cart by clicking the "+" button. 


