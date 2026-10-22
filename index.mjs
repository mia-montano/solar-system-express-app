const solarSystem = (await import("npm-solarsystem")).default;

import express from 'express';
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

function shuffleArray(array) {
  const shuffled = array; 
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

app.get('/', async (req, res) => {
    // let imageResponse = await fetch(`https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=10&orientation=horizontal&q=solar`);
    // let imageData = await imageResponse.json();

    // console.log(imageData);

    try {
        const response = await fetch(`https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=30&orientation=horizontal&q=solar`);

        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }

        const data = await response.json();
        console.log(data);

        let ranData = shuffleArray(data.hits);
        ranData.length = 4;

        // write code for what happens after request here
        res.render('home.ejs', { images: ranData });

    } catch (err) { //JUST do console.log('error message');
        console.log('error accessing API endpoint');
        let errorMsg = "Error accessing API endpoint";
        res.render('error.ejs', { message: errorMsg });

    } //catch
});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;

    if (planet == 'mercury') {
        let mercuryData = solarSystem.getMercury();

        console.log(mercuryData); //shows up on server side terminal (not in browser)

        res.render('planet.ejs', { planetData: mercuryData })
    } else if (planet == 'venus') {
        let venusData = solarSystem.getVenus();

        console.log(venusData);

        res.render('planet.ejs', { planetData: venusData })
    } else if (planet == 'earth') {
        let earthData = solarSystem.getEarth();

        console.log(earthData);

        res.render('planet.ejs', { planetData: earthData })
    } else if (planet == 'mars') {
        let marsData = solarSystem.getMars();

        console.log(marsData);

        res.render('planet.ejs', { planetData: marsData })
    } else if (planet == 'jupiter') {
        let jupiterData = solarSystem.getJupiter();

        console.log(jupiterData);

        res.render('planet.ejs', { planetData: jupiterData })
    } else if (planet == 'saturn') {
        let saturnData = solarSystem.getSaturn();

        console.log(saturnData);

        res.render('planet.ejs', { planetData: saturnData })
    } else if (planet == 'uranus') {
        let uranusData = solarSystem.getUranus();

        console.log(uranusData);

        res.render('planet.ejs', { planetData: uranusData })
    } else if (planet == 'neptune') {
        let neptuneData = solarSystem.getNeptune();

        console.log(neptuneData);

        res.render('planet.ejs', { planetData: neptuneData })
    } else if (planet == 'pluto') {
        let plutoData = solarSystem.getPluto();

        console.log(plutoData);

        res.render('planet.ejs', { planetData: plutoData })
    }
});

app.listen(3000, () => {
    console.log('server started');
});

// old
// if (planet === 'Mercury') {
//       let mercuryPicture = "https://science.nasa.gov/wp-content/uploads/2023/09/spectra-mercury.jpg?w=1024";
//       let mercuryFact = "Tempurature: 167°C";
//       res.render('planet.ejs', {name: "Mercury", image: mercuryPicture, fact: mercuryFact});
//    }