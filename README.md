# HackTrack

HackTrack is a web application where users can find and upload real-world problem statements. The platform allows users to explore issues, contribute their own problem statements, explore solutions, and post their own solutions. Users can also track the number of posts they have submitted.

> ⚠️ Note: This project is still under development. Some features are pending and will be completed soon.

## Features

- **User Authentication:** Secure signup and login system using Passport.js with session management.
- **Post Problems:** Users can upload real-world problems for discussion.
- **Browse Problems:** Explore a variety of problems posted by other users.
- **Post Solutions:** Users can submit solutions to existing problems.
- **Browse Solutions:** Explore solutions provided by other users.
- **User Dashboard:** Track the number of posts a user has submitted.
- **Error Handling & Validations:** Ensures data integrity and a seamless user experience.

## Tech Stack

- **Frontend:** EJS (Embedded JavaScript Templates)
- **Backend:** Express.js (Node.js framework)
- **Database:** MongoDB (NoSQL database)
- **Authentication:** Passport.js with session-based authentication
- **Styling:** CSS

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/HackTrack.git
   cd HackTrack
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   ```

4. Start the server:
   ```sh
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`.

## Folder Structure

```
HackTrack/
│-- controllers/       
│-- init/              
│-- models/            
│-- public/            
│-- routes/            
│-- utils/             
│-- views/             
│-- app.js             
│-- middleware.js      
│-- schema.js          
│-- package.json       
│-- .gitignore   
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to update this README file with any additional details specific to your project!


