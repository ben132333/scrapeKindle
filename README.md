# Scrape Kindle Highlights

I like Readwise but I want to do more with my Kindle highlights than their features. 

## Overview

### What it does

index.js is the code that scrapes the hightlights.  

- It logs into https://read.amazon.com/kp/notebook 
- clicks on every book in the left panel and scrapes all highlights of each book
- stores them in a file "highlights.json"

### How to run it yourself

> node --version  
> v16.14.2

#### Set up environment variables

We use dotenv to store and use environment variables.  

Create a local .env file in the root of this project. Add your Amazon.com login info in the following variables:  
`EMAIL="YOUR1EMAIL"`  
`EMAIL_PASSWORD="YOUR1PASSWORD"`  


#### Run index.js

To loop through your highlights and put then in a highlights.json file, run:

> node index.js

