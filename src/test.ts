import { Client } from "./termii";

const client = new Client(
  "TLP5Z7WVApOTkOtnRckecOGiOyNzY61x8A3LwIdwVNO8PAGhyrslhB6jKKxTHy"
);

(async () => {
  try {
    const phonebooks: object = await client.fetchPonebooks();
    console.log(phonebooks);
  } catch (e) {
    console.log(e);
  }
})();
