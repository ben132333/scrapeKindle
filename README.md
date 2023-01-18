# Scrape Kindle Highlights

I like Readwise but I want to do more with my Kindle highlights than their features. 

## Overview

### Scraping Kindle Highlights

index.js is the code that scrapes the hightlights.  

- It logs into https://read.amazon.com/kp/notebook 
- clicks on every book in the left panel and scrapes all highlights of each book
- stores them in a file "highlights.json"

### Environment variables

We use dotenv to store and use environment variables.  

Create a local .env file in the root of this project with the following variables:  `EMAIL="YOUR1EMAIL"`
`EMAIL_PASSWORD="YOUR1PASSWORD"`   
