import express from 'express';
import fs from 'fs';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let data;
try {
  data = JSON.parse(fs.readFileSync('properties.json', 'utf-8'));
} catch (err) {
  console.error('Error reading data.json:', err);
  process.exit(1); // 
}


app.get('/api/properties', (req, res) => {
  res.json(data.properties);
});

app.get('/api/properties/:id', (req, res) => {
  const { id } = req.params;

  const property = data.properties.find(prop => prop._id === id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).send('Property not found');
  }
});


app.post('/api/properties', (req, res) => {
    const newProperty = req.body;
    data.properties.push(newProperty);
    
    fs.writeFile('properties.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
        console.error('Error writing data.json:', err);
        res.status(500).send('Error writing data.json');
        } else {
        res.status(201).json(newProperty);
        }
    });
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
