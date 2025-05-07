from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("main.html")

@app.route('/another_page')
def another_page():
    return str(1 + 1)

if __name__ == "__main__":
    app.run()