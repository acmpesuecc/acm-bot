# bounty-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that A Bounty Bot by ACM PESU ECC!

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t bounty-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> bounty-bot
```

## How to add Bounty
```
1. go to the comment section for the particular pull request
2. mention !bounty <bounty value> in the comment and the bounty will be added to the particular PR.
```
  
## Contributing

If you have suggestions for how bounty-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2020 Srujan Deshpande <srujan.deshpande@gmail.com>
