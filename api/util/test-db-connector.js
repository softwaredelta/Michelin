require('dotenv').config()

const fastifyPlugin = require('fastify-plugin')

const localTestConnectionString = 'mysql://root:root@localhost/tests'
const awsTestConnectionString = `mysql://${process.env.TEST_MYSQL_USER}:${process.env.TEST_MYSQL_PASSWORD}@${process.env.TEST_MYSQL_HOST}:${process.env.TEST_MYSQL_PORT}/${process.env.TEST_MYSQL_DB}`

const onDeployedEnv = false

async function createDB (fastify) {
  const connection = await fastify.mysql.getConnection()

  await connection.query('DROP TABLE IF EXISTS categoryquestion;')
  await connection.query('DROP TABLE IF EXISTS stateuser;')
  await connection.query('DROP TABLE IF EXISTS userrole;')
  await connection.query('DROP TABLE IF EXISTS role;')
  await connection.query('DROP TABLE IF EXISTS question;')
  await connection.query('DROP TABLE IF EXISTS sellingpoint;')
  await connection.query('DROP TABLE IF EXISTS state;')
  await connection.query('DROP TABLE IF EXISTS area;')
  await connection.query('DROP TABLE IF EXISTS form;')
  await connection.query('DROP TABLE IF EXISTS section;')
  await connection.query('DROP TABLE IF EXISTS category;')
  await connection.query('DROP TABLE IF EXISTS users;')

  await connection.query(
    `
    CREATE TABLE users(
    id_user INT(10) AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    id_manager INT(10) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_user) 
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE category(
    id_category INT(3) AUTO_INCREMENT,
    name VARCHAR(8) NOT NULL,
    PRIMARY KEY (id_category)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE form(
    id_form INT(10) AUTO_INCREMENT,
    id_category INT(10) NOT NULL,
    id_user INT(10) NOT NULL,
    exterior_grade INT(3) NOT NULL,
    interior_grade INT(3) NOT NULL,
    client_grade INT(3) NOT NULL,
    store_manager_grade INT (3) NOT NULL,
    sp_name VARCHAR(50) NOT NULL,
    file_link VARCHAR(255) NOT NULL,
    duration TIME NOT NULL,
    date DATETIME NOT NULL,
    PRIMARY KEY (id_form),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_category) REFERENCES category(id_category)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE section(
    id_section INT(10) NOT NULL,
    section_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_section)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE area(
    id_area INT(10) AUTO_INCREMENT,
    id_section INT(10) NOT NULL,
    area_title VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_area),
    FOREIGN KEY (id_section) REFERENCES section(id_section)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE question(
    id_question INT(10) AUTO_INCREMENT,
    p_text VARCHAR(255) NOT NULL,
    id_area INT(10) NOT NULL,
    camera TINYINT NOT NULL,
    btn_na TINYINT NOT NULL,
    picture VARCHAR(255),
    q_order INT(4) NOT NULL,
    PRIMARY KEY (id_question),
    FOREIGN KEY (id_area) REFERENCES area(id_area)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE state(
    id_state INT(10) AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_state)
    );
    `
  )

  await connection.query(
    `
    CREATE TABLE sellingpoint(
    id_sp INT(10) AUTO_INCREMENT,
    id_category INT(3) NOT NULL,
    id_state INT(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    rating FLOAT(5) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_sp),
    FOREIGN KEY (id_state) REFERENCES state(id_state),
    FOREIGN KEY (id_category) REFERENCES category(id_category)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE role(
    id_role INT(2) AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    PRIMARY KEY (id_role)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE userrole(
    id_user INT(10) NOT NULL,
    id_role INT(10) NOT NULL,
    CONSTRAINT id_user_role PRIMARY KEY (id_user, id_role),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_role) REFERENCES role(id_role)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE stateuser(
    id_user INT(10) NOT NULL,
    id_state INT(10) NOT NULL,
    CONSTRAINT id_state_user PRIMARY KEY (id_user, id_state),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_state) REFERENCES state (id_state)
    );
    `
  )
  await connection.query(
    `
    CREATE TABLE categoryquestion(
    id_category INT(3) NOT NULL,
    id_question INT(10) NOT NULL,
    Constraint id_category_question PRIMARY KEY (id_category, id_question),
    FOREIGN KEY (id_category) REFERENCES category(id_category),
    FOREIGN KEY (id_question) REFERENCES question(id_question)
    );
    `
  )
  await connection.query(
    `
    INSERT INTO section (id_section, section_name) VALUES
    (1, 'Interior'),
    (2, 'Exterior');
    `
  )
  await connection.query(
    `
    INSERT INTO area(id_area, id_section, area_title) VALUES
    (1, 1, 'Mostrador'),
    (2, 1, 'Llantas'),
    (3, 2, 'Pared'),
    (4, 2, 'Afuera');
    `
  )
  await connection.query(
    `
    INSERT INTO category (id_category, name) VALUES
    (1, 'Normal');
    `
  )
  await connection.query(
    `
    INSERT INTO state (id_state, name) VALUES
    (1, 'Ejemplo');
    `
  )
  connection.release()
}

async function dbConnector (fastify, options) {
  await fastify.register(require('@fastify/mysql'), {
    promise: true,
    connectionString: onDeployedEnv ? awsTestConnectionString : localTestConnectionString
  })

  await createDB(fastify)
}

module.exports = fastifyPlugin(dbConnector)
