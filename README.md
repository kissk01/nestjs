<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

### Description

Project: Peer-to-Peer Payments System
Overview:
Your task is to design a simple version of a Peer-to-Peer (P2P) payment system. The system should allow users to send money to others, request money, and check their balance.
Core requirements:
User registration and login
Create APIs for users to register and log in to the system. Registration should collect necessary information like name, email and password.
Create a transaction
Users should be able to create a transaction to send money to another user by specifying the recipient's email (or other unique identifier) and the amount.
Request money
Users should be able to request money from another user. The recipient should then be able to accept or reject the request.
View Balance
Users should be able to check their current balance. The balance should be updated in real time after every transaction.
Transaction history
Users should be able to see a list of all past transactions, showing who the transaction was with, whether money was sent or received, the amount, and the date and time of the transaction.
Bonus Goals:
Handle concurrency
Implement a solution for handling simultaneous transactions. Ensure that a user cannot send money they do not have, even if two transactions that would overdraw the account are initiated at the same time.
Secure transactions
Add an additional layer of security where users need to input a 2FA code sent to their email when sending money.
Automated tests
Write automated tests for your APIs. These could be unit tests for individual functions or integration tests for the APIs as a whole.
Notifications
Implement a system to notify users when they receive money or a money request. This could be as simple as sending an email, or more complex like using a real-time messaging system.
Pagination
Implement pagination in the transaction history endpoint.
Additional Requirements:
Persistence: You should use Prisma, TypeORM or similar ORM for handling database operations.
Dockerization: Your application should be dockerized and should run flawlessly using Docker.
Startup Instructions: Include clear instructions on how to run your application in the repository.
Swagger Documentation: Use Swagger to document your APIs.

---

Evaluation:
We will be looking at several aspects of your solution:
Functionality: Does the system work as described in the requirements?
Code quality: Is the code well-organized and easy to understand?
Data modeling: How well does your database schema and data structures fit the problem? Are indices used correctly, etc.?
Error handling: Does the system handle potential errors gracefully, such as invalid inputs or database issues?
Concurrency: How well does the system handle multiple simultaneous transactions?
Please choose either Express.js or Nest.js as the framework to implement this. We look forward to your solution!

Create Transaction:

Endpoint: POST /api/transactions
Description: Allows users to create a transaction to send money to another user by specifying the recipient's email and the amount.
Request Money:

Endpoint: POST /api/transactions/request
Description: Allows users to request money from another user by specifying the recipient's email and the amount.
Accept/Reject Money Request:

Endpoint: PUT /api/transactions/request/:requestId
Description: Allows the recipient of a money request to accept or reject the request.
View Balance:

Endpoint: GET /api/balance
Description: Allows users to check their current balance.
Transaction History:

Endpoint: GET /api/transactions/history
Description: Allows users to view a list of all past transactions, showing details such as the transaction partner, type (sent or received), amount, and date/time.
