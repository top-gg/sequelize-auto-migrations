'use strict';

import Sequelize, { DataType } from "sequelize-typescript";

/**
 * Actions summary:
 *
 * createTable "account", deps: []
 * createTable "city", deps: []
 * createTable "country", deps: []
 * createTable "geo", deps: []
 * createTable "purchaseProducts", deps: []
 * addIndex "country_title" to table "country"
 * addIndex "country_display" to table "country"
 *
 **/

export const info = {
    "revision": 1,
    "name": "1",
    "created": "2021-04-29T13:40:08.426Z",
    "comment": ""
};

const migrationCommands = [{
        fn: "createTable",
        params: [
            "account",
            {
                "id": {
                    "type": DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "testParam": {
                    "type": DataType.BIGINT,
                    "field": "test_param",
                    "defaultValue": 1000
                },
                "firstName": {
                    "type": DataType.STRING,
                    "field": "first_name",
                    "defaultValue": "abc"
                },
                "lastName": {
                    "type": DataType.STRING,
                    "field": "last_name",
                    "defaultValue": ""
                },
                "nickname": {
                    "type": DataType.STRING,
                    "field": "nickname"
                },
                "gender": {
                    "type": DataType.STRING,
                    "field": "gender"
                },
                "birthDate": {
                    "type": DataType.DATEONLY,
                    "field": "birth_date"
                },
                "lastLoginDate": {
                    "type": DataType.DATE,
                    "field": "last_login_date"
                },
                "createdAt": {
                    "type": DataType.DATE,
                    "field": "created_at"
                },
                "email": {
                    "type": DataType.STRING,
                    "field": "email"
                },
                "password": {
                    "type": DataType.STRING,
                    "field": "password"
                },
                "isDeleted": {
                    "type": DataType.BOOLEAN,
                    "field": "is_deleted"
                },
                "isBlocked": {
                    "type": DataType.BOOLEAN,
                    "field": "is_blocked"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "city",
            {
                "id": {
                    "type": DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": DataType.STRING,
                    "field": "title"
                },
                "display": {
                    "type": DataType.STRING,
                    "field": "display"
                },
                "createdAt": {
                    "type": DataType.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": DataType.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "country",
            {
                "id": {
                    "type": DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": DataType.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "display": {
                    "type": DataType.BOOLEAN,
                    "field": "display",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "geo",
            {
                "id": {
                    "type": DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "geometry_1": {
                    "type": DataType.GEOMETRY,
                    "field": "geometry_1",
                    "allowNull": false
                },
                "geometry_2": {
                    "type": DataType.GEOMETRY('POINT'),
                    "field": "geometry_2",
                    "allowNull": false
                },
                "geometry_3": {
                    "type": DataType.GEOMETRY('POINT', 4326),
                    "field": "geometry_3",
                    "allowNull": false
                },
                "createdAt": {
                    "type": DataType.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": DataType.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "purchaseProducts",
            {
                "id": {
                    "type": DataType.INTEGER.UNSIGNED,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "price": {
                    "type": DataType.DECIMAL(6, 2),
                    "field": "price",
                    "allowNull": false
                },
                "createdAt": {
                    "type": DataType.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": DataType.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "country",
            [{
                "name": "title"
            }],
            {
                "indexName": "country_title",
                "name": "country_title"
            }
        ]
    },
    {
        fn: "addIndex",
        params: [
            "country",
            [{
                "name": "display"
            }],
            {
                "indexName": "country_display",
                "name": "country_display"
            }
        ]
    }
];

export const up = (queryInterface, Sequelize, pos = 0) =>  {
  let index = pos;
  return new Promise<void>(function(resolve, reject) {
    function next() {
      if (index < migrationCommands.length) {
        let command = migrationCommands[index];
        console.log("[#" + index + "] execute: " + command.fn);
        index++;

        queryInterface[command.fn]
          .apply(queryInterface, command.params)
          .then(next, reject);
      } else {
        resolve();
      }
    }
    next();
  });
};
