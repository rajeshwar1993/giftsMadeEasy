# giftsMadeEasy
This will make gift searching easy

docker:
set COMPOSE_DOCKER_CLI_BUILD=1 
set DOCKER_BUILDKIT=1 
docker-compose build
docker-compose up

deploy:
gcloud builds submit --tag gcr.io/giftsmadeeasy-75edd/tofa_circle_public_fe --project giftsmadeeasy-75edd --timeout=30m

Run:
gcloud run deploy --image gcr.io/giftsmadeeasy-75edd/tofa_circle_public_fe --project giftsmadeeasy-75edd --platform managed

GCR: https://publicfe-rcaojxe24a-el.a.run.app


"Art and Playdough↵Colouring Books, Kinetic Sand etc.": 0
Bamboo & Jute: 0
"Fragnance & Candles↵Room Fragrances, Scented Candles and Room Ambience.": 0
"Hand-made Products↵All Handmade and natural products.": 0
"Remote Controlled Toys↵RC Cars, Helicopters, Planes etc.": 5
Tablets: 8