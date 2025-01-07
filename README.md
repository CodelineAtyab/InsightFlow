# Feedback Board Project

A single-page Feedback Board (UI) with an accompanying Spring Boot API (backend).

## Prerequisites

- **Java 17 or higher** (ensure `JAVA_HOME` is set appropriately)
- **Maven 3.8+** (or Gradle, depending on your setup)
- A modern **web browser** to open and interact with the UI

## How to Run

### 1. Clone or Download the Project
- Obtain the project files (both the Spring Boot application and the `index.html` UI).

### 2. Build and Start the Spring Boot Application
1. Navigate to the root folder where the `pom.xml` (or equivalent build file) resides.
2. Use Maven (or your chosen build tool) to compile and start the Spring Boot application.
    - For Maven:
      ```
      mvn spring-boot:run
      ```
    - The application will start on **port 8080** by default, unless configured otherwise.

### 3. Open the UI
1. Locate the `index.html` file in your project.
2. Open `index.html` directly in your web browser (e.g., by double-clicking it or dragging it into a browser window).
3. The UI will make API calls to `http://localhost:8080/api/v1/card`.

### 4. Test the Functionality
- **Add Cards**: Click on the **+ Add** button under any column to add a new card.
- **Delete Cards**: Click on the **×** (delete) icon on a card to remove it.
- **Drag & Drop**: Drag a card from one column to another; it will be removed from the old column and created in the new one.

### 5. Verify API Calls
You can use a tool like `curl` or **Postman** to verify the REST endpoints:
- **GET** all cards: `GET http://localhost:8080/api/v1/card`
- **POST** a new card: `POST http://localhost:8080/api/v1/card`
- **DELETE** an existing card: `DELETE http://localhost:8080/api/v1/card/{id}`

---

## Project Structure (High-Level)

1. **Backend** (Spring Boot)
    - Contains the REST controller (`CardController`) that exposes the **GET**, **POST**, and **DELETE** endpoints for managing cards.
    - Stores cards in a thread-safe in-memory list (`CopyOnWriteArrayList`).

2. **Frontend** (HTML/CSS/JavaScript)
    - A single `index.html` page that:
        - Displays three columns: **Went Well**, **Challenges Faced**, and **Action Items**.
        - Uses **fetch()** to make calls to the Spring Boot API.
        - Implements drag-and-drop to move cards between columns.

### Enjoy!
With these steps, you can run and interact with the Feedback Board project locally. Feel free to customize the color theme, add more columns, or integrate a real database in the back end for production environments.
