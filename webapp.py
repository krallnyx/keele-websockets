from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'Welcome to CSC40088 Fundamentals of Comp Sci'


app.run(host='0.0.0.0', port=8081)
