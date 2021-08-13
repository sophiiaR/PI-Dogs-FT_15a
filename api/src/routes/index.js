const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getDogsApi = async () => {
	try {
		const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
		const apiData = await apiUrl.data.map(dog => {
			return {
				id: dog.id,
				name: dog.name,
				height: dog.height,
				weight: dog.weight,
				life_span: dog.life_span,
				temperament: dog.temperament, 
				image: dog.image
			}
		});
		return apiData;
	} catch (error) {
		console.log(error);
	}
}

const getDogsDb = async () => {
	try {
		return await Dog.findAll({
			include: {
				model: Temperament,
				attributes: ['name'],
				through: {
					attributes: []
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
}

const getAllDogs = async () => {
	try {
		const apiData = await getDogsApi();
		const dbData = await getDogsDb();
	
		const totalDogs = apiData.concat(dbData);
		return totalDogs;
	} catch (error) {
		console.log(error);
	}
}

router.get('/dogs', async (req, res) => {
	const { name } = req.query;
	const allDogs = await getAllDogs();

	if(name) {
		const dogName = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
		dogName.length ? res.status(200).send(dogName) : res.status(404).send('There is no dog under that name');
	} else {
		res.status(200).send(allDogs);
	}
});

router.get('/temperament', async (req,res) => {
	try {
		const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
		const temp = temperamentApi.data.map(dog => dog.temperament && dog.temperament.split(','));
		//console.log(temp.flat());
		const tempList = temp.flat().map(el => el && el.trim())
		let unique = [...new Set(tempList)].sort();
		console.log(unique);

		unique.forEach(temperament => {
			temperament && Temperament.findOrCreate({
				where: {
					name: temperament
				}
			})
		});

		const totalTemperaments = await Temperament.findAll();
		res.send(totalTemperaments);
	} catch (error) {
		console.log(error);
	}
});

router.get('/dogs/:idRaza', async (req,res) => {
	const { idRaza } = req.params;
	const totalDogs = await getAllDogs();
	if(idRaza) {
		const dogId = await totalDogs.filter(dog => dog.id == idRaza);
		dogId.length ? res.status(200).json(dogId) : res.status(404).send('Sorry! That dog does not exist')
	}
});

router.post('/dog', async (req,res) => {
	const {
		name,
		height,
		weight,
		life_span,
		image,
		temperament,
		createdInDb 
	} = req.body;

	const dogCreated = await Dog.create({
		name,
		height,
		weight,
		life_span,
		image,
		createdInDb
	});

	const dogTemperamentDb = await Temperament.findAll({
		where: {
			name: temperament
		}
	})

	dogCreated.addTemperament(dogTemperamentDb);
	res.send('The dog was created successfully!');
});

module.exports = router;
