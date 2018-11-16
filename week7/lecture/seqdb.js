
const Sequelize = require('sequelize');
const sequelize = new Sequelize('fmidb', 'user', 'pass', {
    dialect: 'sqlite',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: 'fmidb.sqlite'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Person = sequelize.define('person', {
    username: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

const Project = sequelize.define('project', {
    title: {
        type: Sequelize.STRING
    },
    kickoff: {
        type: Sequelize.DATE
    }
})

Project.hasMany(Person, { as: 'Persons' })

const City = sequelize.define('city', { countryCode: Sequelize.STRING, title: Sequelize.STRING });
const Country = sequelize.define('country', { isoCode: Sequelize.STRING });

// Here we can connect countries and cities base on country code
Country.hasMany(City, { foreignKey: 'countryCode', sourceKey: 'isoCode' });
City.belongsTo(Country, { foreignKey: 'countryCode', targetKey: 'isoCode' });

// force: true will drop the table if it already exists

async function dboper() {
    await Promise.all(
        [
            Person.sync({ force: true }),
            Project.sync({ force: true }),
            Country.sync({ force: true }),
            City.sync({ force: true }),
        ]);

    const BG = await Country.findOrCreate({
        where: { isoCode: 'BG' }, defaults: {
            isoCode: 'BG',
        }
    });

    const pers = await Person.findOrCreate({
        where: { username: 'jhan' }, defaults: {
            username: 'jhan',
            firstName: 'John',
            lastName: 'Hancock'
        }
    });

    const pers2 = await Person.findOrCreate({
        where: { username: 'iidakiev' }, defaults: {
            username: 'iidakiev',
            firstName: 'Iliya',
            lastName: 'Idakiev'
        }
    });

    const proj = await Project.create({
        title: 'my project'
    })

    await proj.addPerson(pers)

    const people = await Person.findAll();

    console.log('-----------------------------------');
    console.log(`${people.length} people found `);

    for (let p of people) {
        console.log(p.username);
    }

    let ppers = await proj.getPersons();

    console.log(`${ppers.length} person in project ${proj.title} :: `);

    for (let p of ppers) {
        console.log(p.username);
    }
}

dboper().catch(e => console.error(e));