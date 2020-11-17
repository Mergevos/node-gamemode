# open-movie-js

[![Mergevos](https://img.shields.io/badge/Mergevos-node--gamemode-2f2f2f.svg?style=for-the-badge)](https://github.com/Mergevos/open-movie-js)

Example gamemode written in NodeJS for SA-MP, soon open.mp.

## Installation

Clone the repo.
```git
git clone https://github.com/Mergevos/node-gamemode
```
Then run:
```
npm ensure
```
Then: 
```
sampctl p ensure
sampctl p build
```

Then read [how to configure](https://github.com/Mergevos/node-gamemode#configuring) gamemode.

## Usage

### Configuring

1. Create a new .env file in root folder. Name it .env
2. Put all your connection details into the file. Example: 
```shell
DB_HOST='127.0.0.1'
DB_USER='root'
DB_DATABASE='open-movie-database'
DB_PASS=''
```
3. Create a new database in your phpmyadmin or whatever you use, name it same as you did in .env file.
4. Execute the following query: 
```sql
CREATE TABLE IF NOT EXISTS `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(24) DEFAULT NULL,
  `account_email` varchar(40) DEFAULT NULL,
  `account_password` varchar(61) DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
```

If you did all the tasks well, use:
```
sampctl p run
```

## Keep in mind

I'm new to NodeJS, feel free to correct my code and give me suggestions. 