
//require db 
var notesData = require("../db/db.json");
var fs = require("fs");
var path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

function parseNotes() {
    if (typeof notesData ===  'string') {
        return JSON.parse(notesData);
    }
    else {
        return notesData;
    }
}

const parsedNotes = parseNotes();

module.exports = function(app) {
  

  app.get("/api/notes", function(req, res) {
    res.json(parsedNotes);
  });

  app.post("/api/notes", function(req, res) {
    parsedNotes.push(req.body);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      }
      fs.writeFileSync(outputPath, JSON.stringify(parsedNotes), "utf-8");
    res.json({ success: true });
  });

  app.delete('/api/notes/:id', function (req, res) {
    for (i = 0; i < parsedNotes.length; i++) {
        if(parsedNotes[i].id === req.params.id){
            parsedNotes.splice(i, 1);;
        }    
    }
    fs.writeFileSync(outputPath, JSON.stringify(parsedNotes), "utf-8");
    res.end();
  });

};
