Crea un diagrama que represente la situación en la que 
    el usuario crea una nueva nota utilizando la versión de una sola página de la aplicación.
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser execute the JavaScript code that recieved previusly from the server to ad the note<br>in the same page

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa    
```