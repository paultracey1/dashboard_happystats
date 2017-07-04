from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os
 
app = Flask(__name__)

# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'happystats'
# COLLECTION_NAME = 'projects'

MONGODB_URI = os.environ.get('MONGODB_URI')
DBS_NAME = os.environ.get('MONGO_DB_NAME', 'happystats')
COLLECTION_NAME = os.environ.get('MONGO_COLLECTION_NAME', 'projects')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/happystats/projects")
def donor_projects():
    FIELDS = {
        '_id': False, 'Country': True, 'Region': True,
        'Happiness Rank': True, 'Happiness Score': True,
        'Economy (GDP per Capita)': True, 'Family': True, 
        'Health (Life Expectancy)': True, 'Freedom': True, 
        'Trust (Government Corruption)': True, 'Generosity': True, 
        'Dystopia Residual': True
    }

    with MongoClient(MONGODB_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS, limit=55000)
        return json.dumps(list(projects))

if __name__ == "__main__":
    app.run(debug=True)


