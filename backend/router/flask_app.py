from router import anime_app, user_app, generic_app
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from flask import Flask


app = Flask(__name__)

app.wsgi_app = DispatcherMiddleware(generic_app, {
    "/anime": anime_app,
    "/user" : user_app
})
