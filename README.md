<p align="center">
    <img title="Termii" src="https://termii.com/assets/images/logo.png"/>
</p>

## TERMII-TS

Termii SDK for typescript to aid in interfacing with the termii API

## FEATURES

- Switch


Termii’s Switch allows you to send messages to any country in the world across SMS and WhatsApp channel through a REST API. Every request made is identified by a unique ID that help our users track the status of their message either by receiving Delivery Reports (DLRs) over their set webhook endpoints or polling the status of the message using a specific endpoint. The Switch is organised around using HTTP verbs and REST. It accepts and returns JSON formatted payload.

- Token

Token allows businesses generate, send and verify one-time-passwords. Token is organised around using HTTP verbs and REST. It accepts and returns JSON formatted payload.

- Insights

Retrieve real-time delivery report of messages sent to customers as well as the status of their contacts.

## Installation

```sh
npm install termii-ts
```

## Usage
```
import * as termii from 'termii-ts'

const client = new termii.Client(
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
```
## Contributors
This SDK was created with ❤ by [Hebron Praise](https://github.com/panam-py)

