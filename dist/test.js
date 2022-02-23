"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const termii_1 = require("./termii");
const client = new termii_1.Client("TLP5Z7WVApOTkOtnRckecOGiOyNzY61x8A3LwIdwVNO8PAGhyrslhB6jKKxTHy");
(async () => {
    try {
        const phonebooks = await client.fetchPonebooks();
        console.log(phonebooks);
    }
    catch (e) {
        console.log(e);
    }
})();
