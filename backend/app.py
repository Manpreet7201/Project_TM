# from flask import Flask, jsonify, req
# app = Flask(__name__)

# @app.route('/')
# def index():
#     return 'Index Page'

# @app.route('/hello')
# # def hello():
# #     return 'Hello, World'
# def get_user():
#     user_data = {
#         "id": 1,
#         "name": "Alice",
#         "status": "active"
#     }
#     # returns a JSON response with status 200
#     return jsonify(user_data) 

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   #enables cross-origin access

tasks = []

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    task = {
        "id": len(tasks) + 1,
        "title": data["title"]
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task["id"] != id]
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)

