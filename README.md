# sequelize-auto-migrations
Migration generator &amp;&amp; runner for sequelize

This package provide two tools:
* `sequelize-ts create` - tool for create new migrations
* `sequelize-ts run` - tool for apply created by first tool migrations

## Install
`todo`

## Usage
* Init sequelize, with sequelize-cli, using `sequelize init`
* Create your models
* Create initial migration - run:

`sequelize-ts create --name <migration name>`
* Change models and run it again, model difference will be saved to the next migration

To preview new migration, without any changes, you can run:

`sequelize-ts create --preview`

`sequelize-ts create` tool creates `_current.json` file in `migrations` dir, that is used to calculate difference to the next migration. Do not remove it!

To create and then execute migration, use:
`sequelize-ts create --name <name> -x`

## Executing migrations
* There is simple command to perform all created migrations (from selected revision):

`sequelize-ts run`
* To select a revision, use `--rev <x>`
* If migration fails, you can continue, use `--pos <x>`
* To prevent execution next migrations, use `--one`


For more information, use `sequelize-ts create --help`, `runmigration --help`

## TODO:
* Migration action sorting procedure need some fixes. When many foreign keys in tables, there is a bug with action order. Now, please check it manually (`--preview` option)
* Need to check (and maybe fix) field types: `BLOB`, `RANGE`, `ARRAY`, `GEOMETRY`, `GEOGRAPHY`
* Downgrade is not supported, add it
* This module tested with postgresql (I use it with my projects). Test with mysql and sqlite.
