const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');

const prompt = require('prompt-sync')();

/* Email pattern to check the validity of an email. */
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkEnvVariable = (envVar) => {
  if(!(envVar in process.env) || !process.env[envVar]){
    console.error(`${envVar} or not set in ".env". Make sure to set ${envVar}="<value>" in ".env" file.`);
    process.exit(1);
  }
}

const runSetup = async () => {

  /* Initialize dotenv to get environment variables. */
  dotenv.config();

  /* Initialize readline in order to parse user input. */
  const rl = readline.createInterface({ input, output });

  /* Check if database connection string is set. */
  console.log('1) Checking .env variables...');
  const envConfig = dotenv.parse(fs.readFileSync('.env'));
  for(let envVar of Object.keys(envConfig)){
    checkEnvVariable(envVar);
  }
  console.log('.env variables are all set.');

  /* Attempt to connect to database in order to add user account. */
  console.log(`\n2) Connecting to MongoDB database...`);
  mongoose.set('strictQuery', false);
  try {
    let conn = await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
    console.log(`MongoDB connected: ${conn.connection.host}\n`);

    /* Check if a user already exists, and if it doesn't then we can create one. */
    console.log('\n3) Creating user account...');
    const user = await User.findOne({});
    if(user) {
      console.log(`A user is already set with email: ${user.email}.\n`);
      process.exit(1);
    }
    else {
      let email, password;

      /* Ask for email until a valid email was given. */
      while(true){
        email = prompt('Enter email: ');
        if(emailPattern.test(email)) break;
        else console.warn('Invalid email. Please enter a valid email.');
      }

      /* Ask for password until a password that meets the criteria was given. */
      while(true){
        password = prompt.hide('Enter password: ');
        if(password.length >= 8) break;
        else console.warn('Password be must be at least 8 characters long.');
      }
      
      /* Attempt to create the user account. */
      console.log('\n4) Creating user account...');
      try {
        const user = await User.create({
          email,
          password
        });
        console.log(`User account with email "${user.email}" was created. You can use those credentials in order to log into the admin panel.`);
        process.exit(0);
      } catch (err) {
        console.error('Could not create account.');
        console.error(err);
        process.exit(1);
      }
    }
  } catch(error) {
    console.error(`Error: Could not connect to database: ${process.env.DATABASE}`);
    console.error(error);
    process.exit(1);
  }
}

runSetup();