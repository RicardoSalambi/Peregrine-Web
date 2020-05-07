module.exports = (Sequelize,connection) =>  {


    return connection.define('performances', {

        worknumber  : {
            type  : Sequelize.INTEGER,
            primaryKey    : true
        },
        workethic  : {
            type  : Sequelize.INTEGER
        },
        puntuality  : {
            type  : Sequelize.INTEGER
        },
        teamwork  : {
            type  : Sequelize.INTEGER
        },
        initiative  : {
            type  : Sequelize.INTEGER
        },
        positivity  : {
            type  : Sequelize.INTEGER
        },
        comments  : {
            type  : Sequelize.TEXT
        },


  });
}