import express from "express";
import expressHbs from "express-handlebars";
import bodyParser from "body-parser";
import adminRouter from "./routes/admin.js";
import userRouter from './routes/user.js';
import errorRouter from './routes/errors.js';
import { comparative } from './helpers/equalHelper.js';
import { sql } from "./database/db.js";
import { types } from "./models/types.js";
import { regions } from "./models/regions.js";
import { pokemons } from "./models/pokemons.js";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.engine("hbs", expressHbs.engine({
    layoutDir: "view/layout",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
        equal: comparative,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin/", adminRouter);
app.use("/", userRouter);
app.use("/", errorRouter);

pokemons.belongsTo(types, {
    foreignKey: 'typesId',
    constraints: true,
    onDelete: 'CASCADE',
});
types.hasMany(pokemons, {
    foreignKey: 'typesId',
    target_key: 'id',
});

pokemons.belongsTo(regions, {
    constraints: true,
    onDelete: 'CASCADE',
});

regions.hasMany(pokemons, {});

sql.sync({}).then(() => app.listen(process.env.port || 5500)).catch(err => console.log(err));