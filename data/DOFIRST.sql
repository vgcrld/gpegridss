

/* 

    start the docker container like this first:

    docker run --rm -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD='pw' -v '/Users/rdavis/code/ag-grid-server-side-nodejs-example/data:/data' mysql:latest

    Make sure to wait for the container to be ready before you move on. You should see:
    
    [Server] /usr/sbin/mysqld: ready for connections.

    Now attach a shell in docker:

    docker exec -ti mysql-server bash

    and enter:

    mysql -u root -p 

    the password is 'pw' set above. Now manually enter these commands:

    source /data/DOFIRST.sql;
    source /data/olympic_winners.sql;

 */
CREATE DATABASE sample_data;
CREATE USER 'reporting_app'@'%' IDENTIFIED WITH mysql_native_password BY 'password123';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,ALTER,DROP ON sample_data.* TO 'reporting_app'@'%';
FLUSH PRIVILEGES;
SOURCE /data/olympic_winners.sql;