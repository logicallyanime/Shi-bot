const util = require('util');
const Flashcards = require('./FlashcardGame');
var users = new Map();

module.exports = {
    /**
     * Looks up user id from the hash returns the Game object if present
     * @param {String} userID ID of the user
     * @returns {Flashcards|null} Will return a Game object if user is in the hash, else returns null
     */
    get: function(userID) {
        try {
            return users.get(userID);
            
        } catch (error) {
            console.log("No user active");
        }
    },

    set: function(userID){
        if (!users.has(userID)) {
            users.set(userID, new Flashcards());
        } else {
            console.log("User alread active!");
        }
    },

    has: function(userID) {
        return users.has(userID);
    }

}