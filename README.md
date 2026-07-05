# ASSIGNMENT-02


Core FeaturesDynamic Data Fetching: When the site first loads, it automatically reaches out to the API and retrieves a default list of 10 drinks to display immediately.  
Live Search Functionality: Users can type a drink name into the search bar. The app will fetch the specific results and rebuild the grid layout instantly. If a drink doesn't exist, it gracefully handles the error by displaying a "Not found!" message. 

Group Selection Cart: The layout features a 2-column design. The right side acts as a "cart" where users can curate a group of drinks. As users click "Add to Group," the app updates the total count and lists the drink name. 

State Management & Constraints: The app actively monitors how many drinks have been added. To prevent the group from getting too large, it restricts the user to a maximum of 7 drinks, triggering an alert if they try to add an 8th.

Detailed Modal Views: Instead of cluttering the main screen, clicking the "Details" button opens a pop-up modal. This modal isolates a specific drink and displays at least 5 detailed pieces of information, such as the exact instructions, glass type, and category.  Technical StackHTML5: Provides the semantic structure of the application.

CSS3 & Bootstrap 5: Bootstrap handles the responsive grid system, the styling of the cards, and the pre-built modal component. Custom CSS is used minimally to keep images uniform and the sidebar sticky.


Vanilla JavaScript: Handles all the logic, including asynchronous API requests (fetch), DOM manipulation (creating and injecting HTML elements on the fly), and event listening (button clicks and keyboard presses).
