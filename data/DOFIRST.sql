/*  
    The help for this can be found at: https://ag-grid.com/documentation/javascript/server-side-operations-nodejs/

    Start the docker container like this first:

    docker run --rm -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD='pw' -v '/Users/rdavis/code/gpegrid-serverside/data:/setup' mysql:latest

    Make sure to wait for the container to be ready before you move on. You should see:
    
    [Server] /usr/sbin/mysqld: ready for connections.

    Now attach a shell in docker:

    docker exec -ti mysql-server bash

    and enter:

    mysql -u root -p 

    the password is 'pw' set above. Now manually enter these commands:

    source /setup/DOFIRST.sql;
    source /setup/olympic_winners.sql;

    BEFORE YOU QUIT MAKE SURE THE sample_data and olympic_winners tables exist;
    
    use sample_data;
    desc olympic_winners;
    select count(*) from olympic_winners;   -- and there are 8000+ records 
    \q 

    to get out my mysql

    yarn install 
    yarn start 

    http://localhost:4000

 */
CREATE DATABASE sample_data;
CREATE USER 'reporting_app'@'%' IDENTIFIED WITH mysql_native_password BY 'password123';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,ALTER,DROP ON sample_data.* TO 'reporting_app'@'%';
FLUSH PRIVILEGES;
FLUSH TABLES;
