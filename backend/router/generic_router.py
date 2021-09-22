from flask import Flask, jsonify
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config['SECRET_KEY'] = 'xo8R7i5fjFkUoNQr_wP8ZG7zw3JwRwwaz9_i4146YAM'

jwt = JWTManager(app)

@app.route("/", methods=["GET"])
def welcome_to_anime():
    return jsonify({'Welcome':True})