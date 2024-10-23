const express = require('express')
const app = express()
const path = require('path');
const port = 3000;
const fs = require('fs');


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home')
  })

  app.get('/details', (req, res) => {
    const studentName = req.query.studentName;
    if (!studentName) {
        return res.render('error',{status:400,message:`Student name required`});
    }
    fs.readFile('./student.json','utf-8',(err,data)=>
    {
        if (err) {
            res.render('error',{status:500,message:`Failed to load the file`});
        }
        const details = JSON.parse(data);
        const student = details.find(s => s.name.toLowerCase() === studentName.toLowerCase());
        if (student) {
            return res.render('details',
            {name:student.name,
             age:student.age,
             grade:student.grade,
             totalMark:student.total_marks
            });      
        }
         else {
            return res.render('error',{status:404,message:`Student named ${studentName} Not found`});
        }
    }) 
  })

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })