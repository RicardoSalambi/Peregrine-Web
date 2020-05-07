module.exports = (Sequelize,connection) =>  {


    return connection.define('performancelogs', {

        date  : {
            type  : Sequelize.DATE,
            primaryKey    : true
        },
        worknumber  : {
            type  : Sequelize.INTEGER
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