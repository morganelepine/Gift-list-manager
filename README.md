# MerryMate

MerryMate is my final year project, a full-stack web application developed with Laravel (backend), MySQL (database), and React (frontend). This application has been deployed on Heroku.

## Demo

You can test **MerryMate** from [this link](https://merrymate-acbf617285bb.herokuapp.com/). Enjoy!

## Deployment

#### Prerequisites

-   Heroku account: create an account on [Heroku](https://dashboard.heroku.com/).
-   Heroku CLI: download and install the Heroku CLI from [this link](https://devcenter.heroku.com/articles/heroku-cli).

#### 1. Connect to Heroku

Log in to your Heroku account via the terminal:

```bash
  heroku login
```

Or log in directly through the CLI:

```bash
  heroku login -i
```

#### 2. Create the project

-   Go to the [dashboard](https://dashboard.heroku.com/) and click on `Create a new app`.
-   Choose a name for your application.
-   Select the closest region to your end-users to optimize latency.
-   Select GitHub as the deployment method and link your GitHub repository.
-   Enable automatic deployment so that each push to GitHub is automatically deployed to Heroku.
-   _Optional_ : enable the "Wait for CI to pass before deploy" option so that Heroku only deploys the application if the GitHub Actions tests pass.

#### 3. Configure buildpacks

Buildpacks are scripts used by Heroku to install dependencies and configure the application's environment.  
This can be done through the Heroku dashboard or via the CLI:

```bash
  heroku buildpacks:add heroku/nodejs
  heroku buildpacks:set heroku/php
```

#### 4. Project deployment

By default, Heroku uses Apache with PHP to start the application from the project root directory.  
Since the document root of the app is the `public/` subdirectory, create a `Procfile` in the project's root directory with the following line:

```bash
web: vendor/bin/heroku-php-apache2 public/
```

#### 5. Deployment via Git

Add Heroku as a remote and deploy the application:

```bash
heroku git:remote -a MerryMate
git push heroku main
```

#### 6. Environment variables configuration

Add the necessary environment variables, such as those in the `.env` file, to Heroku's Config Vars to securely manage sensitive data.  
This can be done through the Heroku dashboard or via the CLI:

```bash
heroku config:set APP_KEY=<your-app-key>
```

#### 7. Adding a MySQL database

Add the JawsDB MySQL add-on from the Add-ons section of the Heroku dashboard or via the CLI:

```bash
heroku addons:create jawsdb:kitefin
```

**Note**: JawsDB is a free add-on with limitations. Regularly back up your data.

#### 8. Migrations management

After deployment, run the migrations to create the tables in the new database:

```bash
heroku run php artisan migrate:fresh
```

**Note**: If you encounter the following error:
> _Syntax error or access violation: 1071 Specified key was too long_  

adjust the default string length by adding the following line in the boot() method of the `AppServiceProvider.php` file:

```bash
Schema::defaultStringLength(191)
```

#### 9. Configure PHPMyAdmin (optional)

To easily view the database, configure PHPMyAdmin to connect to your Heroku database by adding the connection details to the `config.inc.php` file.
