# Thai Scan

Thai ID scan using google vision api

## Table of Contents

- [Overview](#overview)
- [Endpoints](#endpoints)
- [GET /](#get-)
- [GET /detail/add](#get-detailadd)
- [GET /detail/edit/:detailId](#get-detaileditdetailid)
- [GET /detail/logs](#get-detaillogs)
- [Installation Guide](#installation-guide)

## Overview

This project provides an API for managing details using Google Vision API for data extraction.

## Endpoints

### GET /

The home endpoint where two buttons appear:
- *ADD ID:* Adds a new detail to the database.
- *SHOW LOGS:* Shows the history of details.

### GET /detail/add

Renders the addDetail page which takes an image input with an image less than 2MB and accepts only JPG, JPEG, PNG formats. After submitting, a POST request to /detail/add is made. The server calls Google Vision API to extract data, saves it to the database, and then prints the result on the screen. The result contains an edit button to edit the detail.

### GET /detail/edit/:detailId

Gives a form to edit the given detail. Allows changing the extracted information.

### POST /detail/edit/:detailId

Updates the information for the specified detail.

### GET /detail/logs

Renders the logs page containing all the past submitted details.

## Installation Guide

To deploy and run the application, follow these steps:

1. Create a .env file in the root directory with two environmental variables:
   - PORT with the relevant port.
   - MONGO_URL with the MongoDB database URL.

2. Create an account on Google Cloud Platform.

3. Enable Google Vision API.

4. Create a service account and obtain the JSON credential.

5. Rename the credential file as 'credential.json'.

6. In the terminal, run npm install to install the required packages.

7. To start the project, run npm start.
