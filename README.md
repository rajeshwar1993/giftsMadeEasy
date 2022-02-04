# giftsMadeEasy
This will make gift searching easy

docker:
set COMPOSE_DOCKER_CLI_BUILD=1 
set DOCKER_BUILDKIT=1 
docker-compose build
docker-compose up

deploy:
gcloud builds submit --tag gcr.io/giftsmadeeasy-75edd/public_fe --project giftsmadeeasy-75edd

Run:
gcloud run deploy --image gcr.io/giftsmadeeasy-75edd/public_fe --project giftsmadeeasy-75edd --platform managed

GCR: https://publicfe-rcaojxe24a-el.a.run.app