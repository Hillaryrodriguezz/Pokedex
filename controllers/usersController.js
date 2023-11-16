import { pokemons } from '../models/pokemons.js';
import { types } from '../models/types.js';
import { regions } from '../models/regions.js';
import { Op } from 'sequelize';

export const GetHome = (req, res, next) => {
    pokemons.findAll({ include: [{ model: types }, { model: regions }] }).then(pokemons => {
        regions.findAll().then(types => {
            const rg = types.map(t => t.dataValues);
            const pk = pokemons.map(pokemon => pokemon.dataValues);

            res.render('index', {
                title: 'POKEDEX',
                activeHome: true,
                pokemons: pk,
                regions: rg,
                compotation: pk.length > 0,
            })

        }).catch(err => { });
    }).catch(err => console.log(err));
}

export const PostHome = (req, res, next) => {

    console.log(req.body);
    const rgId = req.body.inputID ? Number(req.body.inputID.toString()) : 0;
    const pkN = req.body.name ? req.body.name.toString() : null;


    pokemons.findAll({
        include: [{ model: types }, { model: regions }],
        where: {
            [Op.or]: [
                {
                    regionId: rgId
                },
                {
                    pokemonName: {
                        [Op.like]: pkN
                    }
                }
            ],
        }
    }).then(pokemons => {

        regions.findAll().then(types => {

            const rg = types.map(t => t.dataValues);
            const pk = pokemons.map(pokemon => pokemon.dataValues);

            res.render('index', {
                title: 'POKEDEX',
                activeHome: true,
                pokemons: pk,
                regions: rg,
                compotation: pk.length > 0
            })

        }).catch(err => { });
    }).catch(err => console.log(err));
}