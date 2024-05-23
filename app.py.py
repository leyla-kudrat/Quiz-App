from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

with open('questions.json') as f:
    questions = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/results')
def results():
    score = request.args.get('score')
    return render_template('results.html', score=score)

@app.route('/questions')
def get_questions():
    return jsonify(questions)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    user_answers = data['answers']
    correct_answers = [q['correct'] for q in questions]
    score = sum(1 for ua, ca in zip(user_answers, correct_answers) if ua == ca)
    return jsonify({'score': score})

if __name__ == '__main__':
    app.run(debug=True)
