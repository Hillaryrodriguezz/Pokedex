import express from "express";

const adminRouter = express.Router();
import { Getpokemons, Postpokemons, Getregions, Gettypes, Postregions, GetDelete, Posttypes, GetEdit, PostEdit, PostDelete } from '../controllers/adminController.js'

adminRouter.get("/pokemons", Getpokemons);
adminRouter.post("/pokemons", Postpokemons);

adminRouter.get("/regions", Getregions);
adminRouter.post("/regions", Postregions);

adminRouter.get("/types", Gettypes);
adminRouter.post("/types", Posttypes);

adminRouter.get("/edit/:active/:id", GetEdit);
adminRouter.post("/edit/:active", PostEdit);

adminRouter.get("/delete/:active/:id", GetDelete);
adminRouter.post("/delete/:active", PostDelete);

export default adminRouter;