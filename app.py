
from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# In-memory user store (replace with database in production)
users = {}

@app.route('/')
def home():
    return redirect(url_for('signup'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            return render_template('signup.html', message="Passwords do not match")

        if username in users:
            return render_template('signup.html', message="Username already exists")

        users[username] = {
            'name': name,
            'email': email,
            'phone': phone,
            'password': generate_password_hash(password)
        }
        return redirect(url_for('login'))
    return render_template('signup.html')


app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # For demo, we're just checking fixed values
        if username == 'admin' and password == 'password':
            session['user'] = username
            return redirect(url_for('index'))  # 👈 redirect to index.html
        else:
            return render_template('login.html', message="Invalid credentials")
    return render_template('login.html')

@app.route('/index')
def index():
    if 'user' in session:
        return render_template('index.html', user=session['user'])
    return redirect(url_for('login'))

