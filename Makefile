.PHONY: start use

start:
	npm start

node-use:
	for /f "usebackq delims=" %%v in (".nvmrc") do nvm use %%v
