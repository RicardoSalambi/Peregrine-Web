module.exports = (Sequelize,connection) =>  {


return connection.define('dependancieslog', {

    date  : {
      type  : Sequelize.DATE,
      primaryKey    : true
    },
    worknumber  : {
        type  : Sequelize.INTEGER,
        primaryKey    : true
    },
    next_of_kin  : {
        type  : Sequelize.TEXT
    },
    emergencycontact  : {
        type  : Sequelize.TEXT
    },
    filename : {
        type  : Sequelize.TEXT
    },
    file  : {
        type  : Sequelize.BLOB('long')
    } 


  });

}