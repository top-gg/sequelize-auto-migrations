'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.info = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
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
exports.info = {
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
                    "type": sequelize_typescript_1.DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "testParam": {
                    "type": sequelize_typescript_1.DataType.BIGINT,
                    "field": "test_param",
                    "defaultValue": 1000
                },
                "firstName": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "first_name",
                    "defaultValue": "abc"
                },
                "lastName": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "last_name",
                    "defaultValue": ""
                },
                "nickname": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "nickname"
                },
                "gender": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "gender"
                },
                "birthDate": {
                    "type": sequelize_typescript_1.DataType.DATEONLY,
                    "field": "birth_date"
                },
                "lastLoginDate": {
                    "type": sequelize_typescript_1.DataType.DATE,
                    "field": "last_login_date"
                },
                "createdAt": {
                    "type": sequelize_typescript_1.DataType.DATE,
                    "field": "created_at"
                },
                "email": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "email"
                },
                "password": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "password"
                },
                "isDeleted": {
                    "type": sequelize_typescript_1.DataType.BOOLEAN,
                    "field": "is_deleted"
                },
                "isBlocked": {
                    "type": sequelize_typescript_1.DataType.BOOLEAN,
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
                    "type": sequelize_typescript_1.DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "title"
                },
                "display": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "display"
                },
                "createdAt": {
                    "type": sequelize_typescript_1.DataType.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": sequelize_typescript_1.DataType.DATE,
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
                    "type": sequelize_typescript_1.DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": sequelize_typescript_1.DataType.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "display": {
                    "type": sequelize_typescript_1.DataType.BOOLEAN,
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
                    "type": sequelize_typescript_1.DataType.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "geometry_1": {
                    "type": sequelize_typescript_1.DataType.GEOMETRY,
                    "field": "geometry_1",
                    "allowNull": false
                },
                "geometry_2": {
                    "type": sequelize_typescript_1.DataType.GEOMETRY('POINT'),
                    "field": "geometry_2",
                    "allowNull": false
                },
                "geometry_3": {
                    "type": sequelize_typescript_1.DataType.GEOMETRY('POINT', 4326),
                    "field": "geometry_3",
                    "allowNull": false
                },
                "createdAt": {
                    "type": sequelize_typescript_1.DataType.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": sequelize_typescript_1.DataType.DATE,
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
                    "type": sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "price": {
                    "type": sequelize_typescript_1.DataType.DECIMAL(6, 2),
                    "field": "price",
                    "allowNull": false
                },
                "createdAt": {
                    "type": sequelize_typescript_1.DataType.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": sequelize_typescript_1.DataType.DATE,
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
const up = (queryInterface, Sequelize, pos = 0) => {
    let index = pos;
    return new Promise(function (resolve, reject) {
        function next() {
            if (index < migrationCommands.length) {
                let command = migrationCommands[index];
                console.log("[#" + index + "] execute: " + command.fn);
                index++;
                queryInterface[command.fn]
                    .apply(queryInterface, command.params)
                    .then(next, reject);
            }
            else {
                resolve();
            }
        }
        next();
    });
};
exports.up = up;
