    # Cloud Chatroom

## About

This is a cloud computing project.

## Instructions

Below are the installing and running procedues

### Installing

For this project, I used : **npm v6.14.10**, **pip v20.3.3**, **python v3.7**

1. make sure you have python, npm, and pip installed on your machine.
2. Enter in to the directary *src/templates/* and run the command `npm install`. This will download and install all the dependencies listed in *package.json*.
3. Create a python virtualenv(Optional) using miniconda: `conda create -n cloud python=3.7`
4. Run `conda activate cloud`
5. Install python dep with the command `$ pip install -r requirements.txt`

### Running

1. In terminal : `export FLASK_DEBUG=1 && export FLASK_ENV=development`
2. Run `flask run` in the root dir
3. In the templates directory, start the npm watcher to build the front end code with the command `npm run watch`
4. If all is working correctly, you will be given an address [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

## Reference

You can find a walkthrough of how to build this application from scratch on [my blog](https://medium.com/@tonyparkerkenz/a-template-for-creating-a-full-stack-web-application-with-flask-npm-webpack-and-reactjs-be2294b111bd)
