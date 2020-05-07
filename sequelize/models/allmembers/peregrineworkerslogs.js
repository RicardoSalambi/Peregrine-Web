module.exports = (Sequelize,connection) =>  {

    return connection.define('peregrineworkerslogs', {
      date  : {
            type  : Sequelize.DATE,
            primaryKey    : true
      },      
      worknumber  : {
        type  : Sequelize.INTEGER,
      },
      name  : {
        type  : Sequelize.TEXT
      },
      surname  : {
        type  : Sequelize.TEXT
      },
      qualification  : {
        type  : Sequelize.TEXT
      },
      department  : {
        type  : Sequelize.TEXT
      },
      skills  : {
        type  : Sequelize.TEXT
      },
      position  : {
        type  : Sequelize.TEXT
      },
      nationality  : {
        type  : Sequelize.TEXT
      },
      gender  : {
        type  : Sequelize.TEXT
      },
      house  : {
        type  : Sequelize.TEXT
      },
      address  : {
        type  : Sequelize.TEXT
      },
      comments  : {
        type  : Sequelize.TEXT
      },
      filename : {
        type  : Sequelize.TEXT
      },
      file  : {
        type  : Sequelize.BLOB('long')
      },
      imgfile : {
        type  : Sequelize.BLOB('long')
      },
      
  
  
    });
  }