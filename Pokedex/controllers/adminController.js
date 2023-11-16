import { types } from '../models/types.js';
import { pokemons } from '../models/pokemons.js';
import { regions } from '../models/regions.js';

let listTp = [];
let listRg = [];


export const Getpokemons = (req, res, next) => {
    pokemons.findAll({ include: [{ model: types }, { model: regions }] }).then(p => {

        types.findAll({ attributes: ['id', 'typeName'] }).then(t => {
            t.map(t => listTp.push(t.dataValues))

            regions.findAll({ attributes: ['id', 'regionName'] }).then(r => {
                r.map(r => listRg.push(r.dataValues))

                const pm = p.map(p => p.dataValues);
                let compotation = true;

                if (listRg.length === 0 || listTp.length === 0) { compotation = false }

                res.render('./admin/pokemons', {
                    title: 'Pokemons',
                    activePokemons: true,
                    pokemonData: pm,
                    listTp,
                    listRg,
                    compotation
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

    listRg = [];
    listTp = [];
}
export const Postpokemons = (req, res, next) => {
    pokemons.create({ pokemonName: req.body.name, image: req.body.image, typesId: req.body.types, regionId: req.body.regions }).then(() => res.status(200).redirect("/admin/pokemons")).catch(err => console.log(err));
}


export const Getregions = (req, res, next) => {
    regions.findAll().then(r => {
        const rm = r.map(r => r.dataValues);
        res.render('./admin/regions', {
            title: 'Regions',
            activeRegions: true,
            regionData: rm,
        })
    }).catch(err => console.log(err));
}
export const Postregions = (req, res, next) => {
    regions.create({ regionName: req.body.regionName }).then(() => res.status(200).redirect("/admin/regions")).catch(err => console.log(err));
}


export const Gettypes = (req, res, next) => {
    types.findAll().then(t => {
        const tm = t.map(t => t.dataValues);
        res.render('./admin/types', {
            title: 'Types',
            activeTypes: true,
            typesData: tm,
        })
    }).catch(err => console.log(err));
}
export const Posttypes = (req, res, next) => {
    types.create({ typeName: req.body.typeName }).then(() => res.status(200).redirect("/admin/types")).catch(err => console.log(err));
}


export const GetEdit = (req, res, next) => {
    const id = req.params.id;
    const active = req.params.active;

    if (active === "types") {
        types.findOne({ where: { id: id } }).then(type => {
            const tm = type.dataValues;
            res.render('edit', {
                title: 'Types edit',
                name: 'types',
                activeEditTypes: true,
                tm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "regions") {
        regions.findOne({ where: { id: id } }).then(region => {
            const rm = region.dataValues;
            res.render('edit', {
                title: 'Regions edit',
                name: 'regions',
                activeEditRegions: true,
                rm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "pokemons") {
        pokemons.findOne({ where: { id: id } }).then(pokemon => {
            const pm = pokemon.dataValues;
            res.render('edit', {
                title: 'Pokemons edit',
                name: 'pokemons',
                activeEditPokemons: true,
                pm,
                active,
                listTp,
                listRg
            });
        }).catch(err => console.log(err));
    }
}
export const PostEdit = (req, res, next) => {
    const active = req.params.active;
    const id = req.body.id;

    if (active === "types") {
        types.update({ typeName: req.body.typeName }, { where: { id: id } }).then(() => res.status(200).redirect("/admin/types")).catch(err => console.log(err));
    }
    if (active === "regions") {
        regions.update({ regionName: req.body.regionName }, { where: { id: id } }).then(() => res.status(200).redirect("/admin/regions")).catch(err => console.log(err));
    }
    if (active === "pokemons") {
        pokemons.update({ pokemonName: req.body.name, image: req.body.image, typesId: req.body.types, regionId: req.body.regions }, { where: { id: id } }).then(() => res.status(200).redirect("/admin/pokemons")).catch(err => console.log(err));
    }
}


export const GetDelete = (req, res, next) => {
    const id = req.params.id;
    const active = req.params.active;

    if (active === "types") {
        types.findOne({ where: { id: id } }).then(type => {
            const tm = type.dataValues;
            res.render('delete', {
                title: 'Types delete',
                name: 'delete',
                activeDeleteTypes: true,
                tm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "regions") {
        regions.findOne({ where: { id: id } }).then(region => {
            const rm = region.dataValues;
            res.render('delete', {
                title: 'Regions delete',
                name: 'delete',
                activeDeleteRegions: true,
                rm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "pokemons") {
        pokemons.findOne({ where: { id: id } }).then(pokemon => {
            const pm = pokemon.dataValues;
            res.render('delete', {
                title: 'Pokemons delete',
                name: 'delete',
                activeDeletePokemons: true,
                pm,
                active
            });
        }).catch(err => console.log(err));
    }
}
export const PostDelete = (req, res, next) => {
    const active = req.params.active;
    const id = req.body.id;

    if (active === "types") {
        types.destroy({ where: { id: id } }).then(() => res.status(200).redirect("/admin/types")).catch(err => console.log(err));
    }
    if (active === "regions") {
        regions.destroy({ where: { id: id } }).then(() => res.status(200).redirect("/admin/regions")).catch(err => console.log(err));
    }
    if (active === "pokemons") {
        pokemons.destroy({ where: { id: id } }).then(() => res.status(200).redirect("/admin/pokemons")).catch(err => console.log(err));
    }
}